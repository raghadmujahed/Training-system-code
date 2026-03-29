<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvaluationItem extends Model
{
    protected $fillable = [
        'template_id',
        'title',
        'max_score',
    ];

    public function template()
    {
        return $this->belongsTo(EvaluationTemplate::class, 'template_id');
    }

    public function scores()
    {
        return $this->hasMany(EvaluationScore::class, 'item_id');
    }
}