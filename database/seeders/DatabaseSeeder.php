<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\RoleEnum;
use App\Models\Role;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Role::create([
           'id' => RoleEnum::ADMIN,
           'name' => 'Quản trị viên',
           'description' => 'Người thực hiện quản lý website',
           'icon' => '',
        ]);

        Role::create([
            'id' => RoleEnum::WORKER,
            'name' => 'Nhân viên kỹ thuật',
            'description' => 'Người thực hiện sửa chữa các vấn đề',
            'icon' => '',
        ]);

        Role::create([
            'id' => RoleEnum::INSPECTOR,
            'name' => 'Người giám sát',
            'description' => 'Người thực hiện giám sát các công việc thi hành của nhân viên sửa chữa',
            'icon' => '',
        ]);
    }
}
