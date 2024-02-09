<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Requests\User\CreateUserRequest;
use App\Http\Requests\User\UpdateUserRequest;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;



class UserController extends Controller
{

    public function index(Request $request)
    {
        $sortColumn = $request->filled('sortColumn') ? $request->get('sortColumn') : 'created_at';
        $sortType = $request->filled('sortType') ? $request->get('sortType') : 'asc';
        $paginator = User::with('roles')
            ->where('name', 'like', '%' . $request->input('search', '') . '%')
            ->orWhere('email', 'like', '%' . $request->input('search', '') . '%');

        // If sorting by role, we need to join the roles table and order by its name
        if ($sortColumn === 'role') {
            $paginator = $paginator->leftJoin('user_role', 'users.id', '=', 'user_role.users_id');

        }

        $paginator = $paginator->orderBy($sortColumn === 'role' ? 'user_role.roles_id' : $sortColumn, $sortType)
            ->paginate(10);

        return Inertia::render(
            'Admin/User',
            [
                'users' => $paginator->items(),
                'currentPage' => $paginator->currentPage(),
                'total' => $paginator->total(),
                'from' => $paginator->firstItem(),
                'to' => $paginator->lastItem(),
                'lastPage' => $paginator->lastPage(),
                'search' => $request->input('search', ''),
                'sortColumn' => $sortColumn,
                'sortType' => $sortType,
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
        $user->fill($data);
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

    public function removeUser(string $id)
    {
        $user = User::where('id', $id)->where('status', 1)->first();
        if ($user) {
            $user->status = 0;
            $user->save();

            return back()->with('message', 'Xóa người dùng thành công');
        }

        return back()->with('error', 'Người dùng không tồn tại hoặc đã bị xóa');

    }


    public function removeListUser(Request $request)
    {
        $itemIds = $request->input('items');
        User::whereIn('id', $itemIds)->update(['status' => 0]);

        return back()->with('message', 'Đã cập nhật trạng thái thành công cho danh sách người dùng');

    }

    public function updateUser(string $id)
    {
        $roles = Role::all();
        $user = User::find($id);
        // Lấy roles_id của người dùng
        $userRoleIds = $user->roles()->pluck('id')->toArray();

        // Lấy thông tin của các vai trò dựa trên roles_id
        $userRoles = Role::whereIn('id', $userRoleIds)->get();

        return Inertia::render('Admin/CURD/UserUpdate', [
            'roles' => $roles,
            'user' => $user,
            'userRoles' => $userRoles

        ]);
    }

    public function updateUserData(UpdateUserRequest $request, string $id)
    {
        $data = $request->validated();

        // Tìm người dùng cần cập nhật
        $user = User::findOrFail($id);

        $existingUser = User::where('email', $data['email'])->where('id', '!=', $id)->first();
        if ($existingUser) {
            return back()->withErrors(['email' => 'Email đã tồn tại.'])->withInput();
        }
        // $user->fill($data);
        $user->name = $request->get('name');
        $user->email = $request->get('email');

        // Nếu password được cung cấp, hash và cập nhật nó
        if (isset($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        // Lưu các thay đổi
        $user->save();

        // Lấy vai trò từ dữ liệu request và gán cho người dùng
        if (isset($data['role'])) {
            $role = Role::findOrFail($data['role']);
            $user->roles()->sync([$role->id]); // Sử dụng sync để xóa các vai trò cũ và thêm vai trò mới
        }

        return redirect()->route('admin.user');
    }

}
