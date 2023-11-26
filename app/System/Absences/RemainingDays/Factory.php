<?php

namespace App\System\Absences\RemainingDays;

use App\Models;

class Factory
{
    /**
     * @var Models\Absences[]
     */
    private $requests;
    /**
     * @var Models\AbsencesArchive[]
     */
    private $archive;
    /**
     * @var Models\AbsenceTypes[]
     */
    private $types;

    /**
     * @var Models\Employee[]
     */
    private $employees;


    /**
     * @var array
     */
    private $remainingDays;

    public function __construct($employees, $requests, $types, $archive)
    {

        $this->employees = $employees;
        $this->requests = $requests;
        $this->archive = $archive;
        $this->types = $types;

    }

    public function get()
    {
        if ($this->remainingDays) {
            return $this->remainingDays;
        }

        foreach ($this->employees as $employee) {
            foreach ($this->types as $type) {
                $this->remainingDays[$employee['id']][] = [
                    'typeId' => $type['id'],
                    'typeName' => $type['name'],
                    'remaining' => $this->estimateDaysLeft($employee, $type)
                ];
            }
        }

        return $this->remainingDays;
    }

    private function estimateDaysLeft($employee, $type)
    {

        $userRequests = $this->getRequestsByType($employee['id'], $type['id']);
        $usedFromArchive = $this->getUsedFromArchive($employee, $type);

        $usedDays = $this->reduceToDays($userRequests);

//        $userRequests =  $this->requests->filter(function ($request) use ($employeeId, $type) {
//            return $request['employee_id'] == $employeeId && $request['type_id'] == $type;
//        });



//        return $type['approval'] != 1;
        return $this->calculateRemaining($usedDays, $employee['start_date'], $type) - $usedFromArchive;
    }

    private function calculateRemaining($usedDays, $start_date, $type)
    {
        $date = date("Y-m-d", strtotime("01-01-" . date("Y")));
        if (empty($type['transferable'])) {
            if($type['approval'] != 1) {
                return $type['annual_limit'];
            }
            return floor(floor((time() - strtotime($date)) / (60 * 60 * 24)) / $type['annual_limit']) - $usedDays;
        }

        return floor(floor((time() - strtotime($start_date)) / (60 * 60 * 24)) / $type['annual_limit']) - $usedDays;

    }

    private function reduceToDays($userRequests)
    {
        if (empty($userRequests)) {
            return 0;
        }
        return array_reduce($userRequests->toArray(), function ($carry, $item) {
            return $carry + $item['days'];
        }, 0);
    }


    private function getRequestsByType($employeeId, $type)
    {
        return $this->requests->filter(function ($request) use ($employeeId, $type) {
            return
                $request['employee_id'] == $employeeId &&
                $request['type_id'] == $type &&
                ($request['approval'] == 'APPROVED' || $request['approval'] == 'NOT_NEED');
        });
    }


    private function getUsedFromArchive($employee, $type)
    {
        $userArchive =  $this->archive->filter(function ($record) use ($employee, $type) {
            return $record['employee_id'] == $employee['id'] && $record['type_id'] == $type['id'];
        });

        $usedDays = $userArchive->map(function ($record) use ($employee, $type){
            $record['days'] = floor(floor((strtotime($record['due_date']) - strtotime($employee['start_date'])) / (60 * 60 * 24)) / $type['annual_limit']) -  $record['days'];
            return $record;
        });

        return $this->reduceToDays($usedDays);
    }


}
