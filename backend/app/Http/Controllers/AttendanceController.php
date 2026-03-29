<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index()
    {
        return Attendance::with(['user', 'request'])->get();
    }

    public function store(Request $request)
    {
        return Attendance::create($request->all());
    }

    public function show($id)
    {
        return Attendance::with(['user', 'request'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Attendance::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        Attendance::destroy($id);
        return ['message' => 'Deleted'];
    }
}