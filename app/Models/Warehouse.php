<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
//awdawd

class Warehouse extends Model
{
    use BelongsToTenant, SoftDeletes, HasFactory;

    protected $fillable = [
        'tenant_id',
        'name',
        'location',
        'is_active',
        'updated_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'updated_at' => 'datetime',
    ];

    public const RECYCLE_BIN_RELATIONS = [
        '',
    ];

    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function stockLedgers()
    {
        return $this->hasMany(StockLedger::class);
    }

    // -------------------------------------------------------
    // HELPER METHODS
    // -------------------------------------------------------
    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (!$search)
            return $query;

        return $query->where('name', 'like', "%{$search}%");
    }


    public function scopeFilterStatus(Builder $query, ?string $status): Builder
    {
        if ($status === null || $status === '') {
            return $query;
        }

        return $query->where('is_active', $status);
    }
}