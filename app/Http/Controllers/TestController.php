<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TestController extends Controller
{
    public function index(){
        // Lấy danh sách phòng bằng laravel và trả về

        return Inertia::render('Guest/RoomAction', [
            "rooms" => [],
        ]);
    }
}
