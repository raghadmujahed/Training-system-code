<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingSite extends Model
{
    protected $fillable = [
        'name',
        'location',
        'phone',
        'description',
        'is_active',
    ];

    public function requests()
    {
        return $this->hasMany(TrainingRequest::class);
    }

    public function assignments()
    {
        return $this->hasMany(TrainingAssignment::class);
    }
}