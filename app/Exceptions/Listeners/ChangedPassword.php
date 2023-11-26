<?php
declare(strict_types=1);


namespace App\Exceptions\Listeners;


use App\Exceptions\ContainsHttpCode;
use Exception;

class ChangedPassword extends Exception implements ContainsHttpCode
{
    public static function mailNotSent(Exception $e): ChangedPassword
    {
        return new static(sprintf("Mail was not sent: %s!", $e->getMessage()));
    }
}
