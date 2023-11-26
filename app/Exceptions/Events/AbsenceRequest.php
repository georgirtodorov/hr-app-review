<?php
declare(strict_types=1);


namespace App\Exceptions\Events;


use App\Exceptions\ContainsHttpCode;
use Exception;

class AbsenceRequest extends Exception implements ContainsHttpCode
{
    public static function invalidActionType(string $action): AbsenceRequest
    {
        return new static(sprintf('Invalid action type: %s', $action));
    }
}
