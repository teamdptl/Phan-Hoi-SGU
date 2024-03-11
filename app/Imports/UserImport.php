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
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;


HeadingRowFormatter::default('none');
class UserImport implements ToModel, WithHeadingRow, WithUpserts, WithUpsertColumns
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {


        // $userIsDel = User::where('email', $row['email'])->first();

        // if ($userIsDel && $userIsDel->status) {
        //     return null; // Người dùng đã tồn tại và đã được kích hoạt, không thêm mới
        // } elseif ($userIsDel && !$userIsDel->status) {
        //     $userIsDel->name = $row['name'];
        //     $userIsDel->password = Hash::make($row['password']);
        //     $userIsDel->status = 1;
        //     $userIsDel->save();

        //     // Lấy vai trò từ dữ liệu và gán cho người dùng
        //     if (isset($row['role'])) {
        //         $role = Role::where('id', $row['role'])->first();
        //         if ($role) {
        //             $userIsDel->roles()->sync([$role->id]); // Sử dụng sync để xóa các vai trò cũ và thêm vai trò mới
        //         }
        //     }

        //     return $userIsDel;
        // }

        // Người dùng chưa tồn tại, thêm mới

        // dd(array_values($row));

        $row = array_values($row);
        // dd($row);

        $user = new User([
            'name' => $row[1],
            'email' => $row[2],
            'password' => Hash::make($row[3]),
            'status' => 1,
            'email_verified_at' => now(),
            'remember_token' => Str::random(10),
        ]);


        $user->save();

        // dd($user);

        // Lấy vai trò từ dữ liệu và gán cho người dùng
        if (isset($row[5])) {
            $role = Role::findOrFail($row[5]);
            if ($role) {
                $user->roles()->sync([$role->id]); // Sử dụng sync để xóa các vai trò cũ và thêm vai trò mới
            }
        }

        return $user;
    }
    // public function rules(): array
    // {
    //     return [
    //         '0' => ['required', 'string', 'max:250'],
    //         '3' => ['required', 'string'],
    //         '1' => ['required', 'string', 'email'],
    //         '2' => ['required', 'string', 'min:6']
    //     ];
    // }


    public function headingRow(): int
    {
        return 1;
    }

    public function uniqueBy()
    {
        return 'id';
    }

    public function upsertColumns()
    {
        return ['name', 'email', 'password'];
    }
}
