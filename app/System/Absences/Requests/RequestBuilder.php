<?php
declare(strict_types=1);

namespace App\System\Absences\Requests;

use App\Enums\Absences\Requests\AbsenceRequestApprovalStatus;
use http\Env\Request;

class RequestBuilder extends Factory
{
    protected $approvalMap = [
        AbsenceRequestApprovalStatus::NOT_NEED => 'NOT_NEED',
        AbsenceRequestApprovalStatus::WAITING => 'WAITING',
        AbsenceRequestApprovalStatus::APPROVED => 'APPROVED',
        AbsenceRequestApprovalStatus::DECLINED => 'DECLINED',
    ];

    /**
     * @var int
     */
    private $typeId;
    /**
     * @var int
     */
    private $employeeId;
    /**
     * @var \DateTime
     */
    private $startDate;
    /**
     * @var \DateTime
     */
    private $endDate;
    /**
     * @var int
     */
    private $days;
    /**
     * @var int
     */
    private $approval;
    /**
     * @var mixed|null
     */
    private $id;

    /**
     * @param $request
     */
    public function __construct($request)
    {
        $this->id = $request['id'] ?? null;
        $this->typeId = $request['type_id'];
        $this->employeeId = $request['employee_id'];
        $this->startDate = $request['start_date'];
        $this->endDate = $request['end_date'];

        if (array_key_exists('days', $request)) {
            $this->days = $request['days'];
        }

        if (array_key_exists('approval', $request) && in_array($request['approval'], $this->approvalMap)) {
            $this->approval = array_search($request['approval'], $this->approvalMap);
        }
    }

    public static function make($request)
    {
        return new self($request);
    }

    public function toArray(): array
    {
//        Should we let manual edit ?
//        if (empty($this->days)) {
//            $this->days = $this->workdaysBetween();
//        }
        $this->days = $this->calculateDays();
        if (empty($this->approval)) {
            $this->approval = $this->setApprovalState();
        }
        return [
            'id' => $this->id,
            'typeId' => $this->typeId,
            'employeeId' => $this->employeeId,
            'startDate' => $this->startDate,
            'endDate' => $this->endDate,
            'days' => $this->days,
            'approval' => $this->approval
        ];
    }

    private function calculateDays(): int
    {
        return $this->workdaysBetween() - $this->officialDaysCount();
    }

    private function workdaysBetween(): int
    {
        $workdays = 0;
        $period = new \DatePeriod(
            new \DateTime($this->startDate),
            new \DateInterval('P1D'),
            new \DateTime($this->endDate),
//            \DatePeriod::EXCLUDE_START_DATE
        );
        foreach ($period as $date) {
            if ($date->format('N') < 6) {
                $workdays++;
            }
        }
        return $workdays + 1;
    }

    private function officialDaysCount(): int
    {
        $officialHolidays = \App\System\OfficialHolidays\Service::get(); // Get the list of official holidays

        $count = 0;
        $startDate = new \DateTime($this->startDate);
        $endDate = new \DateTime($this->endDate);

        foreach ($officialHolidays as $officialHoliday) {
            $holidayDate = new \DateTime($officialHoliday->date);
            if ($holidayDate >= $startDate && $holidayDate <= $endDate) {
                $count++;
            }
        }

        return $count;
    }

    private function setApprovalState(): string
    {
        $type = (new \App\System\Absences\Types\Repository())->getById($this->typeId)->first();
        return (!empty($type->approval)) ? AbsenceRequestApprovalStatus::WAITING : AbsenceRequestApprovalStatus::NOT_NEED;
    }
}
