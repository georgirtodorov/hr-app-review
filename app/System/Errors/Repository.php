<?php
declare(strict_types=1);


namespace App\System\Errors;


use App\Models\Error;
use Auth;

class Repository
{
    public static function save(Error $error): Error
    {
        return Error::updateOrCreate(
            [
                'user_id' => $error->user_id,
                'error_message' => $error->error_message,
            ],
            $error->toArray()
        );
    }

    public static function make(\Throwable $e): Error
    {
        // Retrieve the logged-in user's ID
        $userId = Auth::id();

        // Get the current URL from the request
        $requestUrl = request()->fullUrl();

        return new Error([
            'user_id' => $userId,
            'error_message' => $e->getMessage(),
            'exception_trace' => $e->getTrace(),
            'stack_trace' => $e->getTraceAsString(),
            'request_url' => $requestUrl
        ]);
    }

    public static function get(string $message): ?Error
    {
        $userId = Auth::id();
        return Error::where([
            'user_id' => $userId,
            'error_message' => $message,
        ])->first();
    }
}
