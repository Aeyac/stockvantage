<?php

use App\Services\GrnService;
use App\Models\Tenant;
use App\Models\User;
use App\Models\PurchaseRequest;
use App\Models\PurchaseOrder;
use App\Models\PrLineItem;
use App\Models\CatalogItem;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Models\GrnRecord;
use App\Models\StockLedger;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

/**
 * Helper to build a fully consistent tenant "world" — a PO with one
 * line item, ready for GRN processing. Keeping this in one place means
 * every test below shares the same tenant across all related records.
 */
test('debug faker in this file', function () {
    $faker = app(\Faker\Generator::class);
    dump(array_map('get_class', $faker->getProviders()));
    expect(true)->toBeTrue();
});

function makeReceivableSetup(int $orderedQty = 10): array
{
    $tenant = Tenant::factory()->create();
    $user = User::factory()->create(['tenant_id' => $tenant->id]);

    $supplier = Supplier::factory()->create(['tenant_id' => $tenant->id]);
    $catalogItem = CatalogItem::factory()->create([
        'tenant_id' => $tenant->id,
        'supplier_id' => $supplier->id,
    ]);
    $warehouse = Warehouse::factory()->create(['tenant_id' => $tenant->id]);

    $pr = PurchaseRequest::factory()->create([
        'tenant_id' => $tenant->id,
        'requested_by' => $user->id,
        'status' => PurchaseRequest::STATUS_APPROVED,
    ]);

    $prLineItem = PrLineItem::factory()->create([
        'pr_id' => $pr->id,
        'catalog_item_id' => $catalogItem->id,
        'quantity' => $orderedQty,
    ]);

    $po = PurchaseOrder::factory()->create([
        'tenant_id' => $tenant->id,
        'pr_id' => $pr->id,
        'status' => PurchaseOrder::STATUS_OPEN,
    ]);

    return compact('tenant', 'user', 'supplier', 'catalogItem', 'warehouse', 'pr', 'prLineItem', 'po');
}

// -------------------------------------------------------------
// Happy path: full receipt
// -------------------------------------------------------------

test('receiving the full ordered quantity marks GRN complete and PO fully received', function () {
    $setup = makeReceivableSetup(orderedQty: 10);
    $this->actingAs($setup['user']);

    $grn = app(GrnService::class)->createGRN([
        'po_id' => $setup['po']->id,
        'warehouse_id' => $setup['warehouse']->id,
        'notes' => null,
        'line_items' => [
            [
                'catalog_item_id' => $setup['catalogItem']->id,
                'quantity_received' => 10,
            ],
        ],
    ]);

    expect($grn->status)->toBe(GrnRecord::STATUS_COMPLETE);
    expect($setup['po']->fresh()->status)->toBe(PurchaseOrder::STATUS_FULLY_RECEIVED);

    $lineItem = $grn->lineItems()->first();
    expect($lineItem->quantity_received)->toBe(10);
    expect($lineItem->quantity_ordered)->toBe(10);
    expect($lineItem->discrepancy_note)->toBeNull();
});

// -------------------------------------------------------------
// Partial receipt / discrepancy
// -------------------------------------------------------------

test('receiving less than ordered marks GRN discrepancy and PO partially received', function () {
    $setup = makeReceivableSetup(orderedQty: 10);
    $this->actingAs($setup['user']);

    $grn = app(GrnService::class)->createGRN([
        'po_id' => $setup['po']->id,
        'warehouse_id' => $setup['warehouse']->id,
        'notes' => null,
        'line_items' => [
            [
                'catalog_item_id' => $setup['catalogItem']->id,
                'quantity_received' => 6,
            ],
        ],
    ]);

    expect($grn->status)->toBe(GrnRecord::STATUS_DISCREPANCY);
    expect($setup['po']->fresh()->status)->toBe(PurchaseOrder::STATUS_PARTIALLY_RECEIVED);

    $lineItem = $grn->lineItems()->first();
    expect($lineItem->quantity_received)->toBe(6);
    expect($lineItem->discrepancy_note)->not->toBeNull();
});

// -------------------------------------------------------------
// Over-receiving gets capped, not rejected
// -------------------------------------------------------------

test('cannot receive more than what remains on the PO', function () {
    $setup = makeReceivableSetup(orderedQty: 10);
    $this->actingAs($setup['user']);

    $grn = app(GrnService::class)->createGRN([
        'po_id' => $setup['po']->id,
        'warehouse_id' => $setup['warehouse']->id,
        'notes' => null,
        'line_items' => [
            [
                'catalog_item_id' => $setup['catalogItem']->id,
                'quantity_received' => 999,
            ],
        ],
    ]);

    $lineItem = $grn->lineItems()->first();
    expect($lineItem->quantity_received)->toBe(10); // capped, not 999
    expect($grn->status)->toBe(GrnRecord::STATUS_COMPLETE); // fully satisfied, no discrepancy
});

