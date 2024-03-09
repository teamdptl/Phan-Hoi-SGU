<?php

namespace App\Imports;

use App\Models\User;
use App\Models\Role;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithUpsertColumns;
use Maatwebsite\Excel\Concerns\WithUpserts;

class UserImport implements ToModel, WithHeadingRow, WithUpserts, WithUpsertColumns
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $userIsDel = User::where('email', $row['email'])->first();

        if ($userIsDel && $userIsDel->status) {
            return null; // Người dùng đã tồn tại và đã được kích hoạt, không thêm mới
        } elseif ($userIsDel && !$userIsDel->status) {
            $userIsDel->name = $row['name'];
            $userIsDel->password = Hash::make($row['password']);
            $userIsDel->status = 1;
            $userIsDel->save();

            // Lấy vai trò từ dữ liệu và gán cho người dùng
            if (isset($row['role'])) {
                $role = Role::where('id', $row['role'])->first();
                if ($role) {
                    $userIsDel->roles()->sync([$role->id]); // Sử dụng sync để xóa các vai trò cũ và thêm vai trò mới
                }
            }

            return null; // Trả về null để không thêm người dùng mới
        }

        // Người dùng chưa tồn tại, thêm mới
        $user = new User([
            'name' => $row['name'],
            'email' => $row['email'],
            'password' => Hash::make($row['password']),
            'status' => 1,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);
        $user->save();

        // Lấy vai trò từ dữ liệu và gán cho người dùng
        if (isset($row['role'])) {
            $role = Role::where('id', $row['role'])->first();
            if ($role) {
                $user->roles()->sync([$role->id]);
            }
        }

        return null; // Trả về null để không thêm người dùng mới
    }
    public function headingRow(): int
    {
        return 2;
    }

    public function uniqueBy()
    {
        return 'id';
    }

    public function upsertColumns()
    {
        return ['name', 'email', 'password', 'role'];
    }
}
