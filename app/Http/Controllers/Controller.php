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
    

}
