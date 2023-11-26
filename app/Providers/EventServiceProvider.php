<?php

namespace App\Providers;


use App\Events;
use App\Listeners;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Mail\Events\MessageSending;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        Events\AbsenceRequestAction::class => [
            Listeners\AbsenceRequestMailListener::class,
            Listeners\AbsenceRequestLogListener::class,
        ],
        MessageSending::class => [
            Listeners\EmailTrackingListener::class
        ],

        Events\ChangedPassword::class => [
            Listeners\ChangedPasswordMailListener::class
        ],

    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
