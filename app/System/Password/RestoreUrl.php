<?php
declare(strict_types=1);


namespace App\System\Password;

use App\Exceptions\Controllers\Password\PasswordException;
use Illuminate\Support\Facades\Password;

class RestoreUrl
{
    /**
     * @throws PasswordException
     */
    public static function sendLink(string $email): array
    {
        $status = Password::sendResetLink(
            ['email' => $email]
        );

        if ($status !== Password::RESET_LINK_SENT) {
            throw PasswordException::invalidEmail();
        }
        return [
            'success' => true,
            'message' => 'Mail for password reset was sent.'
        ];
    }
}
