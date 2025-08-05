<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function user(Request $request)
    {
        return response()->json($request->user(), 200);
    }
    public function modifyUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|min:11|max:11',
            'address' => 'required|string|min:6|',
        ]);

        User::find(Auth()->id())->update($validated);

        return response()->json(["message" => "Updated successfully", "data" => $validated]);
    }
}
