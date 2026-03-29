<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrainingAssignment extends Model
{
    protected $fillable = [
        'training_request_id',
        'user_id',
        'training_site_id',
        'coordinator_id',
        'supervisor_id',
        'training_period_id',
        'status',
        'start_date',
        'end_date',
    ];

    public function request()
    {
        return $this->belongsTo(TrainingRequest::class, 'training_request_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function site()
    {
        return $this->belongsTo(TrainingSite::class);
    }

    public function coordinator()
    {
        return $this->belongsTo(User::class, 'coordinator_id');
    }

    public function supervisor()
    {
        return $this->belongsTo(User::class, 'supervisor_id');
    }

    public function period()
    {
        return $this->belongsTo(TrainingPeriod::class, 'training_period_id');
    }
}