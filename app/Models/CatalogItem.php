<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatalogItem extends Model
{
    use BelongsToTenant, SoftDeletes;

    protected $fillable = [
        'tenant_id',
        'supplier_id',
        'sku',
        'name',
        'category',
        'unit_cost',
        'safety_stock',
        'is_active',
    ];

    protected $casts = [
        'unit_cost' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public const RECYCLE_BIN_RELATIONS = [
        'supplier: id, name',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function prLineItems()
    {
        return $this->hasMany(PrLineItem::class);
    }

    public function grnLineItems()
    {
        return $this->hasMany(GrnLineItem::class);
    }

    public function stockLedgers()
    {
        return $this->hasMany(StockLedger::class);
    }

    // -------------------------------------------------------
    // Helpers
    // -------------------------------------------------------

    // Get current stock across all warehouses for this item
    public function currentStock(?int $warehouseId = null): int
    {
        $query = $this->stockLedgers();

        if ($warehouseId) {
            $query->where('warehouse_id', $warehouseId);
        }

        return (int) $query->sum('quantity_change');
    }

    // Check if stock is at or below safety threshold
    public function isBelowSafetyStock(?int $warehouseId = null): bool
    {
        return $this->currentStock($warehouseId) <= $this->safety_stock;
    }
}