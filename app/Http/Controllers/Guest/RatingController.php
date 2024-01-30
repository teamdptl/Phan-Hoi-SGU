<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use HTTPRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RatingController extends Controller{
    //Hiển thị giao diện đánh giá
    public function index(){
        return Inertia::render('Guest/CreateRating');
    }

    public function checkWithCaptcha(Request $request){       
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret='. $request->input('secretKey') .'&response='. $request->input('token');
        $response = Http::post($url);
        return response("Hello");
    }
}