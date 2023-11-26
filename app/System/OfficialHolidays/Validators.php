<?php
declare(strict_types=1);


namespace App\System\OfficialHolidays;


use App\Models;
use \App\Exceptions;
use mysql_xdevapi\Exception;

class Validators
{
    /**
     * @throws Exceptions\System\OfficialHolidays
     */
    public static function conflictingHolidays(\DateTime $date)
    {
        return Models\OfficialHolidays::where('date', '=', $date)->first();
    }
}
