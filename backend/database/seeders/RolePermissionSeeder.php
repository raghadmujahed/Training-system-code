<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run()
    {
        // 👑 admin = كل الصلاحيات
        $admin = Role::where('name', 'admin')->first();
        $admin->permissions()->sync(Permission::all()->pluck('id'));

        // 👨‍🏫 teacher
        $teacher = Role::where('name', 'teacher')->first();
        $teacher->permissions()->sync(
            Permission::whereIn('name', [
                'create_training',
                'edit_training',
                'view_training',
                'grade_students',
            ])->pluck('id')
        );

        // 👨‍🎓 student
        $student = Role::where('name', 'student')->first();
        $student->permissions()->sync(
            Permission::whereIn('name', [
                'view_training',
            ])->pluck('id')
        );

        // 🧭 counselor
        $counselor = Role::where('name', 'adviser')->first();
        $counselor->permissions()->sync(
            Permission::whereIn('name', [
                'add_counseling_note',
                'view_counseling',
            ])->pluck('id')
        );

        // 🧠 psychologist
        $psychologist = Role::where('name', 'psychologist')->first();
        $psychologist->permissions()->sync(
            Permission::whereIn('name', [
                'add_psychological_report',
                'view_psychological_cases',
            ])->pluck('id')
        );

        // 🧭 training coordinator
        $coordinator = Role::where('name', 'training_coordinator')->first();
        $coordinator->permissions()->sync(
            Permission::whereIn('name', [
                'assign_students',
                'view_reports',
            ])->pluck('id')
        );

        // 🏫 school manager
        $schoolManager = Role::where('name', 'school_manager')->first();
        $schoolManager->permissions()->sync(
            Permission::whereIn('name', [
                'manage_students',
                'view_reports',
            ])->pluck('id')
        );
    }
}