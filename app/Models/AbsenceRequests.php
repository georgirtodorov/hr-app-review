<?php
declare(strict_types=1);

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenceRequests extends Model
{
    use HasFactory;

    protected $table = 'absence_requests';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'employee_id',
        'start_date',
        'end_date',
        'days',
        'type_id',
        'approval'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'type_name',
        'type_details',
        'first_name',
        'last_name'
    ];

    public function getTypeNameAttribute(): string
    {
        $typeName = AbsenceTypes::select('name')
            ->where('id', '=', $this->type_id)
            ->pluck('name')
            ->first();

        return $typeName ?? 'undefined';

    }

    public function getTypeDetailsAttribute(): string
    {
        $typeDetails = AbsenceTypes::select('details')
            ->where('id', '=', $this->type_id)
            ->pluck('details')
            ->first();

        return $typeDetails ?? 'undefined';
    }

    public function getFirstNameAttribute(): string
    {
        $firstName = Employee::select('first_name')
            ->where('id', '=', $this->employee_id)
            ->pluck('first_name')
            ->first();

        return $firstName ?? 'undefined';
    }

    public function getLastNameAttribute(): string
    {
        $lastName = Employee::select('last_name')
            ->where('id', '=', $this->employee_id)
            ->pluck('last_name')
            ->first();

        return $lastName ?? 'undefined';
    }

    /**
     * Static method to create an AbsenceRequests instance from request data.
     *
     * @param array $request
     * @return AbsenceRequests
     */
    public static function make(array $request): AbsenceRequests
    {
        return new AbsenceRequests([
            'id' => $request['id'] ?? null,
            'employee_id' => $request['employeeId'],
            'start_date' => $request['startDate'],
            'end_date' => $request['endDate'],
            'days' => $request['days'],
            'type_id' => $request['typeId'],
            'approval' => $request['approval'],
        ]);
    }
}
