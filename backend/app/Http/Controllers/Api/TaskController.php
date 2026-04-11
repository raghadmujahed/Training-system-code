<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\SubmitTaskRequest;
use App\Http\Requests\GradeTaskSubmissionRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\TaskSubmission;
use App\Services\TaskService;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    protected $taskService;

    public function __construct(TaskService $taskService)
    {
        $this->taskService = $taskService;
        $this->authorizeResource(Task::class, 'task');
    }

    public function index(Request $request)
    {
        $query = Task::with(['trainingAssignment.enrollment.user', 'assignedBy']);
        
        if ($request->user()->role?->name === 'student') {
            $query->whereHas('trainingAssignment.enrollment', fn($q) => $q->where('user_id', $request->user()->id));
        } elseif ($request->user()->role?->name === 'teacher') {
            $query->where('assigned_by', $request->user()->id);
        }
        
        $tasks = $query->latest()->paginate($request->per_page ?? 15);
        return TaskResource::collection($tasks);
    }

    public function store(StoreTaskRequest $request)
    {
        $task = $this->taskService->createTask($request->validated(), $request->user()->id);
        return new TaskResource($task);
    }

    public function show(Task $task)
    {
        return new TaskResource($task->load(['submissions.user', 'trainingAssignment']));
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task = $this->taskService->updateTask($task, $request->validated());
        return new TaskResource($task);
    }

    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'تم حذف المهمة']);
    }

    public function submit(SubmitTaskRequest $request, Task $task)
    {
        $submission = $this->taskService->submitTask($task, $request->user()->id, $request->validated());
        return response()->json(['message' => 'تم تسليم المهمة بنجاح', 'submission_id' => $submission->id]);
    }

    public function grade(GradeTaskSubmissionRequest $request, TaskSubmission $submission)
    {
        $submission = $this->taskService->gradeSubmission($submission, $request->grade, $request->feedback);
        return response()->json(['message' => 'تم تقييم المهمة بنجاح']);
    }
}