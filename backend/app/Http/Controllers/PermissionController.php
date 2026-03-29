<?php
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function index() { return Permission::all(); }

    public function store(Request $request)
    {
        return Permission::create($request->all());
    }

    public function show($id)
    {
        return Permission::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $item = Permission::findOrFail($id);
        $item->update($request->all());
        return $item;
    }

    public function destroy($id)
    {
        Permission::destroy($id);
        return ['message' => 'Deleted'];
    }
}