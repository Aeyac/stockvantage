<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Abstracts\RecycleBinController;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierRecycleBinController extends RecycleBinController
{

    // protected function resource(): string
    // {
    //     return Supplier::class;
    // }

    protected function baseQuery()
    {
        return parent::baseQuery()
            ->select([
                'id',
                'name',
                'contact_email',
                'phone',
                'entity_number',
                'payment_terms',
                'deleted_at',
                'tenant_id'
            ]);
    }

    protected function itemName(): string
    {
        return 'Supplier';
    }
    protected function model(): string
    {
        return Supplier::class;
    }
    protected function routeName(): string
    {
        return 'suppliers.recycle-bin.index';

    }
    protected function viewName(): string
    {
        return 'Suppliers/RecycleBin';
    }
}
