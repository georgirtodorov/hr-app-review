<?php
declare(strict_types=1);

namespace App\Http\Controllers\Access;

use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\System\Access\UserAccess\Service;
use Exception;
use Illuminate\Http;

use Auth;

class UsersAccessController extends Controller
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
    public function store(Http\Request $request): Http\JsonResponse
    {
        return response()->json($this->service->add(
            (int)$request->get('id'),
            $request->get('roles') ?? [],
            $request->get('permissions') ?? []
        ));
    }

    /**
     * @throws Exception
     */
    public function destroy(string $id): Http\JsonResponse
    {
        return response()->json($this->service->revoke((int)$id));
    }

    public function users()
    {
        return $this->service->getAllUsersPermissions();
    }

    public function user(Http\Request $request)
    {
        $user = Auth::user();
        return $this->service->getUserPermissionList($user->id);
    }
}
