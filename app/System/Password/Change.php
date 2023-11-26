<?php
declare(strict_types=1);


namespace App\System\Password;

use App\Exceptions\Controllers\Password\PasswordException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Auth;

class Change
{
    /**
     * @throws PasswordException
     */
    public static function submit(string $currentPassword, string $newPassword): array
    {
        $auth = Auth::user();

        // The passwords matches
        if (!Hash::check($currentPassword, $auth->password)) {
            throw PasswordException::invalidCurrentPassword();
        }

        // Current password and new password same
        if (strcmp($currentPassword, $newPassword) == 0) {
            throw PasswordException::identicalCurrentAndNewPassword();
        }

        $user = User::find($auth->id);
        $user->password = Hash::make($newPassword);
        $user->save();
        return [
            'success' => true,
            'message' => 'Password was changed.'
        ];
    }
}
