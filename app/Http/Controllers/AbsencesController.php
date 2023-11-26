<?php

namespace App\Http\Controllers;

use App\Models\AbsenceRequests;
use Carbon\Carbon;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

use App\Models\Absences;
use App\Models\Employee;
use App\System\Absences\Requests\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsencesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
//     * @return \Illuminate\Http\Response
     */
    public function index()
    {
//        $sdada = Absences::join('employees', 'absences.employee_id', '=', 'employees.id')
//            ->join('absence_types', 'absences.type', '=', 'absence_types.id' )
//            ->get(['absences.*' , 'absence_types.name', 'employees.*']);
//
//        return response()->json($sdada);
        try {
            $absences = Absences::join('employees', 'absences.employee_id', '=', 'employees.id')
                ->join('locations', 'employees.location_id', '=', 'locations.id')
                ->join('departments', 'employees.department_id', '=', 'departments.id')
                ->join('positions', 'employees.position_id', '=', 'positions.id')
                ->join('absence_types', 'absences.type', '=', 'absence_types.id' )
                ->get([
                    'absences.*',
                    'absence_types.name',
                    'employees.first_name',
                    'employees.last_name' ,
                    'employees.user_id',
                    'locations.city as location_city',
                    'departments.name as department_name',
                    'positions.name as position_name'
                ]);

        } catch (\Throwable $e) {

        }
        return response()->json($absences);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $employeeId = Employee::where('user_id', Auth::id())->value('id');

        $absences = Absences::where('employee_id', strval($employeeId))
        ->join('absence_types', 'absences.type', '=', 'absence_types.id')
        ->get([
            'absences.*',
            'absence_types.name as type_name',
        ]);
        return response()->json($absences);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $absence = Absences::insert([
                'employee_id' => $request['employee_id'],
                'type' => $request['type'],
                'approval' => $request['approval'],
                'approval_status' => $request['approval_status'],
                'start_date' => $request['start_date'],
                'end_date' => $request['end_date'],
                'days' => $request['days'],
                'archive' => $request['archive'],
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
        return $absence;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Absences  $absences
     * @return \Illuminate\Http\Response
     */
    public function show(Absences $absences)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Absences  $absences
     * @return \Illuminate\Http\Response
     */
    public function edit(Absences $absences)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Absences  $absences
//     * @return \Illuminate\Http\Response
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $absence = Absences::where('id', $id)->update(
                [
                    'employee_id' => $request['employee_id'],
                    'absence_type' => $request['absence_type'],
                    'approval' => $request['approval'],
                    'approval_status' => $request['approval_status'],
                    'start_date' => $request['start_date'],
                    'end_date' => $request['end_date'],
                    'days' => $request['days'],
                    'archive' => $request['archive'],
                ]
            );

        } catch (\Throwable $e){
            throw $e;
        };

        return response()->json($absence);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Absences  $absences
//     * @return \Illuminate\Http\Response
     * * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $absence = Absences::find($id);
            if (!is_null($absence)) {
                return response()->json($absence->delete());
            }
        } catch (\Throwable $e) {
            return $this->handleThrowable($e);
        }
        return response()->json($absence);
    }

    public function getRemainingDays(\App\System\Absences\RemainingDays\Service $service)
    {
        return $service->getRemainingDays();

//        $employeeId = Employee::where('user_id', Auth::id())->value('id');
//
//        return $service->getRemainingPaidDaysById($employeeId);
    }

    public function getRemainingDaysById(\App\System\Absences\RemainingDays\Service $service, $id)
    {
        return $service->getRemainingDaysById($id);

//        $employeeId = Employee::where('user_id', Auth::id())->value('id');
//
//        return $service->getRemainingPaidDaysById($employeeId);
    }
}
