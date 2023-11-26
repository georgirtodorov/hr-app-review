<?php
declare(strict_types=1);


namespace App\System\Password;

use App\Exceptions\Controllers\Password\PasswordException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class Reset
{
    /**
     * @throws PasswordException
     */
    public static function submit(string $email, string $password, string $passwordConfirmation, string $token): array
    {
        $status = Password::reset(
            [
                'email'=> $email,
                'password'=> $password,
                'password_confirmation'=> $passwordConfirmation,
                'token'=> $token,
            ],
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );
        if ($status === Password::INVALID_TOKEN) {
            throw PasswordException::expiredLink();
        } elseif ($status === Password::INVALID_USER) {
            throw PasswordException::nonExistentUser($email);
        } elseif ($status === Password::PASSWORD_RESET) {
            return [
                'success' => true,
                'message' => 'Password was changed.'
            ];
        } else {
            throw PasswordException::passwordNotChanged();
        }
    }
}
