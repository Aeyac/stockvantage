<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Services\PurchaseOrderService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PurchaseOrderController extends Controller
{
    public function index(Request $request): Response
    {
        $purchaseOrders = PurchaseOrder::with([
            'purchaseRequest' => fn($q) => $q->withTrashed()->with('requester'),
        ])
            ->search($request->search) // 2. Pass all inputs safely into your scope method
            ->filterStatus($request->status) // 2. Pass all inputs safely into your scope method
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render(
            'PurchaseOrders/Index',
            [
                'purchaseOrders' => $purchaseOrders,
                'filters' => $request->only(['search', 'status']),
            ]
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

    public function sendEmail(PurchaseOrder $purchaseOrder, PurchaseOrderService $service): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        try {
            $service->sendPoEmail($purchaseOrder);
        } catch (Exception $e) {
            dd($e->getMessage());
            logger()->error('PO Email Failed: ' . $e->getMessage());

            return redirect()
                ->route('purchase-orders.index')
                ->with('error', 'Failed to send email: ' . $e->getMessage());
        }

        return redirect()
            ->route('purchase-orders.index')
            ->with('success', 'Purchase order order is transmitted to the supplier.');
    }


    public function destroy(PurchaseOrder $purchaseOrder)
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        if ($purchaseOrder->status === 'open') {
            return redirect()->route('purchase-orders.index')
                ->with('error', 'Purchase order is currently open.');
        }

        $purchaseOrder->delete();

        return redirect()->route('purchase-orders.index')
            ->with('success', 'Purchase order moved to recycle bin.');
    }
}
