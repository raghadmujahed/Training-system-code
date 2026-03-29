<?php

namespace App\Http\Controllers;

use App\Models\PortfolioEntry;
use Illuminate\Http\Request;

class PortfolioEntryController extends Controller
{
    public function index()
    {
        return PortfolioEntry::with('portfolio')->get();
    }

    public function store(Request $request)
    {
        return PortfolioEntry::create($request->all());
    }

    public function show($id)
    {
        return PortfolioEntry::with('portfolio')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = PortfolioEntry::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        PortfolioEntry::destroy($id);
        return ['message' => 'Deleted'];
    }
}