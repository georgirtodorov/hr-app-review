<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Salary  extends Model
{
    protected $table = 'salaries';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_id',
        'gross_salary'
    ];
}
