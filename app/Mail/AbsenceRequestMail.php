<?php
declare(strict_types=1);


namespace App\Mail;


use App\Enums\Absences\Requests\AbsenceRequestActionType;
use App\Exceptions\Events\AbsenceRequest as Exception;
use App\Models\AbsenceRequests;
use App\Models\Employee;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AbsenceRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public AbsenceRequests $absence;
    private Employee $employee;

    private string $action;

    /**
     * @var string
     */
    private $recipient;

    public function __construct(AbsenceRequests $absence, Employee $employee, string $action, string $recipient)
    {
        $this->absence = $absence;
        $this->employee = $employee;
        $this->action = $action;
        $this->recipient = $recipient;
    }

    /**
     * Build the message.
     *
     */
    public function build(): AbsenceRequestMail
    {
        return $this->subject($this->makeSubject())
            ->view($this->getEmailBody())
            ->with([
                'absence' => $this->absence,
                'employee' => $this->employee,
                'action' => $this->action,
                'absencesUrl' => url('/absence'),
                'absenceUrl' => $this->buildAbsenceUrl()
            ]);
    }

    private function makeSubject(): string
    {
        return sprintf('Молба за отпуск на %s %s', $this->employee->first_name, $this->employee->last_name);
    }

    public function getEmailBody(): string
    {
        return sprintf('emails.absence-request.notify-%s', strtolower($this->recipient));
    }

    private function buildAbsenceUrl()
    {
        return sprintf('%s/absence?dialog=%s&employee-id=%s&request-id=%s',
            url('/'),
            'true',
            $this->employee->id,
            $this->absence->id
        );
    }
}
