<?php

namespace App\Http\Controllers\Guest;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use App\Http\Controllers\Controller;

class GuideController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Guest/GuideHome', [

        ]);  
    }
}
