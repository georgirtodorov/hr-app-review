<?php

namespace App\System\Absences\Requests;

use App\Models\AbsenceRequests;

use App\Models\Absences;


class Repository
{

    public function make($request) {

    }

    public function getById(int $employeeId)
    {
        $absences = Absences::where('employee_id', $employeeId)
            ->join('absence_types', 'absences.type', '=', 'absence_types.id')
            ->get([
                'absences.*',
                'absence_types.name as type_name',
            ]);
        return $absences;
//        try {
//            return Absences::where('employee_id', $employeeId)
//                ->join('absence_types', 'absences.type', '=', 'absence_types.id')
//                ->get([
//                    'absences.*',
//                    'absence_types.name as type_name',
//                ]);
//        } catch (\Exception $e) {
//            return $e->getMessage();
//        }
    }


//    public function get()
//    {
//        $absences = Absences::join('absence_types', 'absences.type', '=', 'absence_types.id')
//            ->get([
//                'absences.*',
//                'absence_types.name as type_name',
//            ]);
//        return $absences;
//    }

    public function get()
    {
        try {
            return AbsenceRequests::all();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function getPerEmployee($employeeId)
    {
        try {
            return AbsenceRequests::where('employee_id', $employeeId)->get();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function add($request)
    {
        try {
            $request = AbsenceRequests::updateOrCreate(
                [
                    'id' => $request['id'], // Assuming ID is always present in the request
                ],
                [
                    'employee_id' => $request['employeeId'],
                    'start_date' => $request['startDate'],
                    'end_date' => $request['endDate'],
                    'days' => $request['days'],
                    'type_id' => $request['typeId'],
                    'approval' => $request['approval'],
                ]
            );
            return AbsenceRequests::find($request->id);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete($id)
    {
        try {
            return AbsenceRequests::find($id)->delete();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
