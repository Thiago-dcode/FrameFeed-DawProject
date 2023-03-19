<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $images = Storage::disk('public')->allFiles('postFactoryImages');


        $title = fake()->unique()->sentence();
        $slug = str_replace(' ', '-', $title);
        return [
            'user_id' => User::all()->random()->id,
            'image' =>  env('POST_IMAGES') . "/postFactoryImages/image-" . rand(0, count($images) - 1) . '.jpg',
            'title' => $title,
            'slug' => $slug,
            'excerpt' => fake()->sentence(),
            'body' => implode('. ', fake()->paragraphs()),
        ];
    }
}
