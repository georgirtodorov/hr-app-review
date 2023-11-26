<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\AbsencesArchive;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AbsencesArchiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        try {
            $archive = AbsencesArchive::join('employees', 'absences_archive.employee_id', '=', 'employees.id')
                ->join('absence_types', 'absences_archive.type_id', '=', 'absence_types.id')
                ->join('locations', 'employees.location_id', '=', 'locations.id')
                ->join('departments', 'employees.department_id', '=', 'departments.id')
                ->join('positions', 'employees.position_id', '=', 'positions.id')
                ->get([
                    'absences_archive.*',
                    'employees.first_name',
                    'employees.last_name',
                    'absence_types.name as absence_name',
                    'locations.city as location_city',
                    'departments.name as department_name',
                    'positions.name as position_name'
                ]);
//            $employees = AbsencesArchive::all();
            return response()->json($archive);
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
        $employeeId = Employee::where('user_id', Auth::id())->value('id');

        $absences = AbsencesArchive::where('employee_id', strval($employeeId))->get();

        return response()->json($absences);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     * sdadasda da orpawq gornoto
     */
    public function store(Request $request)
    {
        try {
            $absence_archive = AbsencesArchive::insert([
                'employee_id' => $request['employee_id'],
                'type_id' => $request['type_id'],
                'days' => $request['days'],
                'due_date' => $request['due_date']
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
        return $absence_archive;
    }
}
