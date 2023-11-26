<?php

namespace App\System\Employees;

use App\Models\AbsenceRequests;
use App\Models\Employee;
use App\Models\Supervisor;

class SupervisedEmployees
{
    public function get()
    {
        return  AbsenceRequests::where('type_id', '=', 1);
        return auth()->user()->employee->subordinates->pluck('id');
        $employee = auth()->user()->employee;
        $subordinates = $employee->subordinates;

//        $sad = $employee->subordinates()->with('supervisors')->get();

        $result = [];
        foreach ($subordinates as $subordinate) {
            $request = $subordinate->absenceRequests;
            if ($request['type_id'] == 1) {
                $result[] = $request;
            }
        }
        return $result;
        return $user = auth()->user()->employee->id;
        $employee = $user->employee;
        $user = auth()->user()->load('employee');

        $employee = Employee::find($employee->id);
        $supervisors = $employee->supervisors;

        $supervisor = Supervisor::find($employee->id);
        $subordinates = $supervisor->subordinates;
    }
}
