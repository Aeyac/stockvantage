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
            if (!auth()->check()) {
                return; // no authenticated user (queue worker, console, tinker) — skip scope
            }

            $tenantId = auth()->user()->tenant_id;

            if ($tenantId) {
                $query->where(
                    (new static)->getTable() . '.tenant_id',
                    $tenantId
                );
            }
        });

        // AUTO-ASSIGN — every new record gets tenant_id automatically
        static::creating(function ($model) {
            if (empty($model->tenant_id) && auth()->check()) {
                $model->tenant_id = auth()->user()->tenant_id;
            }
        });
    }
}