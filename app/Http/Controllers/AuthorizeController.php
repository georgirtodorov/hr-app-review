<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\System\Authorize\Service;
use Exception;
use Illuminate\Http;

class AuthorizeController extends Controller
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

    public function users()
    {
        return $this->service->AllUsersPermissions();
    }

    public function user(Http\Request $request)
    {
        $user = Auth::user();
        return $this->service->get($user->id);
    }
}
