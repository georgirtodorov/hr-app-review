<?php
declare(strict_types=1);

namespace App\Http\Controllers\Access;

use App\Http\Controllers\Controller;
use App\System\Access\Roles\Service;
use Exception;
use Illuminate\Http;

class RolesController extends Controller
{
    /**
     * @var Service
     */
    private $service;

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
    public function store(Http\Request $request): Http\JsonResponse
    {
        return response()->json($this->service->add($request->get('role')));
    }

    /**
     * @throws Exception
     */
    public function destroy(string $id): Http\JsonResponse
    {
        return response()->json($this->service->delete((int)$id));
    }

    /**
     * @throws Exception
     */
    public function update(string $name, Http\Request $request): Http\JsonResponse
    {
        return response()->json($this->service->updateUsers($name, $request->get('users')));
    }
}
