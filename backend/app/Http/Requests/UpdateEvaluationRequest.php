<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEvaluationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // فقط المقيم الأصلي أو المسؤول
    }

    public function rules(): array
    {
        return [
            'notes' => 'nullable|string',
            'status' => 'sometimes|in:draft,submitted,approved',
        ];
    }
}