<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 👇 تشغيل seeders أولًا
        $this->call([
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            DepartmentSeeder::class,
        ]);

        // 👇 إنشاء الأدمن
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'password' => bcrypt('123456'),
        ]);
    }
}