<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(){
        return Inertia::render('Admin/User');
    }

    public function addUser(){
        $roles = Role::all();
        return Inertia::render('Admin/CURD/UserUpdate',[
            'roles' => $roles
        ]);
    }
}
