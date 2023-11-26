<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departments;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

class DepartmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $departments = Departments::all();
        } catch (\Throwable $e) {

        }
        return response()->json($departments);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
    //     * @return JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $department = Departments::insert([
                'name' => $request['name']
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
        return $department;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $department = Departments::where('id', $id)->update(
                [
                    'name' => $request['name']
                ]
            );

        } catch (\Throwable $e){
            throw $e;
        };

        return response()->json($department);
    }

    /**
     * Remove the registered department from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $department = Departments::find($id);
            if (!is_null($department)) {

                return response()->json($department->delete());
                return response()->json($department->delete());
            }
        } catch (\Throwable $e) {
            throw new \Exception($e->getMessage());
        }
        return response()->json($department);
    }
}

