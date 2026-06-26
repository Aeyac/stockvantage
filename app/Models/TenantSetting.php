<?php

namespace App\Models;

use App\Models\Traits\BelongsToTenant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TenantSetting extends Model
{

    protected $fillable = [
        'tenant_id',
        'company_name',
        'logo_path',
        'currency',
        'approval_threshold',
        'auto_send_email'
    ];

    protected $casts = [
        'approval_threshold' => 'decimal:2',
        'auto_send_email' => 'boolean',
    ];

    const DEFAULTS = [
        'company_name' => 'My Company',
        'currency' => 'PHP',
        'approval_threshold' => 500.00,
        'auto_send_email' => false,
        'logo_path' => null,
    ];



    public function tenant(): BelongsTo
    {
        return $this->belongsTo(Tenant::class);
    }

    public static function currencySymbol(string $currency): string
    {
        return match ($currency) {
            'USD' => '$',
            'PHP' => '₱',
            'EUR' => '€',
            'GBP' => '£',
            default => '₱',
        };
    }


}
