<?php

namespace App\Http\Controllers;

use App\Models\TrainingAssignment;
use Illuminate\Http\Request;

class TrainingAssignmentController extends Controller
{
    public function index()
    {
        return TrainingAssignment::with([
            'user',
            'site',
            'coordinator',
            'supervisor',
            'period',
            'request'
        ])->get();
    }

    public function store(Request $request)
    {
        return TrainingAssignment::create($request->all());
    }

    public function show($id)
    {
        return TrainingAssignment::with([
            'user',
            'site',
            'coordinator',
            'supervisor',
            'period',
            'request'
        ])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = TrainingAssignment::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        TrainingAssignment::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
}