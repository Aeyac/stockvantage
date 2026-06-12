<?php

namespace App\Http\Controllers;

use App\Models\PurchaseRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseRequestRecycleBinController extends Controller
{
    public function index()
    {
        $deleted = PurchaseRequest::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->with(
                'requester',
            )
            ->latest('deleted_at')
            ->paginate(20);

        return Inertia::render('PurchaseRequests/RecycleBin', [
            'deletedRequests' => $deleted,
        ]);
    }

    public function restore($id)
    {
        $pr = PurchaseRequest::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->findOrFail($id);

        $pr->restore();

        return redirect()->route('purchase-requests.recycle-bin')
            ->with('success', 'Purchase request restored.');
    }

    public function forceDelete($id)
    {
        $pr = PurchaseRequest::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->findOrFail($id);

        if ($pr->purchaseOrder()) {
            return redirect()->route('purchase-requests.recycle-bin.index')
                ->with('error', 'Purchase request currently have an active purchase order.');
        }

        $pr->forceDelete();

        return redirect()->route('purchase-requests.recycle-bin')
            ->with('success', 'Purchase request permanently deleted.');
    }
}