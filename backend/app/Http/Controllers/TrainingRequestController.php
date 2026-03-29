<?php
use App\Models\TrainingRequest;

class TrainingRequestController extends Controller
{
    public function index()
    {
        return TrainingRequest::with(['user','site'])->get();
    }

    public function store(Request $request)
    {
        return TrainingRequest::create($request->all());
    }

    public function show($id)
    {
        return TrainingRequest::with(['user','site'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = TrainingRequest::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        TrainingRequest::destroy($id);
        return ['message' => 'Deleted'];
    }
}