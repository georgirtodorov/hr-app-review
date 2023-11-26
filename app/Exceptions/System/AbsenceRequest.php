<?php
declare(strict_types=1);


namespace App\Exceptions\System;


use App\Exceptions\ContainsHttpCode;
use App\Models\AbsenceRequests;
use Exception;

class AbsenceRequest extends Exception implements ContainsHttpCode
{
    public static function noData(): AbsenceRequest
    {
        return new static('Request data not found!');
    }

    public static function conflictingDates(AbsenceRequests $conflictingRequest): AbsenceRequest
    {
        return new static(sprintf('Периодът, които се опитвате да заявите се препокрива с вече подадена молба с номер %s от %s до %s.',
            $conflictingRequest->id,
            $conflictingRequest->start_date,
            $conflictingRequest->end_date
        ), 422);
    }
}
