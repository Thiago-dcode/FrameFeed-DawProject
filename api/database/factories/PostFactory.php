<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\Factory;

use function PHPUnit\Framework\fileExists;

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

        //get all images for factory
        $images = Storage::disk('public')
            ->allFiles('/postFactoryImages');




        //get a random image
        $image = env('POST_IMAGES') . "/postFactoryImages/image-" . rand(0, count($images) - 1) . '.jpg';

        //and check his size
        $imageSize = getimagesize($image);



        $title = fake()->unique()->sentence();
        $slug = str_replace(' ', '-', $title);
        return [
            'user_id' => User::all()->random()->id,
            'image' => $image,
            'image_shape' => $imageSize[0] > $imageSize[1] ? 'horizontal' : 'vertical',
            'title' => $title,
            'slug' => $slug,
            'excerpt' => fake()->sentence(),
            'body' => implode('. ', fake()->paragraphs()),
        ];
    }
}
