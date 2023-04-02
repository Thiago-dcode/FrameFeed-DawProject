<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Controllers\Controller;

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

        $avatar =   env('PUBLIC_STORAGE') . "/userAvatar/default.png";

        $user = User::create([

            'name' => $fields['name'],
            'avatar' => $avatar,
            'username' => $fields['username'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])


        ]);

        $token = $user->createToken('user token')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user,
            'token' => $token
        ], 201);
    }
    public function update(User $user, Request $request){

        $fields = $request->validate([

            'name' => 'required|min:3|max:255',
            'username' => ['required', 'min:3', 'max:25', Rule::unique('users', 'username')->ignore($user->id)],
            'avatar' => 'image',
            'email' => ['required' ,'email', Rule::unique('users', 'email')->ignore($user->id)],          
         

        ]);

        $fields['avatar' ]=   env('PUBLIC_STORAGE') . "/userAvatar/default.png";

        $user = $user->update($fields);


      

        $token = $user->createToken('user token')->plainTextToken;

        return response()->json([
            'message' => 'User updated successfully.',
            'user' => $user,
            'token' => $token
        ], 201);
    }

    
}
