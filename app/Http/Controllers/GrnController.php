<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGrnRequest;
use App\Models\GrnLineItem;
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
    public function index(Request $request): Response
    {
        $grns = GrnRecord::with('purchaseOrder')
            ->search($request->search)
            ->filterStatus($request->status)
            ->paginate(15)->withQueryString();

        return Inertia::render('Grns/Index', [
            'grns' => $grns,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    public function create(): Response
    {
        abort_if(
            !auth()->user()->isAdmin() && !auth()->user()->isWarehouseStaff(),
            403,
            'Unauthorized action.'
        );

        $openPos = PurchaseOrder::with(['purchaseRequest' => fn($q) => $q->withTrashed()->with('lineItems.catalogItem')])
            ->whereIn('status', ['open', 'partially_received'])
            ->get()
            ->map(function ($po) {
                // calculate remaining qty per line item
                $po->purchaseRequest->lineItems->map(function ($li) use ($po) {
                    $alreadyReceived = GrnLineItem::whereHas('grnRecord', function ($q) use ($po) {
                        $q->where('po_id', $po->id);
                    })
                        ->where('catalog_item_id', $li->catalog_item_id)
                        ->sum('quantity_received');

                    $li->remaining_quantity = $li->quantity - $alreadyReceived;
                    return $li;
                })->filter(fn($li) => $li->remaining_quantity > 0);
                return $po;
            });

        return Inertia::render('Grns/Create', [
            'openPurchaseOrders' => $openPos,
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
        abort_if(
            !auth()->user()->isAdmin() && !auth()->user()->isWarehouseStaff(),
            403,
            'Unauthorized action.'
        );

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
