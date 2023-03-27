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
    public function show($username){
       
        $user = User::with('posts')->where('username', $username)->first();

        return response()->json($user);

    }
}
