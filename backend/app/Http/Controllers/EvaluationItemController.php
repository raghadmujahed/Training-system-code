<?php

namespace App\Http\Controllers;

use App\Models\EvaluationItem;
use Illuminate\Http\Request;

class EvaluationItemController extends Controller
{
    public function index()
    {
        return EvaluationItem::with('template')->get();
    }

    public function store(Request $request)
    {
        return EvaluationItem::create($request->all());
    }

    public function show($id)
    {
        return EvaluationItem::with('template')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = EvaluationItem::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        EvaluationItem::destroy($id);
        return ['message' => 'Deleted'];
    }
}