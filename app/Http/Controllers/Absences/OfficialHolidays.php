<?php
declare(strict_types=1);

namespace App\Http\Controllers\Absences;


use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models;
use App\System;

class OfficialHolidays extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws \Exception
     */
    public function index(): JsonResponse
    {
        try {
            return response()->json(System\OfficialHolidays\Service::get());
        } catch (\Throwable $e) {
            throw new \Exception($e->getMessage());
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @throws \Exception
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'date' => 'required|date'
        ]);
        try {
            return response()->json(System\OfficialHolidays\Service::store(
                $request->get('name'),
                $request->get('date')
            ));
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     * @throws \Exception
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'id' => 'required|numeric',
            'name' => 'required|string|max:255',
            'date' => 'required|date'
        ]);
        try {
            return response()->json(System\OfficialHolidays\Service::update(
                $request->get('id'),
                $request->get('name'),
                $request->get('date')
            ));
        } catch (\Throwable $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * Remove the registered department from storage.
     *
     * @param int $id
     * @throws \Exception
     */
    public function destroy(int $id)
    {
        try {
            System\OfficialHolidays\Service::delete($id);
        } catch (\Throwable $e) {
            throw new \Exception($e->getMessage());
        }
    }

}
