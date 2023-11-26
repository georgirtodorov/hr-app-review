<?php
declare(strict_types=1);

namespace App\System\Access\UserAccess;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class Service
{
    /**
     * @return User[]
     * @throws Exception
     */
    public function list(): Collection
    {
        try {
            return User::with('roles.permissions', 'permissions')->get();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public function add(int $userId, array $roles, array $permissions): User
    {
        try {
            return DB::transaction(function () use ($userId, $roles, $permissions) {
                return User::find($userId)
                    ->syncRoles(array_column($roles, 'name'))
                    ->syncPermissions(array_column($permissions, 'name'));
            });
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public function revoke(int $userId): User
    {
        try {
            return DB::transaction(function () use ($userId) {
                return User::find($userId)
                    ->syncRoles([])
                    ->syncPermissions([]);
            });
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
