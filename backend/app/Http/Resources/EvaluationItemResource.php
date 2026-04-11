<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Enums\EvaluationFieldType;

class EvaluationItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'field_type' => $this->field_type,
            'field_type_label' => EvaluationFieldType::tryFrom($this->field_type)?->label() ?? $this->field_type,
            'options' => $this->options,
            'is_required' => (bool) $this->is_required,
            'max_score' => $this->max_score,
            'created_at' => $this->created_at?->toDateTimeString(),
            'updated_at' => $this->updated_at?->toDateTimeString(),
        ];
    }
}