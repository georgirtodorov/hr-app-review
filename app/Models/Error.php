<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Error extends Model
{
    use HasFactory;

    protected $table = 'errors';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'error_message',
        'exception_trace',
        'stack_trace',
        'request_url'
    ];

    // Mutator for exception_trace attribute
    public function setExceptionTraceAttribute($value)
    {
        $this->attributes['exception_trace'] = json_encode($value);
    }

    // Accessor for exception_trace attribute
    public function getExceptionTraceAttribute($value)
    {
        return json_decode($value, true);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
