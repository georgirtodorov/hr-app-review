<?php
declare(strict_types=1);

namespace App\System\Access\Permissions;

use App\Models\Permission;
use Exception;
use Illuminate\Database;
use Illuminate\Support\Facades\DB;

class Service
{
    /**
     * @return Permission[]
     * @throws Exception
     */
    public function list(): Database\Eloquent\Collection
    {
        try {
            return Permission::select('id', 'name')->with('permissionDetail')->get();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public function add($data): Permission
    {
        if (empty($data)) {
            throw new Exception('Permission is empty', 400);
        }
        try {
            $permission = DB::transaction(function () use ($data) {
                // Create or update the permission
                $permission = Permission::updateOrCreate(['name' => $data['name']]);

                // Create or update the permission details
                $permission->permissionDetail()->updateOrCreate([
                    'permission_id' => $permission->id,
                ], [
                    'localized_name' => $data['localized_name'],
                    'localized_description' => $data['localized_description'] ?? null,
                ]);
                return $permission;
            });

        } catch (Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == 1062) {
                throw new Exception(sprintf('Duplicated permission %s', $data['name']));
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        /** @var Permission $permission */
        return $permission;
    }

    /**
     * @throws Exception
     */
    public function delete(int $id): bool
    {
        try {
            return Permission::findOrFail($id)->delete();
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
