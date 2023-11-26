<?php
declare(strict_types=1);

namespace App\System\Access\Roles;

use App\Models;
use Exception;
use Illuminate\Database;
use Illuminate\Support\Facades\DB;

class Service
{
    /**
     * @return Models\Role[]
     * @throws Exception
     */
    public function list(): Database\Eloquent\Collection
    {
        try {
            return Models\Role::select('id', 'name')->with('users', 'permissions')->get();
        } catch (\Throwable $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public function add($data): Models\Role
    {
        if (empty($data)) {
            throw new Exception('Permission is empty', 400);
        }
        try {
            return DB::transaction(function () use ($data) {
                // Create or update the role
                $role = Models\Role::updateOrCreate(['name' => $data['name']]);

                // Role permissions list
                $role->syncPermissions(array_column($data['permissions'], 'name'));

                return Models\Role::select('id', 'name')->where('name', $data['name'])->with('users', 'permissions')->first();
            });
        } catch (Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                throw new Exception(sprintf('Duplicated Role %s', $data['name']));
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        /** @var Models\Role $role */
        return $role;
    }

    /**
     * @throws Exception
     */
    public function updateUsers(string $name, array $users): Models\Role
    {
        if (empty($name)) {
            throw new Exception('Role name not found!');
        }

        return DB::transaction(function () use ($name, $users) {
            // Clear role users list
            $currentRoleUsers = Models\Role::where('name', $name)->first()->users()->get();
            foreach ($currentRoleUsers as $queryRow) {
                $queryRow->roles()->detach();
            }

            // Overwrite roles to users list
//            foreach ($users as $user) {
//                Models\User::find($user['id'])->syncRoles($name);
//            }

            // Append roles to users list ( for multiple roles per user )
            foreach ($users as $user) {
                $user = Models\User::find($user['id']);
                $user->assignRole($name);
            }

            return Models\Role::select('id', 'name')->where('name', $name)->with('users', 'permissions')->first();
        });
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): bool
    {
        try {
            return Models\Role::findOrFail($id)->delete();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
