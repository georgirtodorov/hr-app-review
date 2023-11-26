<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\SickLeave;
use Illuminate\Routing\Controller;

class MailController extends Controller
{
    public function sendMail()
    {
        Mail::to('georgi.r.todorov@gmail.com')->send(new SickLeave());
        return view('welcome');
    }
}
