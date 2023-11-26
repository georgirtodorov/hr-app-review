<?php

namespace App\System\Employees;

use App\Models\Employee;

class Repository
{
    public function get()
    {
        return Employee::all();
    }
}
