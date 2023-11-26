<?php
declare(strict_types=1);

namespace App\Http\Controllers;


use App\Exceptions\Controllers\Password\PasswordException;
use App\Exceptions\ReportableException;
use App\System\Password\Service;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Validation\ValidationException;

class PasswordController extends Controller
{
    /**
     * @throws ReportableException
     */
    public function forgotten(Request $request, Service $service): array
    {
        $request->validate(['email' => 'required|email']);

        try {
            return $service->restoreUrl($request->get('email'));
        } catch (\Exception $e) {
            if ($e instanceof PasswordException) {
                throw $e;
            }
            throw ReportableException::make($e);
        }
    }

    /**
     * @throws ReportableException
     */
    public function reset(Request $request, Service $service): array
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        try {
            return $service->reset(
                $request->get('email'),
                $request->get('password'),
                $request->get('password_confirmation'),
                $request->get('token')
            );
        } catch (\Exception $e) {
            if ($e instanceof PasswordException) {
                throw $e;
            }
            throw ReportableException::make($e);
        }
    }

    /**
     * @throws ValidationException
     * @throws ReportableException
     */
    public function change(Request $request, Service $service): array
    {
        $this->validate($request, [
            'current_password' => 'required|string',
            'new_password' => 'required|confirmed|min:8|string'
        ]);

        try {
            return $service->change($request->get('current_password'), $request->get('new_password'));
        } catch (\Exception $e) {
            if ($e instanceof PasswordException) {
                throw new \Exception($e->getMessage(), 400);
            }
            throw ReportableException::make($e);
        }
    }

    /**
     * @throws ValidationException
     * @throws ReportableException
     */
    public function forceChange(Request $request, Service $service): array
    {
        $this->validate($request, [
            'user_id' => 'required|int',
            'password' => 'required|min:8|confirmed',
        ]);

        try {
            return $service->forceChange($request->get('user_id'), $request->get('password'));
        } catch (\Exception $e) {
            if ($e instanceof PasswordException) {
                throw $e;
            }
            throw ReportableException::make($e);
        }
    }
}
