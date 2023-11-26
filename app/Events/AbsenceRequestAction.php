<?php
declare(strict_types=1);

namespace App\Events;

use App\Models\AbsenceRequests;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Enums\Absences\Requests\AbsenceRequestActionType;
use App\Exceptions\Events\AbsenceRequest as Exception;


class AbsenceRequestAction
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected AbsenceRequests $absence;
    protected string $action;

    /**
     * Create a new event instance.
     *
     * @return void
     * @throws Exception
     */
    public function __construct(AbsenceRequests $absence, string $action)
    {
        $this->absence = $absence;

        if (!AbsenceRequestActionType::isValid($action)) {
            throw Exception::invalidActionType($action);
        }
        $this->action = $action;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }

    public function getAbsence(): AbsenceRequests
    {
        return $this->absence;
    }

    public function getAction(): string
    {
        return $this->action;
    }
}
