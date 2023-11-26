<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AbsenceTypes;
use Illuminate\Routing\Controller;
use Illuminate\Http\JsonResponse;

class AbsenceTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $absence_types = AbsenceTypes::all();
        } catch (\Throwable $e) {

        }
        return response()->json($absence_types);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
//     * @return \Illuminate\Http\Response
     * sdadasda da orpawq gornoto
     */
    public function store(Request $request)
    {
        try {
            $absence_type = AbsenceTypes::insert([
                'name' => $request['name'],
                'details' => $request['details'],
                'annual_limit' => $request['annual_limit'],
                'duration_limit' => $request['duration_limit'],
                'transferable' => $request['transferable'],
                'transferable_amount' => $request['transferable_amount'],
                'estimate_cost' => $request['estimate_cost'],
                'approval' => $request['approval']
            ]);
        } catch (\Exception $e) {
            throw $e;
        }
        return $absence_type;
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
            $absence_type = AbsenceTypes::where('id', $id)->update(
                [
                    'name' => $request['name'],
                    'details' => $request['details'],
                    'annual_limit' => $request['annual_limit'],
                    'duration_limit' => $request['duration_limit'],
                    'transferable' => $request['transferable'],
                    'transferable_amount' => $request['transferable_amount'],
                    'estimate_cost' => $request['estimate_cost'],
                    'approval' => $request['approval']
                ]
            );

        } catch (\Throwable $e){
            throw $e;
        };

        return response()->json($absence_type);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        try {
            $absence_type = AbsenceTypes::find($id);
            if (!is_null($absence_type)) {
                return response()->json($absence_type->delete());
            }
        } catch (\Throwable $e) {
            return $this->handleThrowable($e);
        }
        return response()->json($absence_type);
    }
}
