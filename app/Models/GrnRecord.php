<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class GrnRecord extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'po_id',
        'received_by',
        'status',
        'notes',
    ];

    // -------------------------------------------------------
    // Status constants
    // -------------------------------------------------------

    const STATUS_COMPLETE = 'complete';
    const STATUS_PARTIALLY_RECEIVED = 'partially_received';
    const STATUS_DISCREPANCY = 'discrepancy';

    // -------------------------------------------------------
    // Status helpers
    // -------------------------------------------------------

    public function isComplete(): bool
    {
        return $this->status === self::STATUS_COMPLETE;
    }

    public function hasDiscrepancy(): bool
    {
        return $this->status === self::STATUS_DISCREPANCY;
    }

    public function isPartial(): bool
    {
        return $this->status === self::STATUS_PARTIALLY_RECEIVED;
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class, 'po_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'received_by');
    }

    public function lineItems()
    {
        return $this->hasMany(GrnLineItem::class, 'grn_id');
    }

    //HELPER FUNCTIONS
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (!$search || $search === '') {
            return $query;
        }

        return $query->where('id', 'like', $search);
    }

    public function scopeFilterStatus(Builder $query, ?string $status): Builder
    {
        if ($status === null || $status === '') {
            return $query;
        }

        return $query->where('status', $status);
    }
}