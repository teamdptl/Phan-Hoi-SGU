<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;


class UserExport implements FromCollection, WithHeadings, WithMapping
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return User::with('roles')->get();
        ;
    }

    public function map($user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'email_verified_at' => $user->email_verified_at,
            'status' => $user->status ? 'Đang hoạt động' : 'Không hoạt động',
            'roleName' => $user->roles->pluck('name')->implode(', '),
            'roleDescription' => $user->roles->pluck('description')->implode(', ')
        ];
    }

    public function headings(): array
    {
        return [
            'Id',
            'Tên',
            'Email',
            'Ngày khởi tạo',
            'Trạng thái',
            'Vai trò',
            'Miêu tả vai trò'
        ];
    }
}
