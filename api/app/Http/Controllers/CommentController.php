<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function store(Request $request)
    {


        $fields = $request->validate([
            'user_id' => 'required',
            'post_id' => 'required',
            'comment' => 'required|min:3|max:1000',
        ]);


        $comment = Comment::create($fields);


        return back();
    }
}
