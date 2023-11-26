<?php
declare(strict_types=1);


namespace App\Exceptions\Controllers\Password;


use App\Exceptions\ContainsHttpCode;
use Exception;

class PasswordException extends Exception implements ContainsHttpCode
{
    public static function invalidEmail(): PasswordException
    {
        return new static('Invalid email!', 400);
    }

    public static function passwordNotChanged(): PasswordException
    {
        return new static('Password change failed.', 400);
    }

    public static function expiredLink(): PasswordException
    {
        return new static('Expired reset link', 400);
    }

    public static function nonExistentUser(string $email): PasswordException
    {
        return new static(sprintf('User with email %s does not exist.', $email), 400);
    }

    public static function invalidCurrentPassword(): PasswordException
    {
        return new static('Current password is Invalid', 400);
    }

    public static function identicalCurrentAndNewPassword(): PasswordException
    {
        return new static('New Password cannot be same as the current password.', 400);
    }
}
