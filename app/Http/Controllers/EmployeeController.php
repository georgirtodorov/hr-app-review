<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\System\Absences\RemainingDays\Service as RemainingDaysService;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Routing\Controller;
use App\Models\Locations;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * //     * @return \Illuminate\Http\Response
     */
    public function index(RemainingDaysService $remainingDaysService)
    {
        try {
//            $employees = Employee::join('salaries', 'employees.id', '=', 'salaries.employee_id')
//                ->get(['employees.*', 'salaries.gross_salary']);
            $remainingDays = $remainingDaysService->getRemainingDays();
            $employees = Employee::with('absenceRequests')->get()->map(function ($employee) use ($remainingDays, $remainingDaysService) {
                $employeeRemainingDays = $remainingDays[$employee['id']];
                // add the remaining days to the employee array
                $employee['remaining_days'] = [
                    'list' => $employeeRemainingDays,
                    'paid_days_left' => $remainingDaysService->getPaidDaysLeft($employeeRemainingDays)
                ];
//                $employee['remaining_days']['paid_days_left'] = $remainingDaysService->getPaidDaysLeft($employeeRemainingDays);

                return $employee;
            });
            return response()->json($employees);

            // return only the employees //
            //            $employees = Employee::all()->toArray();
            //            return response()->json($employees);
        } catch (\Throwable $e) {

        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $employee = Employee::with(['supervisors', 'subordinates', 'absenceRequests'])
            ->where('user_id', Auth::id())
            ->first();

        return response()->json($employee);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * //     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            return response()->json(Employee::create([
                'user_id' => intval($request->get('user_id')),
                'first_name' => $request['first_name'],
                'last_name' => $request['first_name'],
                'email' => $request['first_name'],
            ]));
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  $id
     * @return \Illuminate\Http\Response
     */
    public function show(RemainingDaysService $remainingDaysService, $id)
    {
        try {
//            $employees = Employee::join('salaries', 'employees.id', '=', 'salaries.employee_id')
//                ->get(['employees.*', 'salaries.gross_salary']);
            $remainingDays = $remainingDaysService->getRemainingDays();
            $employees = Employee::where('id', $id)->with('absenceRequests')->get()->map(function ($employee) use ($remainingDays, $remainingDaysService) {
                $employeeRemainingDays = $remainingDays[$employee['id']];
                // add the remaining days to the employee array
                $employee['remaining_days'] = [
                    'list' => $employeeRemainingDays,
                    'paid_days_left' => $remainingDaysService->getPaidDaysLeft($employeeRemainingDays)
                ];
//                $employee['remaining_days']['paid_days_left'] = $remainingDaysService->getPaidDaysLeft($employeeRemainingDays);

                return $employee;
            });
            return response()->json($employees);

            // return only the employees //
            //            $employees = Employee::all()->toArray();
            //            return response()->json($employees);
        } catch (\Throwable $e) {

        }


//        try {
//            $employee = Employee::join('salaries', 'employees.id', '=', 'salaries.employee_id')
//                ->where(['employees.user_id' => $id])->first();
//
//            return response()->json($employee);
//        } catch (\Throwable $e) {
//
//        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $employee = Employee::updateOrCreate(
                ['id' => $id],
                [
                    'department_id' => $request->get('department_id'),
                    'position_id' => $request->get('position_id'),
                    'location_id' => $request->get('location_id'),
                    'supervisors' => $request->get('supervisors'),
                    'first_name' => $request->get('first_name'),
                    'surname' => $request->get('surname'),
                    'last_name' => $request->get('last_name'),
                    'email' => $request->get('email'),
                    'city' => $request->get('city'),
                    'post_code' => $request->get('post_code'),
                    'address' => $request->get('address'),
                    'country' => $request->get('country'),
                    'pin' => $request->get('pin'),
                    'personal_phone' => $request->get('personal_phone'),
                    'work_phone' => $request->get('work_phone'),
                    'start' => $request->get('start'),
                    'end' => $request->get('end'),
                ]
            );
            // logic below can be handled by SQL relation
            $employeeChanged = Employee::findOrFail($id);
            $user = User::where('id', $employeeChanged->user_id)->first();
            if ($employeeChanged->first_name != $user->first_name || $employeeChanged->last_name != $user->last_name) {
                $user->first_name = $employeeChanged->first_name;
                $user->last_name = $employeeChanged->last_name;
                $user->save();
            }
            return response()->json($employee);
        } catch (\Throwable $e) {
            return response()->json($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            return response()->json(Employee::find($id)->delete());
        } catch (\Throwable $e) {
            return response()->json($e->getMessage());
        }
    }
}
