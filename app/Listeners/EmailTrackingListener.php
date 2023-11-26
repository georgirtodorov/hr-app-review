<?php

namespace App\Listeners;

use Illuminate\Mail\Events\MessageSending;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class EmailTrackingListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  MessageSending  $event
     * @return void
     */
    public function handle(MessageSending $event)
    {
        // Access the email message and extract relevant details
        $message = $event->message;
        $recipients = $message->getTo();

        // Perform tracking action, e.g., log or save to database
        foreach ($recipients as $email) {
            $subject = $message->getSubject();
            try {
                // Log or save the email details as per your requirements
                Log::info("Email sent to: $email | Subject: $subject");
            } catch (\Exception $e) {
                throw new \Exception($e->getMessage());
            }
        }
    }
}
