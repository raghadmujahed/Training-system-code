<?php
use App\Models\TrainingPeriod;

class TrainingPeriodController extends Controller
{
    public function index() { return TrainingPeriod::all(); }

    public function store(Request $request)
    {
        return TrainingPeriod::create($request->all());
    }

    public function show($id)
    {
        return TrainingPeriod::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = TrainingPeriod::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        TrainingPeriod::destroy($id);
        return ['message' => 'Deleted'];
    }
}