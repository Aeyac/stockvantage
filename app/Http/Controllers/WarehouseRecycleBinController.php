<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseRecycleBinController extends Controller
{
    public function index(): Response
    {
        $deleted = Warehouse::onlyTrashed()
            ->where('tenant_id', auth()->user()->tenant_id)
            ->latest('deleted_at')
            ->paginate(15);

        return Inertia::render('Warehouses/RecycleBin', [
            'deletedItems' => $deleted,
        ]);
    }


}
