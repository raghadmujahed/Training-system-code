<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    public function index()
    {
        return Announcement::with('user')->get();
    }

    public function store(Request $request)
    {
        return Announcement::create($request->all());
    }

    public function show($id)
    {
        return Announcement::with('user')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Announcement::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        Announcement::destroy($id);
        return ['message' => 'Deleted'];
    }
}