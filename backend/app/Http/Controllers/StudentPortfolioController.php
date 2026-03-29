<?php

namespace App\Http\Controllers;

use App\Models\StudentPortfolio;
use Illuminate\Http\Request;

class StudentPortfolioController extends Controller
{
    public function index()
    {
        return StudentPortfolio::with('entries')->get();
    }

    public function store(Request $request)
    {
        return StudentPortfolio::create($request->all());
    }

    public function show($id)
    {
        return StudentPortfolio::with('entries')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = StudentPortfolio::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        StudentPortfolio::destroy($id);
        return ['message' => 'Deleted'];
    }
}