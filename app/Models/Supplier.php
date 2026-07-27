<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use BelongsToTenant, SoftDeletes, HasFactory;

    protected $fillable = [
        'tenant_id',
        'name',
        'contact_email',
        'phone',
        'address',
        'entity_number',
        'payment_terms',
        'is_active',
        'updated_at'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'updated_at' => 'datetime',
    ];


    // -------------------------------------------------------
    // Relationships
    // -------------------------------------------------------

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    public function catalogItems()
    {
        return $this->hasMany(CatalogItem::class);
    }

    public function scopeSearch(Builder $query, ?string $search): Builder
    {
        if (!$search)
            return $query;

        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('sku', 'like', "%{$search}%");
        });
    }

    public function scopeFilterStatus($query, $status)
    {
        if (!$status) {
            return $query;
        }

        // Replace 'status' with your actual column name if it is different
        return $query->where('status', $status);
    }

}