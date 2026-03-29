<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\TrainingRequestController;
use App\Http\Controllers\TrainingAssignmentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\EvaluationTemplateController;
use App\Http\Controllers\EvaluationItemController;

//
// 🟢 AUTH (public)
//
Route::post('/login', [AuthController::class, 'login']);

//
// 🟢 ALL AUTHENTICATED ROUTES
//
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    //
    // 👑 ADMIN ONLY ROUTES
    //
    Route::middleware('role:admin')->group(function () {

        // Users management
        Route::apiResource('users', UserController::class);

        // Role assignment
        Route::post('/users/{id}/assign-role', [UserRoleController::class, 'assignRole']);

        // Backup
        Route::post('/backup', [BackupController::class, 'store']);
    });

    Route::middleware([
    'auth:sanctum',
    'role:student:usool_tarbiah,academic_supervisor:psychology'
])->group(function () {

    Route::apiResource('training-requests', TrainingRequestController::class);

});

    //
    // 📌 SHARED AUTH ROUTES (any logged-in user)
    //
    Route::apiResource('training-requests', TrainingRequestController::class);
    Route::apiResource('assignments', TrainingAssignmentController::class);
    Route::apiResource('attendances', AttendanceController::class);
    Route::apiResource('evaluations', EvaluationController::class);
    Route::apiResource('evaluation-templates', EvaluationTemplateController::class);
    Route::apiResource('evaluation-items', EvaluationItemController::class);

});