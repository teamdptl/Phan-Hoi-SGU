<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Requests\User\CreateUserRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;



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
        $data = $request->validationData();

        // Tạo một user mới
        $user = new User();
        $user->name = $data['name'];
        $user->email = $data['email'];
        $user->password = Hash::make($data['password']); // Hash password
        $user->remember_token = Str::random(10);
        $user->email_verified_at = now(); 
        $user->status = '1'; 
        $user->save();

        // Lấy role từ dữ liệu request và gán cho user
        $role = Role::where('id', $data['role'])->first();
        if ($role) {
            $user->roles()->attach($role->id);
        }


        return to_route('admin.user');

    }
}
