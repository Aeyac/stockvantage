<?php

namespace App\Http\Controllers;

use App\Http\Resources\PurchaseOrderRecycleResource;
use App\Models\PurchaseOrder;
use App\Models\PurchaseRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseOrderRecycleBinController extends Controller
{
    public function index()
    {
        $deleted = PurchaseOrder::onlyTrashed()
            ->select('id', 'po_number', 'pr_id', 'status', 'total_amount', 'deleted_at', 'tenant_id')
            ->with(PurchaseOrder::RECYCLE_BIN_RELATIONS)
            ->where('tenant_id', auth()->user()->tenant_id)
            ->where('status', 'fully_received')
            ->latest('deleted_at')
            ->paginate(20);

        return Inertia::render('PurchaseOrders/RecycleBin', [
            'deletedOrders' => PurchaseOrderRecycleResource::collection($deleted),
        ]);
    }

    public function restore($id)
    {
        $pr = PurchaseOrder::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->findOrFail($id);

        $pr->restore();

        return redirect()->route('purchase-orders.index')
            ->with('success', 'Purchase order restored.');
    }

    public function forceDelete($id)
    {

        abort_if(!auth()->user()->isAdmin() && !auth()->user()->isManager(), 403, 'Unauthorized action.');

        $pr = PurchaseOrder::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->findOrFail($id);

        // if ($pr->purchaseOrder()) {
        //     return redirect()->route('purchase-requests.recycle-bin.index')
        //         ->with('error', 'Purchase request currently have an active purchase order.');
        // }

        $pr->forceDelete();

        return redirect()->route('purchase-orders.recycle-bin')
            ->with('success', 'Purchase order permanently deleted.');
    }
}