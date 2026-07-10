<?php

namespace App\Http\Controllers;

use App\Exceptions\StaleUpdateException;
use App\Http\Requests\StoreCatalogItemRequest;
use App\Http\Requests\UpdateCatalogItemRequest;
use App\Models\CatalogItem;
use App\Models\Supplier;
use App\Models\Traits\ChecksOptimisticLock;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CatalogItemController extends Controller
{
    use ChecksOptimisticLock;

    public function index(Request $request): Response
    {
        $result = CatalogItem::query()
            ->search($request->search) // access from the instanced model
            ->filterStatus($request->status) // access from the instanced model
            ->with('supplier')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('CatalogItems/Index', [
            'catalogItems' => $result,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        $activeSuppliers = Supplier::query()
            ->where('is_active', true)
            ->get();

        return Inertia::render('CatalogItems/Create', [
            'activeSuppliers' => $activeSuppliers
        ]);
    }

    public function store(StoreCatalogItemRequest $request): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);
        CatalogItem::create($request->validated());

        return redirect()
            ->route('catalog-items.index')
            ->with('success', 'Catalog item created successfully.');
    }

    public function edit(CatalogItem $catalogItem): Response
    {
        $supplier = Supplier::where('is_active', true)->get();

        return Inertia::render('CatalogItems/Edit', [
            'catalogItem' => $catalogItem,
            'suppliers' => $supplier
        ]);
    }

    public function update(UpdateCatalogItemRequest $request, CatalogItem $catalogItem): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        try {
            DB::transaction(function () use ($catalogItem, $request) {

                $locked = CatalogItem::where('id', $catalogItem->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $this->assertNotStale($locked, $request->validated('updated_at'));

                sleep(5);
                $locked->update($request->except('updated_at'));
            });

        } catch (StaleUpdateException $e) {
            return redirect()
                ->route('catalog-items.edit', $catalogItem)
                ->with('error', $e->getMessage() . ' Please review the latest version before saving again.');

        } catch (ModelNotFoundException $e) {
            return redirect()
                ->route('catalog-items.index')
                ->with('error', 'Update Failed: The requested catalog item could not be found or may have been deleted.');

        } catch (QueryException $e) {
            return redirect()
                ->route('catalog-items.index')
                ->with('error', 'Update Failed: This item is currently being edited. Please try again in a moment.');
        }

        return redirect()
            ->route('catalog-items.index')
            ->with('success', 'Catalog item updated successfully.');
    }

    public function destroy(CatalogItem $catalogItem): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        if ($catalogItem->prLineItems()->exists()) {
            return redirect()
                ->back()
                ->with('error', 'Cannot delete this item because it is currently linked to active line items.');
        }
        $catalogItem->delete();

        return redirect()
            ->route('catalog-items.index')
            ->with('success', 'Catalog item deleted successfully.');
    }

}

