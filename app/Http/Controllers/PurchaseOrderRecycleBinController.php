<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Abstracts\RecycleBinController;
use App\Http\Resources\PurchaseOrderRecycleResource;
use App\Models\PurchaseOrder;


class PurchaseOrderRecycleBinController extends RecycleBinController
{

    protected function resource(): string
    {
        return PurchaseOrderRecycleResource::class;
    }

    protected function baseQuery()
    {
        return parent::baseQuery()
            ->select([
                'id',
                'po_number',
                'pr_id',
                'status',
                'total_amount',
                'deleted_at',
                'tenant_id'
            ])
            ->with(PurchaseOrder::RECYCLE_BIN_RELATIONS)
            ->where('status', 'fully_received');
    }

    protected function model(): string
    {
        return PurchaseOrder::class;
    }

    protected function routeName(): string
    {
        return 'purchase-orders.recycle-bin.index';
    }
    protected function viewName(): string
    {
        return 'PurchaseOrders/RecycleBin';
    }
    protected function itemName(): string
    {
        return 'Purchase Order';
    }
}