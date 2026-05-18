<?php

namespace App\Models\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\App;

trait BelongsToTenant
{
    protected static function bootBelongsToTenant(): void
    {
        // AUTO-FILTER — every query on this model gets tenant_id appended
        static::addGlobalScope('tenant', function (Builder $query) {
            $tenantId = session('tenant_id');

            if ($tenantId) {
                $query->where(
                    (new static)->getTable() . '.tenant_id',
                    $tenantId
                );
            }
        });

        // AUTO-ASSIGN — every new record gets tenant_id automatically
        static::creating(function ($model) {
            if (empty($model->tenant_id)) {
                $model->tenant_id = session('tenant_id');
            }
        });
    }
}