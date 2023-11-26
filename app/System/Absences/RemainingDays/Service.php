<?php


namespace App\System\Absences\RemainingDays;


use App\System\Absences\Archive\Repository as Archive;
use App\System\Absences\Types\Repository as Types;
use App\System\Absences\Requests\Repository as Requests;
use App\System\Employees\Repository as Employees;

class Service
{
    public function getRemainingDays()
    {
        $employees = (new Employees())->get()->map(function ($employee) {
            return [
                'id' => $employee['id'],
                'start_date' => $employee['start']
            ];
        });

        $remainingDays = (new Factory(
            $employees,
            (new Requests)->get(),
            (new \App\System\Absences\Types\Service())->getTypesWithLimits(),
            (new Archive)->get()
        ))->get();
        return $remainingDays;
    }

    public function getRemainingDaysById($id)
    {
        return $this->getRemainingDays()[$id];
    }

    public function getPaidDaysLeft(array $remainingDats)
    {
        $typeId = 1; // the typeId for paid days
        $filteredArray = array_filter($remainingDats, function ($item) use ($typeId) {
            return $item['typeId'] == $typeId;
        });
        $resultArray = array_map(function ($item) {
            return $item['remaining'];
        }, $filteredArray);
        return reset($resultArray);
    }
}
