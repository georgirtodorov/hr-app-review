<?php
declare(strict_types=1);


namespace App\Exceptions\System;


use App\Exceptions\ContainsHttpCode;
use App\Models;
use Exception;

class OfficialHolidays extends Exception implements ContainsHttpCode
{
    public static function conflictingDates(Models\OfficialHolidays $conflictingHoliday): OfficialHolidays
    {
        return new static(sprintf('The dates conflict with an existing official holiday with name %s for %s.',
            $conflictingHoliday->name,
            $conflictingHoliday->date,
        ), 422);
    }

    public static function holidayNotSaved(string $name, string $message): OfficialHolidays
    {
        return new static(sprintf('Holiday %s not saved. Reason: %s',
            $name,
            $message
        ), 422);
    }
}
