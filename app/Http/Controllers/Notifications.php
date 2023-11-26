<?php
declare(strict_types=1);


namespace App\Http\Controllers;


use App\Exceptions\Controllers\Absences\RequestsController as Exception;
use App\Models\AbsenceRequests;
use App\Models\Employee;
use App\Models\NotificationSettings;
use App\System\Absences\Requests\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class Notifications extends Controller
{
    public function index()
    {
        $notificationSettings = NotificationSettings::with('employee')->get();
        $formattedData = [];

        foreach ($notificationSettings as $notification) {
            $category = $notification->category;
            $action = $notification->action;

            if (!isset($formattedData[$category])) {
                $formattedData[$category] = [];
            }

            if (!isset($formattedData[$category][$action])) {
                $formattedData[$category][$action] = [];
            }

            $formattedData[$category][$action][] = [
                'id' => $notification->id,
                'email' => $notification->email,
                'employee_id' => $notification->employee->id,
                'first_name' => $notification->employee->first_name,
                'last_name' => $notification->employee->last_name,
            ];
        }

        return response()->json($formattedData);
    }

    /**
     * @throws Exception
     */
    public function store(Request $request, Service $service)//: JsonResponse
    {
        return NotificationSettings::create([
            'email' => $request['email'],
            'action'=>  $request['action'],
            'category'=> $request['category']
        ]);

        $request = $request->get('request');
        if (empty($request)) {
            throw Exception::requestNotFount();
        }

        try {
            return response()->json($service->add($request));
        } catch (\Exception $e) {
            throw Exception::error($e->getMessage());
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $settings = NotificationSettings::find($id);
            if (!is_null($settings)) {
                return response()->json($settings->delete());
            }
        } catch (\Throwable $e) {
            return $this->handleThrowable($e);
        }
        return response()->json($settings);
    }
}
