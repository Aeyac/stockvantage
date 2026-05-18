<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Note: No BelongsToTenant trait here.
// PrLineItems are always accessed THROUGH a PurchaseRequest
// which is already scoped to the tenant. Adding tenant_id
// here would be redundant — you never query line items directly
// without going through their parent PR.

class PrLineItem extends Model
{
    protected $fillable = [
        'pr_id',
        'catalog_item_id',
        'quantity',
        'unit_cost',
        'line_total',
    ];

    protected $casts = [
        'unit_cost' => 'decimal:2',
        'line_total' => 'decimal:2',
    ];

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function purchaseRequest()
    {
        return $this->belongsTo(PurchaseRequest::class, 'pr_id');
    }

    public function catalogItem()
    {
        return $this->belongsTo(CatalogItem::class);
    }
}