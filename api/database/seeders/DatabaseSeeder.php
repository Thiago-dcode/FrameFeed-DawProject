<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Post;
use App\Models\User;
use App\Models\Category;
use App\Models\Comment;
use App\Models\PostLike;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(50)->create();
        Category::factory(50)->create();
        Post::factory(200)->create();


        foreach (Post::all() as  $post) {

            //seeding pivot table
            $post->categories()->attach(Category::all()->random(rand(2, 7))->unique()->pluck('id')->toArray());

            //seeding post like table
            PostLike::factory(rand(20, 150))->create([
                'post_id' => $post->id,
            ]);

            //Seeding comment for each post
            Comment::factory(rand(5 ,15))->create([
                'post_id' => $post->id,
            ]);
        }
    }
}
