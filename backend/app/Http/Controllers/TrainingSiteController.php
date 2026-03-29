<?php
use App\Models\TrainingSite;

class TrainingSiteController extends Controller
{
    public function index() { return TrainingSite::all(); }

    public function store(Request $request)
    {
        return TrainingSite::create($request->all());
    }

    public function show($id)
    {
        return TrainingSite::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = TrainingSite::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        TrainingSite::destroy($id);
        return ['message' => 'Deleted'];
    }
}