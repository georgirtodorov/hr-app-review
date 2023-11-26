<?php

namespace App\System\Absences\Requests;

use App\Enums\Absences\Requests\AbsenceRequestActionType;
use App\Enums\Absences\Requests\AbsenceRequestApprovalStatus;
use App\Events;
use App\Exceptions\System\AbsenceRequest;
use App\Models\AbsenceRequests;

class Service
{
    /**
     * @var Repository
     */
    private $repository;

    public function __construct(Repository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @throws AbsenceRequest
     */
    public function add(array $request)
    {
        $request = RequestBuilder::make($request)->toArray();
        Validators::conflictingRequest($request);
        $request = $this->repository->add($request);
        Events\AbsenceRequestAction::dispatch($request, AbsenceRequestActionType::CREATED);
        return $request;
    }

    /**
     * @throws AbsenceRequest
     */
    public function edit(array $request, $id)
    {
        $request = (new RequestBuilder($request))->toArray();
        Validators::conflictingRequest($request);
        $request = (new Repository())->add($request);
        Events\AbsenceRequestAction::dispatch($request, AbsenceRequestActionType::CHANGED);
        return $request;
    }

    public function decline(array$request): AbsenceRequests
    {
        $request = AbsenceRequests::findOrFail($request['id']);
        $request->approval = AbsenceRequestApprovalStatus::DECLINED;
        $request->save();
        $request->fresh();
        Events\AbsenceRequestAction::dispatch($request, AbsenceRequestActionType::DECLINED);
        return $request;
    }

    public function approve(array$request): AbsenceRequests
    {
        $request = AbsenceRequests::findOrFail($request['id']);
        $request->approval = AbsenceRequestApprovalStatus::APPROVED;
        $request->save();
        $request = $request->fresh();
        Events\AbsenceRequestAction::dispatch($request, AbsenceRequestActionType::APPROVED);
        return $request;
    }

    public function getPerEmployee($employeeId)
    {
        if (empty($employeeId)) {
            return new \Exception('No employee identifier found in the request', 400);
        }
        return (new Repository())->getPerEmployee($employeeId);
    }
}

