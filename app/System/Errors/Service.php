<?php
declare(strict_types=1);


namespace App\System\Errors;


use App\Models\Error;

class Service
{
   public static function makeAndSave(\Throwable $e): Error
   {
       $errorLog = Repository::make($e);
       return Repository::save($errorLog);
   }
}
