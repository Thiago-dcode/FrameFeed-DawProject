<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Traits\HttpResponses;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()

    {


        $posts = Post::latest()->filter(request()->query())->paginate(9);

        return response()->json($posts);
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
     * Display the specified resource.
     */
    public function show(Post $post)
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
    public function update(UpdatePostRequest $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
