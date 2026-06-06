<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'pr_id',
        'po_number',
        'status',
        'is_email_sent',
        'total_amount',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'is_email_sent' => 'boolean',
    ];


    // -------------------------------------------------------
    // Status constants
    // -------------------------------------------------------

    const STATUS_OPEN = 'open';
    const STATUS_PARTIALLY_RECEIVED = 'partially_received';
    const STATUS_FULLY_RECEIVED = 'fully_received';
    const STATUS_CANCELLED = 'cancelled';

    // -------------------------------------------------------
    // Status helpers
    // -------------------------------------------------------

    public function isOpen(): bool
    {
        return $this->status === self::STATUS_OPEN;
    }

    public function isFullyReceived(): bool
    {
        return $this->status === self::STATUS_FULLY_RECEIVED;
    }

    public function isPartiallyReceived(): bool
    {
        return $this->status === self::STATUS_PARTIALLY_RECEIVED;
    }

    public function isCancelled(): bool
    {
        return $this->status === self::STATUS_CANCELLED;
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function purchaseRequest()
    {
        return $this->belongsTo(PurchaseRequest::class, 'pr_id');
    }

    public function grnRecords()
    {
        return $this->hasMany(GrnRecord::class, 'po_id');
    }
}