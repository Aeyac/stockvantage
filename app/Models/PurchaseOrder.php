<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use BelongsToTenant, SoftDeletes, HasFactory;

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
    // Requested Data
    // -------------------------------------------------------
    public const RECYCLE_BIN_RELATIONS = [
        'purchaseRequest:id,requested_by',
        'purchaseRequest.requester:id,name',
        'purchaseRequest.lineItems:id,pr_id,catalog_item_id',
        'purchaseRequest.lineItems.catalogItem:id,supplier_id',
        'purchaseRequest.lineItems.catalogItem.supplier:id,name',
    ];

    // -------------------------------------------------------
    // Status constants
    // -------------------------------------------------------

    const STATUS_OPEN = 'open';
    const STATUS_PARTIALLY_RECEIVED = 'partially_received';
    const STATUS_FULLY_RECEIVED = 'fully_received';
    const STATUS_CANCELLED = 'cancelled';
    const IS_EMAIL_SENT = true;

    // -------------------------------------------------------
    // Status helpers
    // -------------------------------------------------------
    public function isEmailSent(): bool
    {
        return $this->is_email_sent === self::IS_EMAIL_SENT;

    }
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
        return $this->belongsTo(PurchaseRequest::class, 'pr_id')
            ->withTrashed();
    }

    public function grnRecords()
    {
        return $this->hasMany(GrnRecord::class, 'po_id');
    }


    public function scopeSearch($query, ?string $searchInput)
    {
        $query->when($searchInput ?? null, function ($query, $search) {
            $query->where(function ($q) use ($search) {
                $q->where('purchase_orders.po_number', 'like', '%' . $search . '%')
                    ->orWhereHas('purchaseRequest', function ($subQuery) use ($search) {
                        $subQuery->withTrashed()
                            ->where('pr_number', 'like', '%' . $search . '%')
                            ->orWhereHas('requester', function ($userQuery) use ($search) {
                                $userQuery->where('name', 'like', '%' . $search . '%');
                            });
                    });
            });
        });
    }

    public function scopeFilterStatus($query, ?string $statusInput)
    {
        // Handle dropdown status selectors (e.g., Open, Partial, Fully Received)
        $query->when($statusInput ?? null, function ($query, $status) {
            $query->where('purchase_orders.status', $status);
        });
    }
}