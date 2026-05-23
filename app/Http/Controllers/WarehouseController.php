<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWarehouseRequest;
use App\Http\Requests\UpdateWarehouseRequest;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;



class WarehouseController extends Controller
{

    public function index(): Response
    {
        $warehouse = Warehouse::where('is_active', true)->paginate(15);
        return Inertia::render('Warehouse/Index', [
            'warehouse' => $warehouse
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Warehouse/Create');
    }

    public function store(StoreWarehouseRequest $request): RedirectResponse
    {
        Warehouse::create($request->validated());

        return redirect()
            ->route('Warehouse/Index')
            ->with('succes', 'Warehouse created successfully.');
    }

    public function edit(Warehouse $warehouse): Response
    {
        return Inertia::render('Warehouse/Edit', [
            'warehouse' => $warehouse
        ]);
    }

    public function update(UpdateWarehouseRequest $request, Warehouse $warehouse): RedirectResponse
    {
        $warehouse->update($request->validated());

        return redirect()
            ->route('Warehouse/Update')
            ->with('succes', 'Warehouse successfully updated.');
    }

    public function destroy(Warehouse $warehouse): RedirectResponse
    {
        if ($warehouse->stockLedgers()) {
            return redirect()->route('Warehouse/Index')
                ->with('error', 'Warehouse has existing stock ledger entries.');
        }

        $warehouse->delete();

        return redirect()->route('Warehouse/Index')
            ->with('success', 'Warehouse deleted successfully.');
    }
}
