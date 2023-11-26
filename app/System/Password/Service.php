<?php
declare(strict_types=1);


namespace App\System\Password;

use App\Exceptions\Controllers\Password\PasswordException;

class Service
{
    /**
     * @throws PasswordException
     */
    public function forceChange(int $userId, string $password): array
    {
        return ForceChange::submit($userId, $password);
    }

    /**
     * @throws PasswordException
     */
    public function change(string $currentPassword, string $newPassword): array
    {
        return Change::submit($currentPassword, $newPassword);
    }

    /**
     * @throws PasswordException
     */
    public function reset(string $email, string $password, string $passwordConfirmation, string $token): array
    {
        return Reset::submit($email, $password, $passwordConfirmation, $token);
    }

    /**
     * @throws PasswordException
     */
    public function restoreUrl(string $email): array
    {
        return RestoreUrl::sendLink($email);
    }

}
