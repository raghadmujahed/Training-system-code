<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    protected $fillable = [
        'training_request_id',
        'evaluator_id',
        'template_id',
        'total_score',
        'notes',
    ];

    public function request()
    {
        return $this->belongsTo(TrainingRequest::class);
    }

    public function evaluator()
    {
        return $this->belongsTo(User::class, 'evaluator_id');
    }

    public function template()
    {
        return $this->belongsTo(EvaluationTemplate::class, 'template_id');
    }

    public function scores()
    {
        return $this->hasMany(EvaluationScore::class);
    }
}