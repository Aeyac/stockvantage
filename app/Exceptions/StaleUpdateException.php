<?php

namespace App\Exceptions;

use Illuminate\Database\Eloquent\Model;
use Exception;

class StaleUpdateException extends Exception
{
    public function __construct(public Model $model)
    {
        parent::__construct(
            class_basename($model) . ' was modified by another user before this update was applied.'
        );
    }
}