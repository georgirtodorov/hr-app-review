<?php
declare(strict_types=1);


namespace App\System\Logs;


use App\Events\AbsenceRequestAction;
use App\Exceptions\System\Logs;
use App\Models\AbsenceRequestsLogs;
use Auth;

class AbsenceRequests
{
    /**
     * @throws Logs
     */
    public static function save(AbsenceRequestAction $event)
    {
        $absence = $event->getAbsence();
        try {
            AbsenceRequestsLogs::create([
                'absence_request_id' => $absence->id,
                'absence_start_date' => $absence->start_date,
                'absence_end_date' => $absence->end_date,
                'user_id' => Auth::user()->id,
                'action' => $event->getAction(),
            ]);
        } catch (\Exception $e) {
            throw Logs::notSaved($e->getMessage());
        }
    }

    /**
     * @throws Logs
     */
    public function get()
    {
        try {
            return AbsenceRequestsLogs::with('user')->get();
        } catch (\Exception $e) {
            throw Logs::notFetched($e->getMessage());
        }
    }
}
