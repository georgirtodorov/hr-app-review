<?php
declare(strict_types=1);


namespace App\System\Password;

use App\Events;
use App\Exceptions\Controllers\Password\PasswordException;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Auth;

class ForceChange
{
    /**
     * @throws PasswordException
     */
    public static function submit($user_id, $newPassword): array
    {
        $auth = Auth::user();
        $user = User::find($user_id);

        $user->password = Hash::make($newPassword);
        $user->save();

        Events\ChangedPassword::dispatch($user);
        return [
            'success' => true,
            'message' => 'Password was changed.',
            'logout' => $auth->id == $user->id
        ];
    }
}
