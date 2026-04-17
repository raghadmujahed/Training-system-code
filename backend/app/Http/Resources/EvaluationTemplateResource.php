<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Enums\EvaluationFormType;

class EvaluationTemplateResource extends JsonResource
{
    // app/Http/Resources/EvaluationTemplateResource.php

public function toArray($request)
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'description' => $this->description,
        'form_type' => $this->form_type,
        'department_id' => $this->department_id,
        'department' => new DepartmentResource($this->whenLoaded('department')), // اختياري
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
}