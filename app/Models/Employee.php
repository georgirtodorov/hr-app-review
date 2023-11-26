<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models;


class Employee extends Model
{
    use HasFactory;

    protected $table = 'employees';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'first_name',
        'surname',
        'last_name',
        'email',
        'pin',
        'personal_phone',
        'work_phone',
        'start',
        'end',
        'department_id',
        'position_id',
        'supervisors',
        'location_id'
    ];

    /**
     * Auto cast data from and to json
     * @var string[]
     */
    protected $casts = [
        'supervisors' => 'array',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'location_city',
        'position_name',
        'department_name',
    ];

    public function getDepartmentNameAttribute() {
        $departmentName = Departments::select('name')
                ->where('id', '=', $this->department_id)
                ->pluck('name')
                ->first();

        return  $departmentName ?? 'undefined';

    }

    /**
     * Get the location city for the user.
     *
     * @return bool
     */
    public function getLocationCityAttribute()
    {
        $locationCity = Locations::select('city')
            ->where('id', '=', $this->location_id)
            ->pluck('city')
            ->first();

        return $locationCity ?? 'undefined';
    }

    /**
     * Get the position name for the user.
     *
     * @return bool
     */
    public function getPositionNameAttribute()
    {
        $positionName = Positions::select('name')
            ->where('id', '=', $this->position_id)
            ->pluck('name')
            ->first();

        return $positionName ?? 'undefined';
    }

    public function supervisors()
    {
        return $this->belongsToMany(Employee::class, 'supervisions', 'employee_id', 'supervisor_id');
    }

    public function subordinates()
    {
        return $this->belongsToMany(Employee::class, 'supervisions', 'supervisor_id', 'employee_id');
    }

    public function absenceRequests()
    {
        return $this->hasMany(AbsenceRequests::class, 'employee_id');
    }

    public function notificationSettings()
    {
        return $this->hasMany(NotificationSettings::class, 'employee_email', 'email');
    }

    public function salary()
    {
        return $this->hasOne(Salary::class, 'employee_id', 'id');
    }
}