// -------------------------------------------------------------
// Multiple partial GRNs against the same PO — this is the trickiest
// path in the service, since it sums PREVIOUS GrnLineItems to figure
// out what's still owed.
// -------------------------------------------------------------

test('a second GRN correctly accounts for quantity already received in a prior GRN', function () {
    $setup = makeReceivableSetup(orderedQty: 10);
    $this->actingAs($setup['user']);

    // first delivery: 6 of 10
    $firstGrn = app(GrnService::class)->createGRN([
        'po_id' => $setup['po']->id,
        'warehouse_id' => $setup['warehouse']->id,
        'notes' => null,
        'line_items' => [
            ['catalog_item_id' => $setup['catalogItem']->id, 'quantity_received' => 6],
        ],
    ]);

    expect($setup['po']->fresh()->status)->toBe(PurchaseOrder::STATUS_PARTIALLY_RECEIVED);

    // second delivery: remaining 4
    $secondGrn = app(GrnService::class)->createGRN([
        'po_id' => $setup['po']->id,
        'warehouse_id' => $setup['warehouse']->id,
        'notes' => null,
        'line_items' => [
            ['catalog_item_id' => $setup['catalogItem']->id, 'quantity_received' => 4],
        ],
    ]);

    $secondLineItem = $secondGrn->lineItems()->first();
    expect($secondLineItem->quantity_ordered)->toBe(4); // remaining, not original 10
    expect($secondLineItem->quantity_received)->toBe(4);
    expect($secondGrn->status)->toBe(GrnRecord::STATUS_COMPLETE);
    expect($setup['po']->fresh()->status)->toBe(PurchaseOrder::STATUS_FULLY_RECEIVED);
});

// -------------------------------------------------------------
// Stock ledger behavior
// -------------------------------------------------------------

test('receiving stock creates exactly one stock ledger entry per line item', function () {
    $setup = makeReceivableSetup(orderedQty: 10);
    $this->actingAs($setup['user']);

    expect(StockLedger::count())->toBe(0);

    app(GrnService::class)->createGRN([
        'po_id' => $setup['po']->id,
        'warehouse_id' => $setup['warehouse']->id,
        'notes' => null,
        'line_items' => [
            ['catalog_item_id' => $setup['catalogItem']->id, 'quantity_received' => 5],
        ],
    ]);

    expect(StockLedger::count())->toBe(1);

    $entry = StockLedger::first();
    expect($entry->quantity_change)->toBe(5);
    expect($entry->movement_type)->toBe(StockLedger::MOVEMENT_RECEIVED_SHIPMENT);
    expect($entry->reference_type)->toBe('GrnRecord');
    expect($entry->warehouse_id)->toBe($setup['warehouse']->id);
});

test('zero quantity_received does not create a stock ledger entry', function () {
    $setup = makeReceivableSetup(orderedQty: 10);
    $this->actingAs($setup['user']);

    app(GrnService::class)->createGRN([
        'po_id' => $setup['po']->id,
        'warehouse_id' => $setup['warehouse']->id,
        'notes' => null,
        'line_items' => [
            ['catalog_item_id' => $setup['catalogItem']->id, 'quantity_received' => 0],
        ],
    ]);

    expect(StockLedger::count())->toBe(0);
});

// -------------------------------------------------------------
// Everything happens in one transaction
// -------------------------------------------------------------

test('the whole GRN creation is transactional — nothing partially commits', function () {
    $setup = makeReceivableSetup(orderedQty: 10);
    $this->actingAs($setup['user']);

    // pass an invalid catalog_item_id to force a failure mid-loop
    try {
        app(GrnService::class)->createGRN([
            'po_id' => $setup['po']->id,
            'warehouse_id' => $setup['warehouse']->id,
            'notes' => null,
            'line_items' => [
                ['catalog_item_id' => 999999, 'quantity_received' => 5],
            ],
        ]);
    } catch (\Throwable $e) {
        // expected to fail somewhere (e.g. FK constraint on GrnLineItem)
    }

    // if the transaction rolled back correctly, no GrnRecord should persist
    expect(GrnRecord::count())->toBe(0);
    expect(StockLedger::count())->toBe(0);
});