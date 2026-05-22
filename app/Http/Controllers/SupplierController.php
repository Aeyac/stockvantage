<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SupplierController extends Controller
{
    // GET /suppliers
    public function index(): Response
    {
        $suppliers = Supplier::query()
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('Suppliers/Index', [
            'suppliers' => $suppliers,
        ]);
    }

    // GET /suppliers/create
    public function create(): Response
    {
        return Inertia::render('Suppliers/Create');
    }

    // POST /suppliers
    public function store(StoreSupplierRequest $request): RedirectResponse
    {
        // validated() only — never $request->all()
        // tenant_id is auto-stamped by BelongsToTenant trait
        Supplier::create($request->validated());

        return redirect()
            ->route('suppliers.index')
            ->with('success', 'Supplier created successfully.');
    }

    // GET /suppliers/{supplier}
    public function show(Supplier $supplier): Response
    {
        // load related catalog items too
        $supplier->load('catalogItems');

        return Inertia::render('Suppliers/Show', [
            'supplier' => $supplier,
        ]);
    }

    // GET /suppliers/{supplier}/edit
    public function edit(Supplier $supplier): Response
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    // PUT /suppliers/{supplier}
    public function update(UpdateSupplierRequest $request, Supplier $supplier): RedirectResponse
    {
        $supplier->update($request->validated());

        return redirect()
            ->route('suppliers.index')
            ->with('success', 'Supplier updated successfully.');
    }

    // DELETE /suppliers/{supplier}
    public function destroy(Supplier $supplier): RedirectResponse
    {
        // soft check — don't delete if supplier has catalog items
        if ($supplier->catalogItems()->exists()) {
            return redirect()
                ->route('suppliers.index')
                ->with('error', 'Cannot delete supplier with existing catalog items.');
        }

        $supplier->delete();

        return redirect()
            ->route('suppliers.index')
            ->with('success', 'Supplier deleted successfully.');
    }
}