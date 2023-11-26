<?php
declare(strict_types=1);

namespace App\Listeners;

use App\Enums\Absences\Requests\AbsenceRequestActionType;
use App\Enums\Absences\Requests\MailRecipientTypeType;
use App\Events\AbsenceRequestAction;
use App\Exceptions\Listeners\AbsenceRequest;
use App\Mail\AbsenceRequestMail;
use App\Models\AbsenceRequests;
use App\Models\Employee;
use App\Exceptions;
use App\Models\NotificationSettings;
use Illuminate\Support\Facades\Mail;

class AbsenceRequestMailListener
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
        /**
         * @var string $action
         * @var AbsenceRequests $absence
         * @var Employee $employee
         * @var array $supervisors
         * @var array $cc
         */
        [$action, $absence, $employee, $supervisors, $cc] = $this->setData($event);
        try {
            $this->sendMail($action, $absence, $employee, $supervisors, $cc);
        } catch (\Exception $e) {
            throw Exceptions\Listeners\AbsenceRequest::mailNotSent($e);
        }
    }

    private function sendMail(
        string $action, AbsenceRequests $absence, Employee $employee, array $supervisors, array $cc)
    {
        Mail::to($employee->email)->send(new AbsenceRequestMail($absence, $employee, $action, MailRecipientTypeType::EMPLOYEE));
        if (!$supervisors) {
            Mail::bcc($cc)->send(new AbsenceRequestMail($absence, $employee, $action, MailRecipientTypeType::SUPERVISOR));
            return;
        }
        Mail::to($supervisors)
            ->cc($cc)
            ->send(new AbsenceRequestMail($absence, $employee, $action, MailRecipientTypeType::SUPERVISOR));
    }

    /**
     * Returns an array containing the action, absence, employee, supervisors emails, and cc emails.
     *
     * @return array An array containing the following values:
     *               - string $action
     *               - Absence $absence
     *               - Employee $employee
     *               - array $supervisors
     *               - array $cc
     *
     * @throws AbsenceRequest
     */
    private function setData(AbsenceRequestAction $event): array
    {
        $action = $event->getAction();
        if (!AbsenceRequestActionType::isValid($action)) {
            throw Exceptions\Listeners\AbsenceRequest::invalidActionType($action);
        }
        $absence = $event->getAbsence();
        $employee = Employee::find($absence->employee_id);
        $supervisors = Employee::whereIn('id', $employee->supervisors)->pluck('email')->toArray();
        $cc = $this->makeCC($supervisors, $action);

        return [$action, $absence, $employee, $supervisors, $cc];
    }

    private function makeCC($supervisors, $action): array
    {
        $notificationUsers = NotificationSettings::where('action', $action)
            ->where('category', 'absence_requests')
            ->pluck('email')
            ->toArray();
        return array_diff($notificationUsers, $supervisors);

    }
}
