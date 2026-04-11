<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EvaluationTemplate extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'form_type'];

    public function items()
    {
        return $this->hasMany(EvaluationItem::class, 'template_id');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }
}