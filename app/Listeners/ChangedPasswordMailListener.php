<?php
declare(strict_types=1);


namespace App\Listeners;


use App\Events\ChangedPassword;
use App\Exceptions\ReportableException;
use App\Mail\PasswordChangedMail;
use Illuminate\Support\Facades\Mail;
use App\Exceptions;
use Auth;

class ChangedPasswordMailListener
{
    /**
     * @throws Exceptions\Listeners\ChangedPassword
     * @throws ReportableException
     */
    public function handle(ChangedPassword $event): void
    {
        $user = $event->getUser();
        $auth = Auth::user();

        if ($auth->id == $user->id) {
            return;
        }

        try {
            Mail::to($user->email)->bcc($auth->email)->send(new PasswordChangedMail($user, $auth));
        } catch (\Exception $e) {
            throw Exceptions\ReportableException::make(Exceptions\Listeners\ChangedPassword::mailNotSent($e));
        }
    }
}
