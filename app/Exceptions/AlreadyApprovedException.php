<?php

namespace App\Exceptions;

use Exception;

class AlreadyApprovedException extends Exception
{
    public function __construct()
    {
        parent::__construct('This request has already been approved by someone else.');
    }
}
