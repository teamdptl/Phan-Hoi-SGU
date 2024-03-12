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
        $row = array_values($row);

        // dd(Str::lower($row[4]));
        $userIsDel = User::where('email', $row[2])->first();
        $status = (Str::lower($row[4]) == 'đang hoạt động') ? 1 : 0;


        if ($userIsDel) {
            // Cập nhật thông tin người dùng nếu email đã tồn tại
            $userIsDel->name = $row[1];
            if ($row[3]) {
                $userIsDel->password = Hash::make($row[3]);
            }
            $userIsDel->status = $status;
            $userIsDel->save();

            // Kiểm tra và cập nhật vai trò nếu có
            if (isset($row[5])) {
                $role = Role::where('name', $row[5])->first();
                $userIsDel->roles()->sync([$role->id]);
            }

            return $userIsDel;
        } else {
            // Người dùng chưa tồn tại, tạo mới
            $user = new User([
                'name' => $row[1],
                'email' => $row[2],
                'password' => Hash::make($row[3]),
                'status' => $status,
                'remember_token' => Str::random(10),
            ]);

            $user->save();

            // Kiểm tra và gán vai trò nếu có
            if (isset($row[5])) {
                $role = Role::where('name', $row[5])->first();
                $user->roles()->sync([$role->id]);

            }

            return $user;
        }
    }

    public function rules(): array
    {
        return [
            '1' => ['required', 'string'],
            '2' => ['required', 'email'],
            '3' => ['required', 'string'],
            '4' => ['required'],
        ];
    }


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
        return ['name', 'password'];
    }
}
