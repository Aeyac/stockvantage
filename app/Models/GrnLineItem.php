<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Note: No BelongsToTenant trait here — same reason as PrLineItem.
// GrnLineItems are always accessed through a GrnRecord
// which is already scoped to the tenant.

class GrnLineItem extends Model
{
    protected $fillable = [
        'grn_id',
        'catalog_item_id',
        'quantity_ordered',
        'quantity_received',
        'discrepancy_note',
    ];

    // -------------------------------------------------------
    // Helpers
    // -------------------------------------------------------

    // How many units are missing from this line?
    public function discrepancyCount(): int
    {
        return $this->quantity_ordered - $this->quantity_received;
    }

    // Was this line fully received?
    public function isFullyReceived(): bool
    {
        return $this->quantity_received >= $this->quantity_ordered;
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function grnRecord()
    {
        return $this->belongsTo(GrnRecord::class, 'grn_id');
    }

    public function catalogItem()
    {
        return $this->belongsTo(CatalogItem::class);
    }
}