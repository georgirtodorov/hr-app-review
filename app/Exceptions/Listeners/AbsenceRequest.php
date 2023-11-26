<?php
declare(strict_types=1);


namespace App\Exceptions\Listeners;


use App\Exceptions\ContainsHttpCode;
use Exception;

class AbsenceRequest extends Exception implements ContainsHttpCode
{
    public static function mailNotSent(Exception $e): AbsenceRequest
    {
        return new static(sprintf("Mail was not sent: %s!", $e->getMessage()));
    }

    public static function logFailed(Exception $e): AbsenceRequest
    {
        return new static(sprintf("Absence failed to log: %s!", $e->getMessage()));
    }

    public static function invalidActionType(string $action): AbsenceRequest
    {
        return new static(sprintf('Invalid action type: %s', $action));
    }
}
