<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'name',
        'email',
        'password',
        'role',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // -------------------------------------------------------
    // Role helpers — use these everywhere instead of
    // checking the string directly (e.g. $user->isAdmin())
    // -------------------------------------------------------

    public function isAdmin(): bool
    {
        return $this->role === 'tenant_admin';
    }

    public function isManager(): bool
    {
        return $this->role === 'department_manager';
    }

    public function isWarehouseStaff(): bool
    {
        return $this->role === 'warehouse_staff';
    }

    public function isEmployee(): bool
    {
        return $this->role === 'employee';
    }

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    // PRs this user submitted
    public function purchaseRequests()
    {
        return $this->hasMany(PurchaseRequest::class, 'requested_by');
    }

    // PRs this user approved/rejected (as manager)
    public function approvedRequests()
    {
        return $this->hasMany(PurchaseRequest::class, 'approved_by');
    }

    // GRNs this user received (as warehouse staff)
    public function grnRecords()
    {
        return $this->hasMany(GrnRecord::class, 'received_by');
    }

    // Stock movements this user performed
    public function stockLedgers()
    {
        return $this->hasMany(StockLedger::class, 'performed_by');
    }
}