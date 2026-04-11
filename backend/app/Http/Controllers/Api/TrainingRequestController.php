<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTrainingRequest;
use App\Http\Requests\UpdateTrainingRequest;
use App\Http\Requests\SendTrainingRequestToDirectorateRequest;
use App\Http\Requests\DirectorateApproveTrainingRequest;
use App\Http\Requests\SendTrainingRequestToSchoolRequest;
use App\Http\Requests\SchoolApproveTrainingRequest;
use App\Http\Requests\RejectTrainingRequestRequest;
use App\Http\Resources\TrainingRequestResource;
use App\Models\TrainingRequest;
use App\Services\TrainingRequestService;
use Illuminate\Http\Request;

class TrainingRequestController extends Controller
{
    protected $trainingRequestService;

    public function __construct(TrainingRequestService $trainingRequestService)
    {
        $this->trainingRequestService = $trainingRequestService;
        $this->authorizeResource(TrainingRequest::class, 'training_request');
    }

    public function index(Request $request)
    {
        $query = TrainingRequest::with(['trainingSite', 'trainingRequestStudents.user', 'trainingRequestStudents.course']);
        
        if ($request->has('book_status')) {
            $query->where('book_status', $request->book_status);
        }
        if ($request->has('training_site_id')) {
            $query->where('training_site_id', $request->training_site_id);
        }
        
        $trainingRequests = $query->latest()->paginate($request->per_page ?? 15);
        return TrainingRequestResource::collection($trainingRequests);
    }

    public function store(StoreTrainingRequest $request)
    {
        $trainingRequest = $this->trainingRequestService->createTrainingRequest(
            $request->validated(),
            $request->user()->id
        );
        return new TrainingRequestResource($trainingRequest);
    }

    public function show(TrainingRequest $trainingRequest)
    {
        return new TrainingRequestResource($trainingRequest->load(['trainingSite', 'trainingRequestStudents.user', 'trainingRequestStudents.course']));
    }

    public function update(UpdateTrainingRequest $request, TrainingRequest $trainingRequest)
    {
        $trainingRequest->update($request->validated());
        return new TrainingRequestResource($trainingRequest);
    }

    public function destroy(TrainingRequest $trainingRequest)
    {
        $trainingRequest->delete();
        return response()->json(['message' => 'تم حذف الكتاب بنجاح']);
    }

    public function sendToDirectorate(SendTrainingRequestToDirectorateRequest $request, TrainingRequest $trainingRequest)
    {
        $this->authorize('sendToDirectorate', $trainingRequest);
        $this->trainingRequestService->sendToDirectorate(
            $trainingRequest,
            $request->user()->id,
            $request->validated()
        );
        return response()->json(['message' => 'تم إرسال الكتاب إلى المديرية بنجاح']);
    }

    public function directorateApprove(DirectorateApproveTrainingRequest $request, TrainingRequest $trainingRequest)
    {
        $this->authorize('approveByDirectorate', $trainingRequest);
        if ($request->status === 'rejected') {
            $this->trainingRequestService->reject($trainingRequest, $request->rejection_reason, $request->user()->id);
            return response()->json(['message' => 'تم رفض الكتاب']);
        }
        $this->trainingRequestService->directorateApprove($trainingRequest, $request->user()->id);
        return response()->json(['message' => 'تمت موافقة المديرية على الكتاب']);
    }

    public function sendToSchool(SendTrainingRequestToSchoolRequest $request, TrainingRequest $trainingRequest)
    {
        $this->authorize('sendToSchool', $trainingRequest);
        $this->trainingRequestService->sendToSchool(
            $trainingRequest,
            $request->user()->id,
            $request->validated()
        );
        return response()->json(['message' => 'تم إرسال الكتاب إلى المدرسة بنجاح']);
    }

    public function schoolApprove(SchoolApproveTrainingRequest $request, TrainingRequest $trainingRequest)
    {
        $this->authorize('approveBySchool', $trainingRequest);
        if ($request->status === 'rejected') {
            $this->trainingRequestService->reject($trainingRequest, $request->rejection_reason, $request->user()->id);
            return response()->json(['message' => 'تم رفض الكتاب من قبل المدرسة']);
        }
        $this->trainingRequestService->schoolApprove($trainingRequest, $request->user()->id, $request->students);
        return response()->json(['message' => 'تمت موافقة المدرسة وتعيين المعلمين بنجاح']);
    }

    public function reject(RejectTrainingRequestRequest $request, TrainingRequest $trainingRequest)
    {
        $this->authorize('update', $trainingRequest);
        $this->trainingRequestService->reject($trainingRequest, $request->rejection_reason, $request->user()->id);
        return response()->json(['message' => 'تم رفض الكتاب']);
    }
}