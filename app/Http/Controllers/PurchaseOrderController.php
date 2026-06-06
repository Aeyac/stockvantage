<?php

namespace App\Http\Controllers;

use App\Mail\SupplierPurchaseOrderMail;
use App\Models\PurchaseOrder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseOrderController extends Controller
{
    public function index(): Response
    {
        $purchaseOrders = PurchaseOrder::with('purchaseRequest.requester')->latest()->paginate(15);

        return Inertia::render(
            'PurchaseOrders/Index',
            ['purchaseOrders' => $purchaseOrders]
        );
    }

    public function show(PurchaseOrder $purchaseOrder): Response
    {
        $purchaseOrder->load(
            'purchaseRequest.lineItems.catalogItem',
            'purchaseRequest.lineItems.catalogItem.supplier:id,name',
            'purchaseRequest.requester',
        );

        return Inertia::render('PurchaseOrders/Show', [
            'purchaseOrder' => $purchaseOrder,
        ]);
    }

    public function sendEmail(PurchaseOrder $purchaseOrder): RedirectResponse
    {
        abort_if(!auth()->user()->isAdmin() && !auth()->user()->isManager(), 403, 'Unauthorized action.');

        $firstItem = $purchaseOrder->purchaseRequest->lineItems()->first();
        $supplierEmail = $firstItem?->catalogItem?->supplier?->contact_email;

        if ($supplierEmail) {
            Mail::to($supplierEmail)->send(new SupplierPurchaseOrderMail($purchaseOrder));
        }

        $purchaseOrder->update([
            'is_email_sent' => true,
        ]);

        return redirect()
            ->route('purchase-orders.index')
            ->with('success', 'Purchase order order is transmitted to the supplier.');
    }
}
