<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Models\Warehouse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseController extends Controller
{
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
        abort_if(
            !auth()->user()->isAdmin() && !auth()->user()->isWarehouseStaff(),
            403,
            'Unauthorized action.'
        );

        return Inertia::render('Warehouses/Create');
    }

    public function store(StoreWarehouseRequest $request): RedirectResponse
    {
        abort_if(
            !auth()->user()->isAdmin() && !auth()->user()->isWarehouseStaff(),
            403,
            'Unauthorized action.'
        );

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
        $warehouse->update($request->validated());

        return redirect()
            ->route('warehouses.index')
            ->with('success', 'Warehouse updated successfully.');
    }

    public function destroy(Warehouse $warehouse): RedirectResponse
    {
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