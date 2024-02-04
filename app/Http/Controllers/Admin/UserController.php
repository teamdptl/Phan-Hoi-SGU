<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Requests\User\CreateUserRequest;



class UserController extends Controller
{

    public function index(Request $request)
    {
        $paginator = User::with('roles')
            ->where('name', 'like', '%' . $request->input('search', '') . '%')
            ->orWhere('email', 'like', '%' . $request->input('search', '') . '%')
            ->paginate(10);
        $items = $paginator->items();
        $currentPage = $paginator->currentPage();

      
        return Inertia::render(
            'Admin/User',
            [
                'users' => $paginator->items(),
                'currentPage' => $paginator->currentPage(),
                'total' => $paginator->total(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'lastPage' => $paginator->lastPage(),
                'search' => $request->input('search', '')
            ]
        );
    }

    public function addUser()
    {
        $roles = Role::all();
        return Inertia::render('Admin/CURD/UserSave', [
            'roles' => $roles
        ]);
    }

    public function storeNewUser(CreateUserRequest $request)
    {


        return to_route('admin.user');

    }
}
