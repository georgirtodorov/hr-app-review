<?php
declare(strict_types=1);

namespace App\Listeners;


use App\Events\AbsenceRequestAction;
use App\System\Logs;
use App\Exceptions;

class AbsenceRequestLogListener
{
    /**
     * Handle the event.
     *
     * @param AbsenceRequestAction $event
     * @return void
     * @throws Exceptions\Listeners\AbsenceRequest
     */
    public function handle(AbsenceRequestAction $event): void
    {
        try {
            Logs\AbsenceRequests::save($event);
        } catch (\Exception $e) {
            throw Exceptions\Listeners\AbsenceRequest::logFailed($e);
        }
    }
}
