<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SickLeave  extends Model
{
    protected $table = 'sick_leave';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_id',
        'start_date',
        'end__date',
        'days',
        'cost'
    ];
}
