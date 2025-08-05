<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|',
            'phone' => 'required|string|min:11|max:11',
            'address' => 'required|string|min:6|',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'password' => bcrypt($validated['password']),
        ]);

        return response()->json(['message' => 'User registered'], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);
        if(Auth::attempt($credentials))
        {
            $user=Auth()->user();
            $request->session()->regenerate();
            return response()->json(['message'=>"login successfully","user"=>$user],200);
        }
        return response()->json(['message'=>"invalid credential"],401);
    }

    public function logout(Request $request)
    {
        $request->session()->invalidate();
        $request->session()->regenerate();
        return response()->json(['message' => 'Logged out']);
    }

    public function user(Request $request)
    {
        return response()->json($request->user(), 200);
    }

}
