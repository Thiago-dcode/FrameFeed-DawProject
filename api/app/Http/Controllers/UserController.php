<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {

        $users = User::latest()->filter(request()->query())->get();

        return response()->json($users);
    }
    public function show($username)
    {

        $user = User::with('posts')->where('username', $username)->first();

        return response()->json($user);
    }
    public function store(Request $request)
    {
        $fields = $request->validate([

            'name' => 'required|min:3|max:255',
            'username' => 'required|min:3|max:255|alpha_dash|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|max:255|confirmed',
            

        ]);

        $user = User::create([

            'name' => $fields['name'],
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])


        ]);

        $token = $user->createToken('user token')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user,
            'toke' => $token
        ], 201);
    }
}
