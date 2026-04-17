<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Role;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role?->name === 'admin';
    }

    public function rules(): array
    {
        $rules = [
            'university_id' => 'required|string|max:255|unique:users',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'status' => 'required|in:active,inactive,suspended',
            'department_id' => 'nullable|exists:departments,id',
            'role_id' => 'required|exists:roles,id',
            'phone' => 'nullable|string|max:20',
        ];

        $roleId = $this->input('role_id');
        $role = Role::find($roleId);
        $roleName = $role ? $role->name : null;

        switch ($roleName) {
            case 'student':
                $rules['major'] = 'required|string|max:255';
    $rules['department_id'] = 'required|exists:departments,id';
                break;

            case 'teacher':
                $rules['subject'] = 'required|string|max:255';
                $rules['training_site_id'] = 'required|exists:training_sites,id';
                break;

            case 'school_manager':
                $rules['training_site_id'] = 'required|exists:training_sites,id';
                break;

            case 'counselor':
                $rules['training_site_id'] = 'required|exists:training_sites,id';
                break;

            case 'psychologist':
                $rules['training_site_id'] = 'required|exists:training_sites,id';
                break;

            case 'academic_supervisor':
                $rules['academic_department'] = 'required|string|max:255';
                break;

            default:
                break;
        }

        return $rules;
    }
}