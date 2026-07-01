<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;

abstract class Controller
{
    protected function abortUnlessRole(array $roles): void
    {
        abort_if(!in_array(auth()->user()->role, $roles), 403, 'Unauthorized Action!');
    }

    public function applySearch(Builder $query, ?string $search): Builder
    {
        if (!$search)
            return $query;

        return $query->where(function ($q) use ($search) {
            $q->where('pr_number', 'like', "%{$search}%")
                ->orWhereHas('requester', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%");
                });
        });
    }

    public function applyFilterStatus(Builder $query, ?string $status): Builder
    {
        if (!$status)
            return $query;

        return $query->where('status', $status);
    }
}
