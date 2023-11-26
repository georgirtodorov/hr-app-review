<?php

namespace App\System\Absences\Types;

class Service
{
    public function get()
    {
        return (new Repository())->get();
    }

    public function getTypesWithLimits()
    {
        return $this->get()->filter(function ($type) {
            return isset($type->annual_limit);
        });
    }
}
