<?php
declare(strict_types=1);

namespace App\System\Absences\PendingApproval;

use App\Models\AbsenceRequests;

class Service
{
    public function get()
    {
        $user = auth()->user();
        $subordinatesIds = $user->employee->subordinates->pluck('id');

        // If user has `absence_register` can approve requests to anyone
        if ($user->hasPermissionTo('absence_register')) {
            return AbsenceRequests::where('type_id', '=', 1)->get();
        }

        if (!empty($subordinatesIds)) {
            return;
        }

        return AbsenceRequests::where('type_id', '=', 1)->whereIn('employee_id', $subordinatesIds)->get();
    }
}
