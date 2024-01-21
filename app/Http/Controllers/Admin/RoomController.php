<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Room', []);
    }

    public function addRoom(){

    }

    public function editRoom(){

    }

    public function removeRoom(){

    }

    public function roomInfo(){

    }
}
