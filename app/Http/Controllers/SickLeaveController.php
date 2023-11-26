<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SickLeave;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Exports\SickLeaveExport;
use Maatwebsite\Excel\Facades\Excel;

class SickLeaveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $sickLeave = SickLeave::join('employees', 'sick_leave.employee_id', '=', 'employees.id')
                ->get(['sick_leave.*', 'employees.first_name','employees.last_name' ,'employees.position','employees.department', 'employees.location', 'employees.user_id']);


        } catch (\Throwable $e) {

        }
        return response()->json($sickLeave);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
//     * @return JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $sickLeave = SickLeave::insert([
                'employee_id' => $request['employee_id'],
                'start_date' => $request['start_date'],
                'end_date' => $request['end_date'],
                'days' => $request['days'],
                'cost' => $request['cost']
            ]);

//            print_r($sickLeave);
        } catch (\Exception $e) {
            throw $e;
        }
        return $sickLeave;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $sickLeave = SickLeave::where('id', $id)->update(
                [
                    'employee_id' => $request['employee_id'],
                    'start_date' => $request['start_date'],
                    'end_date' => $request['end_date'],
                    'days' => $request['days'],
                    'cost' => $request['cost']
                ]
            );

        } catch (\Throwable $e){
            throw $e;
        };

        return response()->json($sickLeave);
    }

    /**
     * Remove the registered sick leave from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $sickLeave = SickLeave::find($id);
            if (!is_null($sickLeave)) {
                return response()->json($sickLeave->delete());
            }
        } catch (\Throwable $e) {
            return $this->handleThrowable($e);
        }
        return response()->json($sickLeave);
    }


    public function export()
    {
        return Excel::download(new SickLeaveExport, 'sick_leave_'. date('Y-m-d').'.xlsx');
    }
}
