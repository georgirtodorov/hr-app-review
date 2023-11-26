<?php
declare(strict_types=1);

namespace App\System\UserPermission;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class Service
{
    /**
     * @throws \Exception
     */
    public function get(User $user): array
    {
        try {
            return DB::transaction(function () use ($user) {
                // Get the user's roles
                $roles = $user->roles()->with('permissions')->get();

                // Get the user's additional permissions
                $additionalPermissions = $user->permissions;

                // Merge the user's roles' permissions and additional permissions
                $permissions = $roles->flatMap(function (Role $role) {
                    return $role->permissions;
                })->merge($additionalPermissions);

                // Return unique array of user's permissions
                return array_values(array_unique($permissions->pluck('name')->toArray(), SORT_REGULAR));
            });

        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
