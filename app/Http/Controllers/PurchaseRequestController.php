<?php
namespace App\Http\Controllers;

use App\Exceptions\AlreadyApprovedException;
use App\Exceptions\StaleUpdateException;
use App\Http\Requests\StorePurchaseRequestRequest;
use App\Models\CatalogItem;
use App\Models\PurchaseRequest;
use App\Models\TenantSetting;
use App\Services\PurchaseRequestService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;



class PurchaseRequestController extends Controller
{
    public function index(Request $request): Response
    {
        abort_if(!auth()->check(), 404);

        $query = PurchaseRequest::query()->with('requester')
            ->search($request->search)
            ->filterStatus($request->status);

        if (auth()->user()->isEmployee() || auth()->user()->isWarehouseStaff()) {
            $query->where('requested_by', auth()->user()->id);
        }

        $items = $query->latest()->paginate(15)->withQueryString();

        return Inertia::render('PurchaseRequests/Index', [
            'purchaseRequests' => $items,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        $catalogItems = CatalogItem::with('supplier')->where('is_active', true)->get();

        return Inertia::render('PurchaseRequests/Create', [
            'catalogItems' => $catalogItems,
        ]);
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

    public function store(StorePurchaseRequestRequest $request, PurchaseRequestService $prService): RedirectResponse
    {
        try {
            $prService->createRequest(
                $request->items,
                $request->justification,
                auth()->user()
            );
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return redirect()->back()->with('error', 'Something went wrong. Please try again.');
        }

        return redirect()
            ->route('purchase-requests.index')
            ->with('success', 'Purchase request submitted successfully.');
    }

    public function approve(PurchaseRequest $purchaseRequest, PurchaseRequestService $prService): RedirectResponse
    {
        abort_if(!auth()->user()->isAdmin() && !auth()->user()->isManager(), 403, 'Unauthorized action.');
        if (!$purchaseRequest->isAwaitingApproval()) {
            return redirect()
                ->route('purchase-requests.index')
                ->with('error', 'This request has already been processed and can no longer be approved.');
        }

        try {
            $prService->approveRequest($purchaseRequest, auth()->id());

            $isAutoSendEmail = TenantSetting::where('tenant_id', auth()->user()->tenant_id)
                ->value('auto_send_email');

            $toastMessage = $isAutoSendEmail
                ? 'Purchase request approved and purchase order is transmitted to the supplier.'
                : 'Purchase request approved.';

        } catch (StaleUpdateException | AlreadyApprovedException $e) {
            return redirect()
                ->route('purchase-request.edit', $purchaseRequest)
                ->with('error', $e->getMessage());

        } catch (ModelNotFoundException $e) {
            return redirect()
                ->route('purchase-requests.index')
                ->with('error', 'This purchase request could not be found or may have been deleted.');

        } catch (QueryException $e) {
            return redirect()
                ->route('purchase-requests.index')
                ->with('error', 'This request is currently being processed. Please try again in a moment.');
        }

        return redirect()
            ->route('purchase-requests.index')
            ->with('success', $toastMessage);
    }

    public function reject(PurchaseRequest $purchaseRequest): RedirectResponse
    {
        abort_if(!auth()->user()->isAdmin() && !auth()->user()->isManager(), 403, 'Unauthorized action.');
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

    public function destroy(PurchaseRequest $purchaseRequest): RedirectResponse
    {
        abort_if(!auth()->user()->isAdmin() && !auth()->user()->isManager(), 403, 'Unauthorized action.');

        if ($purchaseRequest->purchaseOrder()->where('status', 'open')->exists()) {
            return redirect()->route('purchase-requests.index')
                ->with('error', 'Purchase request has an existing open status purchase order.');
        }

        $purchaseRequest->delete();

        return redirect()->route('purchase-requests.index')
            ->with('success', 'Purchase request moved to recycle bin.');
    }



}
