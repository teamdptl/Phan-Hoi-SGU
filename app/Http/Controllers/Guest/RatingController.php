<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Rating\RatingRequest;
use App\Models\Review;
use App\Models\Room;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class RatingController extends Controller{
    //Hiển thị giao diện đánh giá
    public function index(Request $request){
        $room = Room::where('qr_code', $request->get('id'))->first();


        return Inertia::render('Guest/CreateRating', [
            "roomName" => $room->name,
            "qrCode" => $request->get('id')
        ]);
    }

    public function checkWithCaptcha(RatingRequest $request){
        $validated = $request->validated();
        $url = 'https://www.google.com/recaptcha/api/siteverify?secret=6Ld17l0pAAAAAJNhNbKjDPx15ze-xd-_LxqgkI5O&response='. $request->input('token');
        $response = Http::post($url);
        $success = json_decode($response)->success;
        // dd($request->all());
        $rating = false;
        if($success){
            $rating = Room::where('qr_code', $validated['qr_code'])->first()->reviews()->create($validated);
        }
        return Inertia::render('Guest/CreateRating', ['success' => $success, 'insertRating' => $rating]);
    }
}
