<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEvaluationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'training_assignment_id' => 'required|exists:training_assignments,id',
            'template_id' => 'required|exists:evaluation_templates,id',
            'scores' => 'required|array',
            'scores.*.item_id' => 'required|exists:evaluation_items,id',
            'scores.*.score' => 'nullable|numeric|min:0',
            'scores.*.response_text' => 'nullable|string',
            'scores.*.file' => 'nullable|file',
            'notes' => 'nullable|string',
        ];
    }
}