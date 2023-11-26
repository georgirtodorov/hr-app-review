<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Permission extends \Spatie\Permission\Models\Permission
{
    use HasFactory;

    protected $table = 'permissions';
    public $timestamps = false;


    protected $appends = [
        'localized_name',
        'localized_description',
    ];

    public function getLocalizedNameAttribute()
    {
        return $this->permissionDetail()->pluck('localized_name')->first();
    }

    public function getLocalizedDescriptionAttribute()
    {
        return $this->permissionDetail()->pluck('localized_description')->first() ?? null;
    }

    public function permissionDetail()
    {
        return $this->hasOne(PermissionDetails::class);
    }
}
