<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TenantSetting extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id',
        'logo_path',
        'currency',
        'approval_threshold'
    ];

    protected $casts = [
        'approval_threshold' => 'decimal:2',
    ];



    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }


}
