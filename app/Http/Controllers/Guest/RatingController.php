<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class RatingController extends Controller{
    //Hiển thị giao diện đánh giá
    public function index(){
        return Inertia::render('Guest/CreateRating');
    }
}