<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    use BelongsToTenant;
    
    protected $fillable = [
        'tenant_id',
        'name',
        'location',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
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
}