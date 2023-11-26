<?php
declare(strict_types=1);


namespace App\Http\Controllers\Logs;


use App\Exceptions\System\Logs;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\System;

class AbsenceRequestsLogs extends Controller
{
    /**
     * @throws Logs
     */
    public function index(System\Logs\AbsenceRequests $service): JsonResponse
    {
        return response()->json($service->get());
    }


    public function store(Request $request)//: JsonResponse
    {
    }

    public function destroy(int $id)//: JsonResponse
    {
    }
}
