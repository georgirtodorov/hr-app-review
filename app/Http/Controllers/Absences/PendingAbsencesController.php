<?php
declare(strict_types=1);

namespace App\Http\Controllers\Absences;

use App\System\Absences\PendingApproval\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller;

class PendingAbsencesController extends Controller
{
    /**
     * @throws \Exception
     */
    public function index(Service $service): JsonResponse
    {
        try {
            return response()->json($service->get());
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

    }
}
