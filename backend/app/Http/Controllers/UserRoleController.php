<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    
public function assignRole(Request $request, $userId)
{
    $user = User::findOrFail($userId);
    $role = Role::findOrFail($request->role_id);

    $user->roles()->attach($role->id);

    return response()->json([
        'message' => 'Role assigned successfully'
    ]);
}
}
