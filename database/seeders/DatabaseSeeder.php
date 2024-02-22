<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Enums\RoleEnum;
use App\Models\Role;
use App\Models\Type;
use App\Models\User;


use Illuminate\Database\Seeder;
use Illuminate\Support\Str;


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

        Type::create([
            'name' => 'Thiết bị điện tử (máy tính, máy chiếu, loa, micro)',
            'description' => 'Thiết bị điện tử (máy tính, máy chiếu, loa, micro)',
            'icon' => 'default_equipment.png',
        ]);

        Type::create([
            'name' => 'Thiết bị văn phòng (máy in, bút viết, bàn ghế)',
            'description' => 'Thiết bị văn phòng (máy in, bút viết, bàn ghế)',
            'icon' => 'default_equipment.png',
        ]);

        Type::create([
            'name' => 'Thiết bị chiếu sáng và giám sát (đèn, camera)',
            'description' => 'Thiết bị chiếu sáng và giám sát (đèn, camera)',
            'icon' => 'default_equipment.png',
        ]);

        Type::create([
            'name' => 'Thiết bị làm lạnh, làm mát (máy lạnh, máy quạt)',
            'description' => 'Thiết bị làm lạnh, làm mát (máy lạnh, máy quạt)',
            'icon' => 'default_equipment.png',
        ]);

//        for ($i = 0; $i < 10; $i++) {
//            User::create([
//                'name' => Str::random(10),
//                'email' => Str::random(10) . '@example.com',
//                'email_verified_at' => now(),
//                'password' => bcrypt('password'),
//                'status' => rand(0, 1),
//                'remember_token' => Str::random(10),
//                'created_at' => now(),
//                'updated_at' => now(),
//            ]);
//        }
    }
}
