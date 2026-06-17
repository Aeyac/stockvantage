<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Abstracts\RecycleBinController;
use App\Http\Resources\PurchaseOrderRecycleResource;
use App\Http\Resources\PurchaseRequestRecycleResource;
use App\Models\PurchaseRequest;


class PurchaseRequestRecycleBinController extends RecycleBinController
{
    protected function resource(): string
    {
        return PurchaseRequestRecycleResource::class;
    }

    protected function baseQuery()
    {
        return parent::baseQuery()
            ->select([
                'id',
                'pr_number',
                'requested_by',
                'status',
                'deleted_at',
                'tenant_id'
            ])
            ->with(PurchaseRequest::RECYCLE_BIN_RELATIONS);
    }
    protected function model(): string
    {
        return PurchaseRequest::class;
    }
    protected function routeName(): string
    {
        return 'purchase-requests.recycle-bin.index';
    }
    protected function viewName(): string
    {
        return 'PurchaseRequests/RecycleBin';
    }
    protected function itemName(): string
    {
        return 'Purchase Request';
    }
}