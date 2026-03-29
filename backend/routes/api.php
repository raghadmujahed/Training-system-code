<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\EvaluationTemplateController;
use App\Http\Controllers\EvaluationItemController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\TrainingAssignmentController;
use App\Http\Controllers\TrainingRequestController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BackupController;



Route::post('/register', [AuthController::class, 'register']);

Route::get('/users', [UserController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);

//Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::post('/backup', [BackupController::class, 'store']);
Route::apiResource('training-requests', TrainingRequestController::class);
Route::apiResource('users', UserController::class);
Route::apiResource('training-requests', TrainingRequestController::class);
Route::apiResource('assignments', TrainingAssignmentController::class);
Route::apiResource('attendances', AttendanceController::class);
Route::apiResource('evaluations', EvaluationController::class);
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::apiResource('users', UserController::class);
});




Route::apiResource('users', UserController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('permissions', PermissionController::class);
Route::apiResource('training-sites', TrainingSiteController::class);
Route::apiResource('training-periods', TrainingPeriodController::class);
Route::apiResource('training-requests', TrainingRequestController::class);
Route::apiResource('training-assignments', TrainingAssignmentController::class);
Route::apiResource('attendances', AttendanceController::class);
Route::apiResource('evaluations', EvaluationController::class);
Route::apiResource('evaluation-templates', EvaluationTemplateController::class);
Route::apiResource('evaluation-items', EvaluationItemController::class);
Route::apiResource('evaluation-scores', EvaluationScoreController::class);
Route::apiResource('notes', NoteController::class);
Route::apiResource('announcements', AnnouncementController::class);
Route::apiResource('student-portfolios', StudentPortfolioController::class);
Route::apiResource('portfolio-entries', PortfolioEntryController::class);
Route::post('backups', [BackupController::class, 'store']);
