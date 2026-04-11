<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ActivityLogResource;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(ActivityLog::class, 'activity_log');
    }

    public function index(Request $request)
    {
        $query = ActivityLog::with('user');
        if ($request->has('user_id')) $query->where('user_id', $request->user_id);
        if ($request->has('action')) $query->where('action', $request->action);
        if ($request->has('from_date')) $query->whereDate('created_at', '>=', $request->from_date);
        if ($request->has('to_date')) $query->whereDate('created_at', '<=', $request->to_date);
        
        $logs = $query->latest()->paginate($request->per_page ?? 15);
        return ActivityLogResource::collection($logs);
    }

    public function show(ActivityLog $activityLog)
    {
        return new ActivityLogResource($activityLog->load(['user', 'details']));
    }

    public function destroy(ActivityLog $activityLog)
    {
        $activityLog->delete();
        return response()->json(['message' => 'تم حذف السجل']);
    }
}