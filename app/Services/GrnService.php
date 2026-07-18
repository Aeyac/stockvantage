<?php

namespace App\Services;

use App\Http\Requests\StoreGrnRequest;
use App\Models\GrnLineItem;
use App\Models\GrnRecord;
use App\Models\PurchaseOrder;
use App\Models\StockLedger;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class GrnService
{
    public function createGRN(array $request): GrnRecord
    {
        return DB::transaction(function () use ($request) {
            $po = PurchaseOrder::with('purchaseRequest.lineItems')
                ->findOrFail($request['po_id']);

            // 1. create the GRN record
            $grn = GrnRecord::create([
                'po_id' => $request['po_id'],
                'received_by' => auth()->id(),
                'notes' => $request['notes'],
                'status' => GrnRecord::STATUS_COMPLETE,
            ]);

            // 2. process each line item
            $hasDiscrepancy = false;

            foreach ($request['line_items'] as $lineItem) {
                $prLineItem = $po->purchaseRequest->lineItems
                    ->firstWhere('catalog_item_id', $lineItem['catalog_item_id']);

                $totalOrdered = $prLineItem?->quantity ?? 0;

                // how much has already been received in previous GRNs
                $alreadyReceived = GrnLineItem::whereHas('grnRecord', function ($q) use ($po) {
                    $q->where('po_id', $po->id);
                })
                    ->where('catalog_item_id', $lineItem['catalog_item_id'])
                    ->sum('quantity_received');

                // remaining quantity still owed
                $quantityOrdered = $totalOrdered - $alreadyReceived;
                $quantityReceived = $lineItem['quantity_received'];
                $discrepancyNote = null;

                // prevent over-receiving
                if ($quantityReceived > $quantityOrdered) {
                    $quantityReceived = $quantityOrdered;
                }

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
                        'warehouse_id' => $request['warehouse_id'],
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

            return $grn;
        });

    }


    public function getOpenPos(): Collection
    {
        $purchaseOrders = PurchaseOrder::with(['purchaseRequest' => fn($q) => $q->withTrashed()->with('lineItems.catalogItem')])
            ->whereIn('status', ['open', 'partially_received'])
            ->get()
            ->map(function ($po) {
                // calculate remaining qty per line item
                $po->purchaseRequest->lineItems->transform(function ($li) use ($po) {
                    $alreadyReceived = GrnLineItem::whereHas('grnRecord', function ($q) use ($po) {
                        $q->where('po_id', $po->id);
                    })
                        ->where('catalog_item_id', $li->catalog_item_id)
                        ->sum('quantity_received');

                    $li->remaining_quantity = $li->quantity - $alreadyReceived;
                    return $li;
                })->filter(fn($li) => $li->remaining_quantity > 0);

                return $po;
            })
            ->filter(function ($po) {
                // Remove POs that don't have any line items left
                return $po->purchaseRequest->lineItems->isNotEmpty();
            });

        return $purchaseOrders;
    }



}