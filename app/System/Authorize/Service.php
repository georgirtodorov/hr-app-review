<?php

namespace App\System\Authorize;

use App\Models\Employee;
use App\Models\PermissionDetails;
use App\Models\User;

class Service
{

    public function AllUsersPermissions()
    {
        $result = [];
        $users = User::with('roles.permissions')->get();

        foreach ($users as $user) {
            $employeeData = Employee::where('user_id', $user->id)->get()->first();
            $result[$user->email]['employee_data'] = $employeeData;
            foreach ($user->roles as $role) {
                foreach ($role->permissions as $permission) {
                    $permissionDetails = PermissionDetails::where('permission_id' , $permission->id)->first();
                    $result[$user->email]['permissions'][$role->name][$permission->name] = $permissionDetails;
                }
            }

            foreach ($user->getDirectPermissions() as $permission) {
                $permissionDetails = PermissionDetails::where('permission_id' , $permission->id)->first();
                $result[$user->email]['permissions']['custom_permissions'][$permission->name] = $permissionDetails;
            }
        }
        return $result;
    }
    public function get($userId)
    {
        $user = User::find($userId)->with('roles.permissions')->first();
        $result = [];
        foreach ($user->roles as $role) {
            echo $role->name . ' - ';
            foreach ($role->permissions as $permission) {
                echo $permission->name . ', ';
            }
        }

        foreach ($user->getDirectPermissions() as $permission) {
            echo $permission->name . ', ';
        }

        return $user;
    }
}
