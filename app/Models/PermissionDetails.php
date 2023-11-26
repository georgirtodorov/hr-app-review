<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermissionDetails extends Model
{
    use HasFactory;

    protected $table = 'permissions_details';
    public $timestamps = false;

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'localized_name',
        'localized_description',
        'permission_id'
    ];

//    protected $appends = [
//        'permission_name',
//    ];

//    public function getPermissionNameAttribute()
//    {
//        $positionName = Permission::select('name')
//            ->where('id', '=', $this->permission_id)
//            ->pluck('name')
//            ->first();
//
//        return $positionName ?? 'undefined';
//    }
}
