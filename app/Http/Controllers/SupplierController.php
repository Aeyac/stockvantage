<?php

namespace App\Http\Controllers;

use App\Exceptions\StaleUpdateException;
use App\Models\Supplier;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Models\Traits\ChecksOptimisticLock;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class SupplierController extends Controller
{
    use ChecksOptimisticLock;
    public function index(): Response
    {
        $suppliers = Supplier::query()
            ->orderBy('name')
            ->paginate(15);

        return Inertia::render('Suppliers/Index', [
            'suppliers' => $suppliers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Suppliers/Create');
    }

    public function store(StoreSupplierRequest $request): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);
        Supplier::create($request->validated());

        return redirect()
            ->route('suppliers.index')
            ->with('success', 'Supplier created successfully.');
    }

    public function show(Supplier $supplier): Response
    {
        $supplier->load('catalogItems');

        return Inertia::render('Suppliers/Show', [
            'supplier' => $supplier,
        ]);
    }

    public function edit(Supplier $supplier): Response
    {
        return Inertia::render('Suppliers/Edit', [
            'supplier' => $supplier,
        ]);
    }

    public function update(UpdateSupplierRequest $request, Supplier $supplier): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager', 'warehouse_staff']);

        try {
            DB::transaction(function () use ($supplier, $request) {

                $locked = Supplier::where('id', $supplier->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $this->assertNotStale($locked, $request->validated('updated_at'));


                $locked->update($request->except('updated_at'));
            });

        } catch (StaleUpdateException $e) {
            return redirect()
                ->route('suppliers.index', $supplier)
                ->with('error', $e->getMessage() . ' Please review the latest version before saving again.');

        } catch (ModelNotFoundException $e) {
            return redirect()
                ->route('suppliers.index')
                ->with('error', 'Update Failed: This supplier could not be found or may have been deleted.');

        } catch (QueryException $e) {
            return redirect()
                ->route('suppliers.edit')
                ->with('error', 'Update Failed: This supplier is currently being edited. Please try again in a moment.');
        }

        return redirect()
            ->route('suppliers.index')
            ->with('success', 'Supplier updated successfully.');
    }

    public function destroy(Supplier $supplier): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

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