<?php
declare(strict_types=1);

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenceRequestsLogs extends Model
{
    use HasFactory;

    protected $table = 'absence_requests_logs';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'absence_request_id',
        'action',
        'user_id',
        'absence_start_date',
        'absence_end_date'
    ];

    /**
     * Define a belongsTo relationship with the User model.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
