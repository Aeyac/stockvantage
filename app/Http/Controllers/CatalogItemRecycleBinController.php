<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Abstracts\RecycleBinController;
use App\Http\Resources\CatalogItemResource;
use App\Models\CatalogItem;
use Illuminate\Http\Request;

class CatalogItemRecycleBinController extends RecycleBinController
{
    protected function resource(): string
    {
        return CatalogItemResource::class;
    }

    protected function baseQuery()
    {
        return parent::baseQuery()
            ->select([
                'id',
                'tenant_id',
                'supplier_id',
                'sku',
                'name',
                'category',
                'unit_cost',
                'safety_stock',
                'deleted_at',
            ]);
    }

    protected function model(): string
    {
        return CatalogItem::class;
    }

    protected function routeName(): string
    {
        return 'catalog-items.recycle-bin.index';
    }
    protected function viewName(): string
    {
        return 'CatalogItems/RecycleBin';
    }
    protected function itemName(): string
    {
        return 'Catalog Item';
    }
}
