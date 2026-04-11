<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTrainingLogRequest;
use App\Http\Requests\UpdateTrainingLogRequest;
use App\Http\Requests\ReviewTrainingLogRequest;
use App\Http\Resources\TrainingLogResource;
use App\Models\TrainingLog;
use App\Services\TrainingLogService;
use Illuminate\Http\Request;

class TrainingLogController extends Controller
{
    protected $trainingLogService;

    public function __construct(TrainingLogService $trainingLogService)
    {
        $this->trainingLogService = $trainingLogService;
    }

    public function index(Request $request)
    {
        $query = TrainingLog::with(['trainingAssignment.enrollment.user']);
        
        if ($request->has('training_assignment_id')) {
            $query->where('training_assignment_id', $request->training_assignment_id);
        }
        if ($request->user()->role?->name === 'student') {
            $query->whereHas('trainingAssignment.enrollment', fn($q) => $q->where('user_id', $request->user()->id));
        }
        
        $logs = $query->latest('log_date')->paginate($request->per_page ?? 15);
        return TrainingLogResource::collection($logs);
    }

    public function store(StoreTrainingLogRequest $request)
    {
        $log = $this->trainingLogService->createLog($request->validated(), $request->user()->id);
        return new TrainingLogResource($log);
    }

    public function show(TrainingLog $trainingLog)
    {
        return new TrainingLogResource($trainingLog->load(['trainingAssignment']));
    }

    public function update(UpdateTrainingLogRequest $request, TrainingLog $trainingLog)
    {
        $trainingLog->update($request->validated());
        return new TrainingLogResource($trainingLog);
    }

    public function submit(TrainingLog $trainingLog)
    {
        $log = $this->trainingLogService->submitLog($trainingLog);
        return new TrainingLogResource($log);
    }

    public function review(ReviewTrainingLogRequest $request, TrainingLog $trainingLog)
    {
        $log = $this->trainingLogService->reviewLog($trainingLog, $request->status, $request->supervisor_notes);
        return new TrainingLogResource($log);
    }

    public function destroy(TrainingLog $trainingLog)
    {
        $trainingLog->delete();
        return response()->json(['message' => 'تم حذف السجل']);
    }
}