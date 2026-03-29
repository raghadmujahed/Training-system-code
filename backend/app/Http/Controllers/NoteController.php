<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        return Note::with(['user', 'request'])->get();
    }

    public function store(Request $request)
    {
        return Note::create($request->all());
    }

    public function show($id)
    {
        return Note::with(['user', 'request'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Note::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        Note::destroy($id);
        return ['message' => 'Deleted'];
    }
}