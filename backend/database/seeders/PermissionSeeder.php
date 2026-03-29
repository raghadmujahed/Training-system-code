<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        $permissions = [

            // 👑 إدارة النظام
            'manage_system',
            'manage_users',
            'manage_roles',

            // 👨‍🎓 الطلاب
            'view_students',
            'create_students',
            'edit_students',
            'delete_students',

            // 👨‍🏫 المعلم
            'create_training',
            'edit_training',
            'view_training',
            'grade_students',

            // 🧭 الإشراف
            'view_reports',
            'approve_training',
            'assign_students',

            // 👨‍⚕️ الإرشاد
            'add_counseling_note',
            'view_counseling',

            // 🧠 النفسي
            'add_psychological_report',
            'view_psychological_cases',

            // 🏫 الإدارة
            'manage_schools',
            'manage_departments',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }
    }
}