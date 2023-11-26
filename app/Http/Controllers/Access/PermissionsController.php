<?php
declare(strict_types=1);

namespace App\Http\Controllers\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\System\Access\Permissions\Service;
use Exception;
use Illuminate\Http;

class PermissionsController extends Controller
{
    /**
     * @var Service
     */
    private $service;

    /**
     * @param Service $service
     */
    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * @throws Exception
     */
    public function index(): Http\JsonResponse
    {
        return response()->json($this->service->list());
    }

    /**
     * @throws Exception
     */
    public function store(PermissionRequest $request): Http\JsonResponse
    {
        return response()->json($this->service->add($request->get('permission')));
    }

    /**
     * @throws Exception
     */
    public function destroy(string $id): Http\JsonResponse
    {
        return response()->json($this->service->delete((int)$id));
    }
}
