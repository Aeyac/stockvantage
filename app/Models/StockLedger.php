<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class StockLedger extends Model
{
    use BelongsToTenant;

    // No updated_at — this table is append-only, never edited
    const UPDATED_AT = null;

    protected $fillable = [
        'tenant_id',
        'warehouse_id',
        'catalog_item_id',
        'quantity_change',
        'movement_type',
        'reference_type',
        'reference_id',
        'performed_by',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];

    // -------------------------------------------------------
    // Movement type constants
    // -------------------------------------------------------

    const MOVEMENT_RECEIVED_SHIPMENT = 'received_shipment';
    const MOVEMENT_INTERNAL_CONSUMPTION = 'internal_consumption';
    const MOVEMENT_MANUAL_ADJUSTMENT = 'manual_adjustment';

    // -------------------------------------------------------
    // Static helper — get current stock for an item
    // in a specific warehouse, or across all warehouses
    // -------------------------------------------------------

    public static function currentStock(int $catalogItemId, ?int $warehouseId = null): int
    {
        $query = self::where('catalog_item_id', $catalogItemId);

        if ($warehouseId) {
            $query->where('warehouse_id', $warehouseId);
        }

        return (int) $query->sum('quantity_change');
    }

    public static function reduceCurrentStock(int $catalogItemId, ?int $warehouseId = null, int $quantity): int
    {
        $query = self::where('catalog_item_id', $catalogItemId);

        if ($warehouseId) {
            $query->where('warehouse_id', $warehouseId);
        }

        $query->sum('quantity_change');
        return (int) $query->decrement('quantity_change', $quantity);
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function catalogItem()
    {
        return $this->belongsTo(CatalogItem::class);
    }

    public function performer()
    {
        return $this->belongsTo(User::class, 'performed_by');
    }
}