<?php
declare(strict_types=1);


namespace App\Exceptions\Controllers\Absences;


use App\Exceptions\ContainsHttpCode;
use Exception;

class RequestsController extends Exception implements ContainsHttpCode
{
    public static function requestNotFount(): RequestsController
    {
        return new static('Request data is not found!');
    }

    public static function error(string $message): RequestsController
    {
        return new static(sprintf('An error occurred: %s', $message));
    }
}
