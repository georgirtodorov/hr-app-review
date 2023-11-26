<?php
declare(strict_types=1);


namespace App\Exceptions;


use Throwable;

class ReportableException extends \Exception
{
    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    public static function make(\Exception $e): ReportableException
    {
        return new self($e->getMessage(), $e->getCode(), $e);
    }
}
