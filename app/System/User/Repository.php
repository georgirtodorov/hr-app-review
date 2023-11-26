<?php

namespace App\System\User;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class Repository
{
    /**
     * @return []User;
     */
    public function list(): array
    {
        return User::all();
    }

    public function save(array $user)
    {
        try {
            return User::create([
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'email' => $user['email'],
                'password' => Hash::make($user['password'])
            ]);
        } catch (\Illuminate\Database\QueryException $exception) {
            if (intval($exception->getCode()) === 23000) {
                return response()->json(['error' => 'Email address already exists.'], 400);
            }
            throw $exception;
        }
    }

    public function load($id)
    {

    }
//repo should have models like load($id) , someModelClass, save(Model $model) and list(): Model[]
}
