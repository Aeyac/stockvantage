<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePurchaseRequestRequest;
use App\Mail\SupplierPurchaseOrderMail;
use App\Models\CatalogItem;
use App\Models\PurchaseOrder;
use App\Models\PurchaseRequest;
use App\Models\StockLedger;
use App\Models\TenantSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use User;



class PurchaseRequestController extends Controller
{
    public function index(): Response
    {
        $query = PurchaseRequest::query()
            ->with('requester')
            ->latest();

        // employees only see their own PRs
        if (auth()->user()->isEmployee() || auth()->user()->isWarehouseStaff()) {
            $query->where('requested_by', auth()->id());
        }

        return Inertia::render('PurchaseRequests/Index', [
            'purchaseRequests' => $query->paginate(15),
        ]);
    }

    public function create(): Response
    {

        $catalogItems = CatalogItem::with('supplier')->where('is_active', true)->get();

        return Inertia::render('PurchaseRequests/Create', [
            'catalogItems' => $catalogItems,
        ]);
    }

    public function store(StorePurchaseRequestRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                // 1. calculate total from DB prices, never from client
                $total = 0;
                $items = [];
                foreach ($request->items as $item) {
                    $catalogItem = CatalogItem::findOrFail($item['catalog_item_id']);
                    $lineTotal = $item['quantity'] * $catalogItem->unit_cost;
                    $total += $lineTotal;
                    $items[] = [
                        'catalog_item_id' => $item['catalog_item_id'],
                        'quantity' => $item['quantity'],
                        'unit_cost' => $catalogItem->unit_cost, // snapshot
                        'line_total' => $lineTotal,
                    ];
                }

                // // 2. determine status
                $status = $total < session('tenant_threshold')
                    ? PurchaseRequest::STATUS_AUTO_APPROVED
                    : PurchaseRequest::STATUS_AWAITING_APPROVAL;

                // 3. create the PR
                $pr = PurchaseRequest::create([
                    'pr_number' => 'PR-' . str_pad(
                        PurchaseRequest::withTrashed()->where('tenant_id', auth()->user()->tenant_id)->count() + 1,
                        4,
                        '0',
                        STR_PAD_LEFT
                    ),
                    'requested_by' => auth()->id(),
                    'status' => $status,
                    'total_amount' => $total,
                    'justification' => $request->justification,
                ]);

                // 4. create line items
                foreach ($items as $item) {
                    $pr->lineItems()->create($item);
                }

                // 5. auto-generate PO if auto approved
                if ($status === PurchaseRequest::STATUS_AUTO_APPROVED) {
                    $this->generatePurchaseOrder($pr);
                }
            });
        } catch (\Exception $e) {
            \Log::error($e->getMessage()); // add this
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }

        return redirect()
            ->route('purchase-requests.index')
            ->with('success', 'Purchase request submitted successfully.');
    }

    private function generatePurchaseOrder(PurchaseRequest $pr): void
    {
        $count = PurchaseOrder::whereYear('created_at', now()->year)->count() + 1;
        $poNumber = 'PO-' . now()->year . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);

        $purchaseOrder = PurchaseOrder::create([
            'pr_id' => $pr->id,
            'po_number' => $poNumber,
            'status' => PurchaseOrder::STATUS_OPEN,
            'total_amount' => $pr->total_amount,
        ]);

        $isAutoSendEmail = TenantSetting::where('id', auth()->user()->tenant_id)->value('auto_send_email');

        if ($isAutoSendEmail) {
            $firstItem = $purchaseOrder->purchaseRequest->lineItems()->first();
            $supplierEmail = $firstItem?->catalogItem?->supplier?->contact_email;

            if ($supplierEmail) {
                Mail::to($supplierEmail)->send(new SupplierPurchaseOrderMail($purchaseOrder));
            }
        }

    }


    public function show(PurchaseRequest $purchaseRequest): Response
    {
        $purchaseRequest->load(
            'lineItems.catalogItem',
            'lineItems.catalogItem.supplier:id,name',
            'requester'
        );

        return Inertia::render('PurchaseRequests/Show', [
            'purchaseRequest' => $purchaseRequest,
        ]);
    }

    public function approve(PurchaseRequest $purchaseRequest): RedirectResponse
    {
        abort_if(
            !auth()->user()->isAdmin() && !auth()->user()->isManager(),
            403,
            'Unauthorized action.'
        );

        abort_if(!$purchaseRequest->isAwaitingApproval(), 403, 'This request cannot be approved.');


        $purchaseRequest->update([
            'status' => PurchaseRequest::STATUS_APPROVED,
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        $this->generatePurchaseOrder($purchaseRequest);

        $toastMessage = session('auto_send_email')
            ? 'Purchase request approved and purchase order is transmitted to the supplier.'
            : 'Purchase request approved.';

        return redirect()
            ->route('purchase-requests.index')
            ->with('success', $toastMessage);
    }


    public function reject(PurchaseRequest $purchaseRequest): RedirectResponse
    {
        abort_if(
            !auth()->user()->isAdmin() && !auth()->user()->isManager(),
            403,
            'Unauthorized action.'
        );

        abort_if(!$purchaseRequest->isAwaitingApproval(), 403, 'This request cannot be approved.');

        $purchaseRequest->update([
            'status' => PurchaseRequest::STATUS_REJECTED,
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return redirect()
            ->route('purchase-requests.index')
            ->with('success', 'Purchase request rejected.');
    }


    public function destroy(PurchaseRequest $purchaseRequest)
    {
        if ($purchaseRequest->purchaseOrder()->with('status', 'open')) {
            return redirect()->route('purchase-requests.index')
                ->with('error', 'Purchase request has an existing open status purchase order.');
        }

        abort_if(!auth()->user()->isAdmin() && !auth()->user()->isManager(), 403, 'Unauthorized action.');
        $purchaseRequest->delete();

        return redirect()->route('purchase-requests.index')
            ->with('success', 'Purchase request moved to recycle bin.');
    }



}
