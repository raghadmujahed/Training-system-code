<?php

namespace App\Providers;

use App\Models\User;
use App\Models\TrainingRequest;
use App\Models\TrainingAssignment;
use App\Models\Task;
use App\Models\Evaluation;
use App\Models\Attendance;
use App\Models\StudentPortfolio;
use App\Models\TrainingSite;
use App\Policies\UserPolicy;
use App\Policies\TrainingRequestPolicy;
use App\Policies\TrainingAssignmentPolicy;
use App\Policies\TaskPolicy;
use App\Policies\EvaluationPolicy;
use App\Policies\AttendancePolicy;
use App\Policies\StudentPortfolioPolicy;
use App\Policies\TrainingSitePolicy;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
    \App\Models\TrainingRequest::class => \App\Policies\TrainingRequestPolicy::class,
    \App\Models\TrainingAssignment::class => \App\Policies\TrainingAssignmentPolicy::class,
    \App\Models\Evaluation::class => \App\Policies\EvaluationPolicy::class,
    \App\Models\User::class => \App\Policies\UserPolicy::class,
    \App\Models\Attendance::class => \App\Policies\AttendancePolicy::class,
    \App\Models\Task::class => \App\Policies\TaskPolicy::class,
    \App\Models\OfficialLetter::class => \App\Policies\OfficialLetterPolicy::class,
     TrainingSite::class => TrainingSitePolicy::class,
];
    public function boot(): void
{
    Gate::before(function ($user, $ability) {
        if ($user->role?->name === 'admin') {
            return true;
        }
    });
}
}