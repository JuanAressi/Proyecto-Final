<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Mail;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // $schedule->command('inspire')->hourly();
    }


    // /**
    //  * Register the commands for the application.
    //  * Send email every 30 minutes
    //  */
    // protected function schedule(Schedule $schedule)
    // {
    //     $schedule->call(function () {
    //         $to_name = 'Receptor';
    //         $to_email = 'receptor@email.com';

    //         $data = [
    //             'email' => $to_email,
    //             'name' => $to_name,
    //             'subject' => 'Prueba de correo electrónico',
    //             'bodyMessage' => '<h1>Hola Receptor</h1><p>Este es el contenido de la prueba de correo electrónico programado</p>'
    //         ];

    //         Mail::send([], $data, function($message) use ($data){
    //             $message->to($data['email'], $data['name']);
    //             $message->subject($data['subject']);
    //             $message->setBody($data['bodyMessage'], 'text/html'); 
    //         });
    //     })->everyThirtyMinutes();
    // }
    // 
    // * * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1



    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
