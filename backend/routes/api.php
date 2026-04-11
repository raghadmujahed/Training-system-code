<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    TrainingRequestController,
    TrainingAssignmentController,
    EvaluationController,
    UserController,
    AttendanceController,
    TaskController,
    TrainingLogController,
    OfficialLetterController,
    ConversationController,
    AnnouncementController,
    DashboardController,
    TrainingSiteController,
    CourseController,
    SectionController,
    EnrollmentController,
    DepartmentController,
    RoleController,
    PermissionController,
    StudentPortfolioController,
    SupervisorVisitController,
    BackupController,
    ActivityLogController,
    TrainingPeriodController,
    EvaluationTemplateController,
    NotificationController,
    NoteController,
    WeeklyScheduleController,
    FeatureFlagController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Routes publiques (authentification)
Route::post('/login', [UserController::class, 'login'])->name('login');

// Routes protégées par authentification Sanctum
Route::middleware(['auth:sanctum'])->group(function () {

    // Logout (doit être authentifié)
    Route::post('/logout', [UserController::class, 'logout']);

    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Current user
    Route::get('/user', [UserController::class, 'currentUser']);

    // Users
    Route::apiResource('users', UserController::class);
    Route::patch('users/{user}/status', [UserController::class, 'changeStatus']);

    // Roles & Permissions
    Route::apiResource('roles', RoleController::class);
    Route::apiResource('permissions', PermissionController::class);

    // Departments
    Route::apiResource('departments', DepartmentController::class);

    // Courses & Sections
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('sections', SectionController::class);
    Route::apiResource('enrollments', EnrollmentController::class);

    // Training Sites & Periods
    Route::apiResource('training-sites', TrainingSiteController::class);
    Route::apiResource('training-periods', TrainingPeriodController::class);
    Route::patch('training-periods/{training_period}/set-active', [TrainingPeriodController::class, 'setActive']);

    // Training Requests (Core workflow)
    Route::apiResource('training-requests', TrainingRequestController::class);
    Route::post('training-requests/{training_request}/send-to-directorate', [TrainingRequestController::class, 'sendToDirectorate']);
    Route::post('training-requests/{training_request}/directorate-approve', [TrainingRequestController::class, 'directorateApprove']);
    Route::post('training-requests/{training_request}/send-to-school', [TrainingRequestController::class, 'sendToSchool']);
    Route::post('training-requests/{training_request}/school-approve', [TrainingRequestController::class, 'schoolApprove']);
    Route::post('training-requests/{training_request}/reject', [TrainingRequestController::class, 'reject']);

    // Training Assignments
    Route::apiResource('training-assignments', TrainingAssignmentController::class);

    // Attendance
    Route::apiResource('attendances', AttendanceController::class);
    Route::patch('attendances/{attendance}/approve', [AttendanceController::class, 'approve']);
    Route::get('attendance-summary', [AttendanceController::class, 'summary']);

    // Training Logs
    Route::apiResource('training-logs', TrainingLogController::class);
    Route::post('training-logs/{training_log}/submit', [TrainingLogController::class, 'submit']);
    Route::post('training-logs/{training_log}/review', [TrainingLogController::class, 'review']);

    // Tasks
    Route::apiResource('tasks', TaskController::class);
    Route::post('tasks/{task}/submit', [TaskController::class, 'submit']);
    Route::post('task-submissions/{submission}/grade', [TaskController::class, 'grade']);

    // Evaluations
    Route::apiResource('evaluations', EvaluationController::class);
    Route::apiResource('evaluation-templates', EvaluationTemplateController::class);
    Route::post('evaluation-templates/{evaluation_template}/items', [EvaluationTemplateController::class, 'addItem']);
    Route::put('evaluation-items/{item}', [EvaluationTemplateController::class, 'updateItem']);
    Route::delete('evaluation-items/{item}', [EvaluationTemplateController::class, 'deleteItem']);

    // Student Portfolio
    Route::apiResource('student-portfolios', StudentPortfolioController::class);
    Route::post('student-portfolios/{student_portfolio}/entries', [StudentPortfolioController::class, 'addEntry']);
    Route::put('portfolio-entries/{entry}', [StudentPortfolioController::class, 'updateEntry']);
    Route::delete('portfolio-entries/{entry}', [StudentPortfolioController::class, 'deleteEntry']);

    // Supervisor Visits
    Route::apiResource('supervisor-visits', SupervisorVisitController::class);
    Route::post('supervisor-visits/{supervisor_visit}/complete', [SupervisorVisitController::class, 'complete']);

    // Official Letters
    Route::apiResource('official-letters', OfficialLetterController::class);
    Route::post('official-letters/{official_letter}/send', [OfficialLetterController::class, 'send']);
    Route::post('official-letters/{official_letter}/receive', [OfficialLetterController::class, 'receive']);
    Route::post('official-letters/{official_letter}/approve', [OfficialLetterController::class, 'approve']);

    // Conversations & Messages
    Route::apiResource('conversations', ConversationController::class);
    Route::post('conversations/{conversation}/messages', [ConversationController::class, 'sendMessage']);

    // Announcements
    Route::apiResource('announcements', AnnouncementController::class);

    // Notifications
    Route::get('notifications', [NotificationController::class, 'index']);
    Route::get('notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::patch('notifications/{notification}/read', [NotificationController::class, 'markAsRead']);
    Route::post('notifications/mark-all-read', [NotificationController::class, 'markAllAsRead']);
    Route::delete('notifications/{notification}', [NotificationController::class, 'destroy']);

    // Notes
    Route::apiResource('notes', NoteController::class);

    // Weekly Schedules
    Route::apiResource('weekly-schedules', WeeklyScheduleController::class);

    // Feature Flags (dynamic features)
    Route::get('feature-flags', [FeatureFlagController::class, 'index']);
    Route::patch('feature-flags/{feature_flag}', [FeatureFlagController::class, 'update']);
    Route::get('feature-flags/check/{name}', [FeatureFlagController::class, 'check']);

    // Backups
    Route::apiResource('backups', BackupController::class);
    Route::post('backups/{backup}/restore', [BackupController::class, 'restore']);

    // Activity Logs
    Route::apiResource('activity-logs', ActivityLogController::class);
});