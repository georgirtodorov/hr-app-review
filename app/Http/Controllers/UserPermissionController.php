<?php
declare(strict_types=1);

namespace App\Http\Controllers;


use App\System\UserPermission\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserPermissionController extends Controller
{
    protected $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }

    /**
     * @throws \Exception
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'data' => $this->service->get($request->user())
        ]);
    }
}
