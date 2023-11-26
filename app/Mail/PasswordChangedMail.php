<?php
declare(strict_types=1);


namespace App\Mail;


use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordChangedMail extends Mailable
{
    use Queueable, SerializesModels;
    private  User $user;
    private User $auth;

    public function __construct(User $user, User $auth)
    {
        $this->user = $user;
        $this->auth = $auth;
    }

    /**
     * Build the message.
     *
     */
    public function build(): PasswordChangedMail
    {
        return $this->subject($this->makeSubject())
            ->view($this->getEmailBody())
            ->with([
                'user' => $this->user,
                'auth' => $this->auth,
                'loginUrl' => $this->buildLoginUrl()
            ]);
    }

    private function makeSubject(): string
    {
        return sprintf('Променена парола за достъп');
    }

    public function getEmailBody(): string
    {
        return 'emails.changed-password.notify-user';
    }

    private function buildLoginUrl()
    {
        return sprintf('%s/login',
            url('/')
        );
    }
}
