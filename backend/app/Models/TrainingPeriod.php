<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingPeriod extends Model
{
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_active',
    ];

    public function assignments()
    {
        return $this->hasMany(TrainingAssignment::class);
    }
}