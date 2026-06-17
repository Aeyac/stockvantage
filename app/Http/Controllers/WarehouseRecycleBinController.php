<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Abstracts\RecycleBinController;
use App\Http\Resources\WarehouseRecycleResource;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WarehouseRecycleBinController extends RecycleBinController
{

    protected function resource(): string
    {
        return WarehouseRecycleResource::class;
    }
    protected function baseQuery()
    {
        return parent::baseQuery()->select([
            'id',
            'name',
            'location',
            'deleted_at',
            'tenant_id'
        ]);
    }

    protected function model(): string
    {
        return Warehouse::class;
    }
    protected function routeName(): string
    {
        return 'warehouses.recycle-bin.index';
    }
    protected function viewName(): string
    {
        return 'Warehouses/RecycleBin';
    }
    protected function itemName(): string
    {
        return 'Warehouse Order';
    }

}
