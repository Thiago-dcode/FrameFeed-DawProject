<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Comment;
use App\Models\Category;
use App\Traits\HttpResponses;
use Laravel\Sanctum\HasApiTokens;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;
use App\Models\CommentLike;
use Database\Factories\CommentLikeFactory;

class PostController extends Controller
{
    use HttpResponses, HasApiTokens;
    /**
     * Display a listing of the resource.
     */
    public function index()

    {


        $posts = Post::withCount('likes')->filter(request()->query())->orderBy('likes_count','desc')->paginate(9);

        return response()->json($posts);
    }



    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $post = Post::withCount('likes')->where('slug',$slug)->first();
        return response()->json($post);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {


        $images = Storage::disk('public')
            ->allFiles('/postFactoryImages');




        //get a random image
        $image = env('POST_IMAGES') . "/" . $images[rand(0, count($images) - 1)];

        //and check his size
        $imageSize = getimagesize($image);

        $post = Post::create([

            'user_id' => User::all()->random()->id,
            'title' => 'This title has the letter j',
            'slug' => 'this-title-has-the-letter-j',
            'image' => $image,
            'image_shape' => $imageSize[0] > $imageSize[1] ? 'horizontal' : 'vertical',
            'excerpt' => fake()->sentence(),
            'body' => implode('. ', fake()->paragraphs()),

        ]);

        $post->categories()->attach(Category::all()->random(rand(2, 7))->unique()->pluck('id')->toArray());




        return response()->json($post);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
