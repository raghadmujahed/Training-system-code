<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationTemplate extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function items()
    {
        return $this->hasMany(EvaluationItem::class, 'template_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'template_id');
    }
}