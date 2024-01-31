<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RatingController extends Controller{
    //Hiển thị giao diện đánh giá
    public function index(){
        return Inertia::render('Guest/CreateRating');
    }

    public function checkWithCaptcha(Request $request){       
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=6Ld17l0pAAAAAJNhNbKjDPx15ze-xd-_LxqgkI5O&response='. $request->input('token');
        $response = Http::post($url);
        $success = json_decode($response)->success;
        return Inertia::render('Guest/CreateRating', ['success' => $success, 'star' => $request->input('star'), 'text' => $request->input('text')]);
        // return json_decode($response)->success;
    }
}