<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenceTypes extends Model
{
    use HasFactory;

    protected $table = 'absence_types';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'name',
        'details',
        'annual_limit',
        'duration_limit',
        'transferable',
        'transferable_amount',
        'estimate_cost',
        'approval'
    ];
}
