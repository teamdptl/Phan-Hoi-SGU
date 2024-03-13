<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request){
        if ($request->user() == null){
            return to_route('guide');
        }

        else if ($request->user()->isAdmin()){
            return to_route('admin.dashboard');
        }

        else if ($request->user()->isWorker()){
            return to_route('worker.home');
        }

        else{
            return to_route('guide');
        }
    }
}
