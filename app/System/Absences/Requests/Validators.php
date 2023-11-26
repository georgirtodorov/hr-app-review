<?php
declare(strict_types=1);


namespace App\System\Absences\Requests;


use App\Exceptions\System\AbsenceRequest;
use App\Models\AbsenceRequests;

class Validators
{
    /**
     * @throws AbsenceRequest
     */
    public static function conflictingRequest(array $request)
    {
        $conflictingRequest = AbsenceRequests::where('employee_id', $request['employeeId'])
            // Exclude declined requests
            ->where('approval', '!=', 'DECLINED')
            // In case of edit, exclude current requests by id
            ->when(isset($request['id']), function ($query) use ($request) {
                $query->where('id', '!=', $request['id']);
            })
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request['startDate'], $request['endDate']])
                    ->orWhereBetween('end_date', [$request['startDate'], $request['endDate']])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('start_date', '<=', $request['startDate'])
                            ->where('end_date', '>=', $request['endDate']);
                    });
            })
            ->first();

        if ($conflictingRequest) {
            throw AbsenceRequest::conflictingDates($conflictingRequest);
        }
    }
}
