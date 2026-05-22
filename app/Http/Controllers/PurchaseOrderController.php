<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
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
            'purchaseRequest.requester'
        );

        return Inertia::render('PurchaseOrders/Show', [
            'purchaseOrder' => $purchaseOrder,
        ]);
    }
}
