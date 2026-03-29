<?php

namespace App\Http\Controllers;

use App\Models\Evaluation;
use Illuminate\Http\Request;

class EvaluationController extends Controller
{
    public function index()
    {
        return Evaluation::with(['request', 'evaluator', 'template', 'scores'])->get();
    }

    public function store(Request $request)
    {
        return Evaluation::create($request->all());
    }

    public function show($id)
    {
        return Evaluation::with(['request', 'evaluator', 'template', 'scores'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Evaluation::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        Evaluation::destroy($id);
        return ['message' => 'Deleted'];
    }
}