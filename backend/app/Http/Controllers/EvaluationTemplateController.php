<?php

namespace App\Http\Controllers;

use App\Models\EvaluationTemplate;
use Illuminate\Http\Request;

class EvaluationTemplateController extends Controller
{
    public function index()
    {
        return EvaluationTemplate::with('items')->get();
    }

    public function store(Request $request)
    {
        return EvaluationTemplate::create($request->all());
    }

    public function show($id)
    {
        return EvaluationTemplate::with('items')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = EvaluationTemplate::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        EvaluationTemplate::destroy($id);
        return ['message' => 'Deleted'];
    }
}