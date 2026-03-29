<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'national_id',
        'name',
        'email',
        'password',
        'is_active',
    ];

    protected $hidden = [
        'password',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function trainingRequests()
    {
        return $this->hasMany(TrainingRequest::class);
    }

    public function assignments()
    {
        return $this->hasMany(TrainingAssignment::class);
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class, 'evaluator_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }
    
}