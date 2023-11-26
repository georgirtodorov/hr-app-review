<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Locations;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

class LocationsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $locations = Locations::all();
        } catch (\Throwable $e) {

        }
        return response()->json($locations);
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
            return Locations::create([
                'city' => $request['city'],
                'address' => $request['address'],
                'post_code' => $request['post_code'],
                'country' => $request['country']
            ]);
        } catch (\Exception $e) {
            if ($e->getCode() == 23000) {
                throw new \Exception('Вече съществува такава локация.');
            }
            throw $e;
        }
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
            $location = Locations::updateOrCreate(
                ['id' => $id],
                [
                    'city' => $request['city'],
                    'address' => $request['address'],
                    'country' => $request['country'],
                    'post_code' => $request['post_code']
                ]
            );
            return response()->json($location);

        } catch (\Throwable $e){
            if ($e->getCode() == 23000) {
                throw new \Exception('Вече съществува такава позиция.');
            }
            throw $e;
        };

        return response()->json($location);
    }

    /**
     * Remove the registered location from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $location = Locations::find($id);
            if (!is_null($location)) {
                $location->delete();
                return response()->json($location);
            }
        } catch (\Throwable $e) {
            return $this->handleThrowable($e);
        }
        return response()->json($location);
    }


}
