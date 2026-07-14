<?php

namespace App\Http\Controllers;

use App\Exceptions\StaleUpdateException;
use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Models\Traits\ChecksOptimisticLock;
use App\Models\Warehouse;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseController extends Controller
{
    use ChecksOptimisticLock;
    public function index(Request $request): Response
    {
        $warehouses = Warehouse::
            search($request->search)
            ->filterStatus($request->status)
            ->paginate(15)->withQueryString();

        return Inertia::render('Warehouses/Index', [
            'warehouses' => $warehouses,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create(): Response
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        return Inertia::render('Warehouses/Create');
    }

    public function store(StoreWarehouseRequest $request): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        Warehouse::create($request->validated());

        return redirect()
            ->route('warehouses.index')
            ->with('success', 'Warehouse created successfully.');
    }

    public function edit(Warehouse $warehouse): Response
    {
        return Inertia::render('Warehouses/Edit', [
            'warehouse' => $warehouse,
        ]);
    }

    public function update(UpdateWarehouseRequest $request, Warehouse $warehouse): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        try {
            DB::transaction(function () use ($request, $warehouse) {
                $locked = Warehouse::where('id', $warehouse->id)
                    ->lockForUpdate()
                    ->firstOrFail();

                $this->assertNotStale($locked, $request->validated('updated_at'));

                sleep(4);

                $locked->update($request->except('updated_at'));

            });

        } catch (StaleUpdateException $e) {
            return redirect()
                ->route('warehouses.index', $warehouse)
                ->with('error', $e->getMessage() . ' Please review the latest version before saving again.');

        } catch (ModelNotFoundException $e) {
            return redirect()
                ->route('warehouses.index')
                ->with('error', 'Update Failed: This warehouse could not be found or may have been deleted.');

        } catch (QueryException $e) {
            return redirect()
                ->route('warehouses.edit')
                ->with('error', 'Update Failed: This warehouse is currently being edited. Please try again in a moment.');
        }


        return redirect()
            ->route('warehouses.index')
            ->with('success', 'Warehouse updated successfully.');
    }

    public function destroy(Warehouse $warehouse): RedirectResponse
    {
        $this->abortUnlessRole(['tenant_admin', 'department_manager']);

        if ($warehouse->stockLedgers()->exists()) {
            return redirect()
                ->route('warehouses.index')
                ->with('error', 'Cannot delete warehouse with existing stock ledger entries.');
        }

        $warehouse->delete();

        return redirect()
            ->route('warehouses.index')
            ->with('success', 'Warehouse deleted successfully.');
    }
}