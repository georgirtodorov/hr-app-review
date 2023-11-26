<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NotificationSettings extends Model
{
    use HasFactory;

    protected $table = 'notification_settings';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'category',
        'action',
        'email'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'email', 'email');
    }
}
