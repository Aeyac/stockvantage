<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGrnRequest;
use App\Models\GrnRecord;
use App\Models\PurchaseOrder;
use App\Models\StockLedger;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class GrnController extends Controller
{
    public function index(): Response
    {
        $grns = GrnRecord::with('purchaseOrder')->paginate(15);

        return Inertia::render('Grns/Index', [
            'grns' => $grns,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Grns/Create', [
            'openPurchaseOrders' => PurchaseOrder::with('purchaseRequest.lineItems.catalogItem')
                ->whereIn('status', ['open', 'partially_received'])
                ->get(),
            'warehouses' => Warehouse::where('is_active', true)->get(),
        ]);
    }

    public function show(GrnRecord $grn): Response
    {
        $grn->load('lineItems.catalogItem', 'purchaseOrder.purchaseRequest.requester');

        return Inertia::render('Grns/Show', ['grn' => $grn]);
    }

    public function store(StoreGrnRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $po = PurchaseOrder::with('purchaseRequest.lineItems')
                    ->findOrFail($request->po_id);

                // 1. create the GRN record
                $grn = GrnRecord::create([
                    'po_id' => $request->po_id,
                    'received_by' => auth()->id(),
                    'notes' => $request->notes,
                    'status' => GrnRecord::STATUS_COMPLETE,
                ]);

                // 2. process each line item
                $hasDiscrepancy = false;

                foreach ($request->line_items as $lineItem) {
                    $prLineItem = $po->purchaseRequest->lineItems
                        ->firstWhere('catalog_item_id', $lineItem['catalog_item_id']);

                    $quantityOrdered = $prLineItem?->quantity ?? 0;
                    $quantityReceived = $lineItem['quantity_received'];
                    $discrepancyNote = null;

                    if ($quantityReceived < $quantityOrdered) {
                        $hasDiscrepancy = true;
                        $discrepancyNote = "Expected {$quantityOrdered}, received {$quantityReceived}.";
                    }

                    // 3. create GRN line item
                    $grn->lineItems()->create([
                        'catalog_item_id' => $lineItem['catalog_item_id'],
                        'quantity_ordered' => $quantityOrdered,
                        'quantity_received' => $quantityReceived,
                        'discrepancy_note' => $discrepancyNote,
                    ]);

                    // 4. update stock ledger
                    if ($quantityReceived > 0) {
                        StockLedger::create([
                            'warehouse_id' => $request->warehouse_id,
                            'catalog_item_id' => $lineItem['catalog_item_id'],
                            'quantity_change' => $quantityReceived,
                            'movement_type' => StockLedger::MOVEMENT_RECEIVED_SHIPMENT,
                            'reference_type' => 'GrnRecord',
                            'reference_id' => $grn->id,
                            'performed_by' => auth()->id(),
                        ]);
                    }
                }

                // 5. update GRN status
                $grn->update([
                    'status' => $hasDiscrepancy
                        ? GrnRecord::STATUS_DISCREPANCY
                        : GrnRecord::STATUS_COMPLETE,
                ]);

                // 6. update PO status
                $po->update([
                    'status' => $hasDiscrepancy
                        ? PurchaseOrder::STATUS_PARTIALLY_RECEIVED
                        : PurchaseOrder::STATUS_FULLY_RECEIVED,
                ]);
            });
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }

        return redirect()
            ->route('grn.index')
            ->with('success', 'GRN recorded successfully.');
    }
}
