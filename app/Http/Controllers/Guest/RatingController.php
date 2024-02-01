<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rating\RatingRequest;
use App\Models\Review;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class RatingController extends Controller{
    //Hiển thị giao diện đánh giá
    public function index(){
        return Inertia::render('Guest/CreateRating');
    }

    public function checkWithCaptcha(RatingRequest $request){      
        $validated = $request->validated();
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=6Ld17l0pAAAAAJNhNbKjDPx15ze-xd-_LxqgkI5O&response='. $request->input('token');
        $response = Http::post($url);
        $success = json_decode($response)->success;
        if($success){
            // dd($validated);
            $rating = DB::table('reviews')->insert(
                [
                    'rating' => $validated['rating'],
                    'y_kien' => $validated['y_kien'],
                    'rooms_id' => $validated['rooms_id'],
                ]
                );
        }
        return Inertia::render('Guest/CreateRating', ['success' => $success]);
        // return $success;
    }
}