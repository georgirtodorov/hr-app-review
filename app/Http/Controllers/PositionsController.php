<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Positions;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

class PositionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $positions = Positions::all();
        } catch (\Throwable $e) {

        }
        return response()->json($positions);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * //     * @return JsonResponse
     */
    public function store(Request $request)
    {
        try {
            return Positions::create([
                'name' => $request['name'],
                'job_description' => $request['job_description']
            ]);
        } catch (\Exception $e) {
            if ($e->getCode() == 23000) {
                throw new \Exception('Вече съществува такава позиция.');
            }
            throw $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     */
    public function update(Request $request, $id)
    {
        try {
            $position =  Positions::findOrFail($id);
            $position->name = $request['name'];
            $position->job_description = $request['job_description'] ?? '';
            $position->save();
            return response()->json($position );
        } catch (\Throwable $e) {
            if ($e->getCode() == 23000) {
                throw new \Exception('Вече съществува такава позиция.');
            }
            throw $e;
        };

        return response()->json($position);
    }

    /**
     * Remove the registered position from storage.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $position = Positions::find($id);
            if (!is_null($position)) {
                $position->delete();
                return response()->json($position);
            }
            throw new \Exception('Unable to delete position');
        } catch (\Throwable $e) {
            throw $e;
        }
    }
}

