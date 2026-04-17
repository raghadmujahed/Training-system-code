<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->role?->name === 'admin' || $this->user()->id == $this->route('user');
    }

    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $this->route('user'),
            'phone' => 'nullable|string|max:20',
            'department_id' => 'nullable|exists:departments,id',
            'major' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'school_name' => 'nullable|string|max:255',
            'academic_department' => 'nullable|string|max:255',
            'specialization' => 'nullable|string|max:255',
            // أضف institution_name إلى القواعد
'institution_name' => 'nullable|string|max:255',
        ];
    }
}