<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCatalogItemRequest;
use App\Http\Requests\UpdateCatalogItemRequest;
use App\Models\CatalogItem;
use App\Models\Supplier;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CatalogItemController extends Controller
{

    public function index(): Response
    {
        $catalogItems = CatalogItem::query()
            ->with('supplier')
            ->paginate(15);

        return Inertia::render('CatalogItems/Index', [
            'catalogItems' => $catalogItems
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
        $catalogItem->update($request->validated());

        return redirect()->
            route('catalog-items.index')
            ->with('success', 'Catalog item updated successfully.');
    }

    public function destroy(CatalogItem $catalogItem): RedirectResponse
    {

        // Check if any line items are using this catalog item
        if ($catalogItem->prLineItems()->exists()) { // Assumes you have the relationship defined
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
