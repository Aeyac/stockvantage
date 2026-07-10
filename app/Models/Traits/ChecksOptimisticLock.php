<?php

namespace App\Models\Traits;


use App\Exceptions\StaleUpdateException;
use Illuminate\Database\Eloquent\Model;

trait ChecksOptimisticLock
{
    protected function assertNotStale(Model $lockedModel, ?string $submittedUpdatedAt): void
    {
        if (!$submittedUpdatedAt || $lockedModel->updated_at->ne($submittedUpdatedAt)) {
            throw new StaleUpdateException($lockedModel);
        }
    }
}
