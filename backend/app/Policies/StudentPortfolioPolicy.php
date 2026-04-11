<?php

namespace App\Policies;

use App\Models\StudentPortfolio;
use App\Models\User;

class StudentPortfolioPolicy
{
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function view(User $user, StudentPortfolio $studentPortfolio): bool
    {
        if ($user->role->name === 'student') {
            return $user->id === $studentPortfolio->user_id;
        }
        if ($user->role->name === 'academic_supervisor') {
            return $user->id === $studentPortfolio->trainingAssignment->academic_supervisor_id;
        }
        return in_array($user->role->name, ['coordinator', 'admin']);
    }

    public function create(User $user): bool
    {
        return $user->role->name === 'student';
    }

    public function update(User $user, StudentPortfolio $studentPortfolio): bool
    {
        if ($user->role->name === 'student') {
            return $user->id === $studentPortfolio->user_id;
        }
        return in_array($user->role->name, ['coordinator', 'admin']);
    }

    public function delete(User $user): bool
    {
        return $user->role->name === 'admin';
    }
}