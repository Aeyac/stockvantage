<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use BelongsToTenant, SoftDeletes;

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
}