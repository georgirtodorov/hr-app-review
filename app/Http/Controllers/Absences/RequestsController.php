<?php
declare(strict_types=1);

namespace App\Http\Controllers\Absences;


use App\Exceptions\ReportableException;
use App\Models\Employee;
use App\System\Absences\Requests\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Exceptions\Controllers\Absences\RequestsController as Exception;

class RequestsController extends Controller
{
    public function index()
    {
        try {
            return Employee::with('absenceRequests')->get();
        } catch (\Exception $e) {
            throw new \Exception($e);
        }
    }

    /**
     * @throws Exception
     * @throws \Exception
     */
    public function store(Request $request, Service $service): JsonResponse
    {

//        $validatedData = $request->validate([
//            'employee_id' => 'required',
//            'start_date' => 'required|date',
//            'end_date' => 'required|date|after_or_equal:start_date',
//            'days' => 'required',
//            'type_id' => 'required',
//            'approval' => 'required',
//        ]);

        $request = $request->get('request');
        if (empty($request)) {
            throw Exception::requestNotFount();
        }

        try {
            return response()->json($service->add($request));
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public function update(Request $request, Service $service, $id): JsonResponse
    {
        $request = $request->get('request');
        if (empty($request)) {
            throw Exception::requestNotFount();
        }

        if (!$id) {
            throw Exception::requestNotFount();
        }
        try {
            return response()->json($service->edit(
                $request,
                $id
            )
            );
        } catch (\Exception $e) {
            throw Exception::error($e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public function approve(Request $request, Service $service): JsonResponse
    {
        $request = $request->get('request');
        if (empty($request)) {
            throw Exception::requestNotFount();
        }
        try {
            return response()->json($service->approve($request));
        } catch (\Exception $e) {
            throw ReportableException::make($e);
        }
    }

    /**
     * @throws Exception
     */
    public function decline(Request $request, Service $service): JsonResponse
    {
        $request = $request->get('request');
        if (empty($request)) {
            throw Exception::requestNotFount();
        }
        try {
            return response()->json($service->decline($request));
        } catch (\Exception $e) {
            throw Exception::error($e->getMessage());
        }
    }

    public function show(Service $service, $id): JsonResponse
    {
        return response()->json($service->getPerEmployee($id));
    }
}
