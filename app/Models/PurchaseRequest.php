<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseRequest extends Model
{
    use BelongsToTenant, SoftDeletes;
    protected $fillable = [
        'tenant_id',
        'pr_number',
        'requested_by',
        'approved_by',
        'status',
        'total_amount',
        'justification',
        'approved_at',
    ];

    protected $casts = [
        'total_amount' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    // -------------------------------------------------------
    // Status constants — never hardcode strings in controllers
    // -------------------------------------------------------

    const STATUS_PENDING = 'pending';
    const STATUS_AUTO_APPROVED = 'auto_approved';
    const STATUS_PARTIALLY_APPROVED = 'partially_approved';
    const STATUS_AWAITING_APPROVAL = 'awaiting_approval';
    const STATUS_APPROVED = 'approved';
    const STATUS_REJECTED = 'rejected';

    // -------------------------------------------------------
    // Status helpers
    // -------------------------------------------------------

    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    public function isAwaitingApproval(): bool
    {
        return $this->status === self::STATUS_AWAITING_APPROVAL;
    }

    public function isApproved(): bool
    {
        return in_array($this->status, [
            self::STATUS_APPROVED,
            self::STATUS_AUTO_APPROVED,
        ]);
    }

    public function isPartiallyApproved(): bool
    {
        return $this->status === self::STATUS_PARTIALLY_APPROVED;
    }

    public function isRejected(): bool
    {
        return $this->status === self2::STATUS_REJECTED;
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requested_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function lineItems()
    {
        return $this->hasMany(PrLineItem::class, 'pr_id');
    }

    public function purchaseOrder()
    {
        return $this->hasOne(PurchaseOrder::class, 'pr_id');
    }
}