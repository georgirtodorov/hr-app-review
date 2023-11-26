<?php

namespace App\System\Absences\Requests;

abstract class Factory
{
    abstract function toArray(): array;
}
