<?php

namespace App\Http\Controllers;

use App\Models\CatalogItem;
use App\Models\StockLedger;
use App\Models\WareHouse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryController extends Controller
{

    public function index(): Response
    {
        $warehouses = WareHouse::where('is_active', true)->get();

        $catalogItems = CatalogItem::with('supplier')
            ->where('is_active', true)
            ->get()
            ->map(function ($item) use ($warehouses) {
                $item->stock_by_warehouse = $warehouses->map(function ($warehouse) use ($item) {
                    return [
                        'warehouse_id' => $warehouse->id,
                        'warehouse_name' => $warehouse->name,
                        'current_stock' => StockLedger::currentStock($item->id, $warehouse->id),
                        'below_safety' => $item->isBelowSafetyStock($warehouse->id),
                    ];
                });
                return $item;
            });

        return Inertia::render('Inventory/Index', [
            'catalogItems' => $catalogItems,
            'warehouses' => $warehouses,
        ]);
    }
}
