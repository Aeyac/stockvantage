<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGrnRequest;
use App\Models\GrnLineItem;
use App\Models\GrnRecord;
use App\Models\PurchaseOrder;
use App\Models\StockLedger;
use App\Models\Warehouse;
use App\Services\GrnService;
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

    public function create(GrnService $service): Response|RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'warehouse_staff']);

        try {
            $openPos = $service->getOpenPos();
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }

        return Inertia::render('Grns/Create', [
            'openPurchaseOrders' => $openPos,
            'warehouses' => Warehouse::where('is_active', true)->get(),
        ]);
    }



    public function show(GrnRecord $grn): Response
    {
        $this->abortUnlessRole(['tenant_admin', 'warehouse_staff']);
        $grn->load('lineItems.catalogItem', 'purchaseOrder.purchaseRequest.requester');

        return Inertia::render('Grns/Show', ['grn' => $grn]);
    }



    public function store(StoreGrnRequest $request, GrnService $service): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'warehouse_staff']);

        try {
            $service->createGRN($request);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }

        return redirect()
            ->route('grn.index')
            ->with('success', 'GRN recorded successfully.');
    }
}
