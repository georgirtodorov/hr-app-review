<?php
declare(strict_types=1);


namespace App\Exceptions\System;


use App\Exceptions\ContainsHttpCode;
use Exception;

class Logs extends Exception implements ContainsHttpCode
{
    public static function notFetched(string $message): Logs
    {
        return new static(sprintf('Error on getting logs: %s', $message));
    }

    public static function notSaved(string $message): Logs
    {
        return new static(sprintf('Error on saving a log: %s', $message));
    }
}
