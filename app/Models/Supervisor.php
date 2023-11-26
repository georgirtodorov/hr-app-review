<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supervisor extends Model
{
    protected $table = 'supervisions';

    public function subordinates()
    {
        return $this->belongsToMany(Employee::class, 'supervisions', 'supervisor_id', 'employee_id');
    }

}
