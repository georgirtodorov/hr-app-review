<?php
declare(strict_types=1);


namespace App\Http\Controllers\Profile\Picture;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\System;

class ProfilePicture extends Controller
{
    /**
     * @throws \Exception
     */
    public function store(Request $request, System\Profile\Picture\Service $service): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|image|max:10240', // Max size 10MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422); // 422 Unprocessable Entity
        }

        return response()->json($service->set((int)$request->get('employee_id'), $request->file('file')));
    }
}
