<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            'admin', // مدير النظام
            'student', // الطالب
            'teacher', // المعلم 
            'school_manager', // مدير المدرسة 
            'adviser', // مرشد 
             'psychologist', // اخصائي نفسي 
            'academic_supervisor', // المشرف الاكاديمي
            'training_coordinator', // منسق التدريب
            'education_directorate', // وزارات التربية 
            'health_directorate', // وزارة الصحة 
            'head_of_department', // رئيس القسم 
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }
    }
}