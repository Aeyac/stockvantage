<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;

abstract class Controller
{
    protected function abortUnlessRole(array $roles): void
    {
        abort_if(403, !in_array(auth()->user()->role, $roles), 'Unauthorized Action!');
    }
}
