<?php
declare(strict_types=1);


namespace App\Console\Commands;


use App\Mail\SickLeave;
use App\Models\Error;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class CleanupErrors extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'errors:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleanup old error logs';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Calculate the date 30 days ago
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        // Delete logs older than 30 days
        Error::where('created_at', '<', $thirtyDaysAgo)->delete();

        $this->info('Old error logs have been cleaned up.');
    }
}
