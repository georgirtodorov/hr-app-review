<?php

namespace App\Http\Controllers;


use App\Models\Positions;
use App\System\Employees\SupervisedEmployees;
use Illuminate\Http\JsonResponse;
use Laravel\Passport\RefreshToken;
use Laravel\Passport\Token;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use Auth;
use Illuminate\Http\Request;
use App\Models\User;
use App\System\User\Service;
use App\Http\Requests\UserRegisterRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @throws \Exception
     */
    public function index()
    {
        try {
            return Auth::user();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * @throws \Exception
     */
    public function user(Request $request)
    {
        try {
            return $request->user();
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    public function register(UserRegisterRequest $request)
    {
        try {
            return User::create([
                'first_name' => $request->get('first_name'),
                'last_name' => $request->get('last_name'),
                'email' => $request->get('email'),
                'password' => Hash::make($request->get('password'))
            ]);
        } catch (\Illuminate\Database\QueryException $exception) {
            if (intval($exception->getCode()) === 23000) {
                return response()->json(['error' => ['email' => ['Email address already exists.']]], 400);
            }
            throw $exception;
        }
    }

    public function delete($id)
    {
        try {
            return response()->json(User::find($id)->delete());
        } catch (\Throwable $e) {
            return response()->json($e->getMessage());
        }
    }

    public function permissionTest(SupervisedEmployees $test)
    {
        try {
            return $test->get();
        } catch (\Throwable $e) {
            return response()->json($e->getMessage());
        }


    }


    /**
     * Login user and create token
     * @throws \Exception
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $login_credentials = [
                'email' => $request->email,
                'password' => $request->password,
            ];
            if (auth()->attempt($login_credentials)) {
                //generate the token for the user
                $user_login_token = auth()->user()->createToken('Login');
                return response()->json(['token' => $user_login_token->accessToken, 'token_type' => 'Bearer']);
            } else {
                //wrong login credentials, return, user not authorised to our system, return error code 401
                return response()->json(['error' => 'UnAuthorised Access'], 401);
            }
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }

    /**
     * @throws \Exception
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            return DB::transaction(function () use ($request) {
                $tokens = $request->user()->tokens->pluck('id');
                Token::whereIn('id', $tokens)
                    ->update(['revoked' => true]);

                RefreshToken::whereIn('access_token_id', $tokens)->update(['revoked' => true]);
                return response()->json('success');
            });

        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

    }
}
