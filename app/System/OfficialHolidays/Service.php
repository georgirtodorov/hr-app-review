<?php
declare(strict_types=1);


namespace App\System\OfficialHolidays;


use App\Exceptions\System\OfficialHolidays;
use App\Models;

class Service
{
    /**
     * @throws \Exception
     */
    public static function get()
    {
        try {
            return Models\OfficialHolidays::all();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * @throws OfficialHolidays
     * @throws \Exception
     */
    public static function store(string $name, string $date): Models\OfficialHolidays
    {
        $validator = Validators::conflictingHolidays(new \DateTime($date));
        if ($validator) {
            throw OfficialHolidays::conflictingDates($validator);
        }
        try {
            return Models\OfficialHolidays::create([
                'name' => $name,
                'date' => new \DateTime($date)
            ]);
        } catch (\Exception $e) {
            throw OfficialHolidays::holidayNotSaved($name, $e->getMessage());
        }
    }

    /**
     * @throws OfficialHolidays
     * @throws \Exception
     */
    public static function update(int $id, string $name, string $date): Models\OfficialHolidays
    {
        $validator = Validators::conflictingHolidays(new \DateTime($date));
        if ($validator->id != $id) {
            throw OfficialHolidays::conflictingDates($validator);
        }
        try {
            return Models\OfficialHolidays::updateOrCreate(
                ['id' => $id],
                [
                    'name' => $name,
                    'date' => new \DateTime($date)
                ]);
        } catch (\Exception $e) {
            throw OfficialHolidays::holidayNotSaved($name, $e->getMessage());
        }
    }

    /**
     * @throws \Exception
     */
    public static function delete(int $id)
    {
        try {
            $holiday = Models\OfficialHolidays::find($id);
            $holiday->delete();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
