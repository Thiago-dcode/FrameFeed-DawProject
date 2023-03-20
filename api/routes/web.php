<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use PhpParser\Node\Stmt\Goto_;

use function Webmozart\Assert\Tests\StaticAnalysis\length;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



Route::get('/', function () {


    //     $images = Storage::disk('local')
    //     ->allFiles('public/postFactoryImages');



    // //Renaming all the images
    // foreach ($images as $i => $image) {


    //     Storage::move($image, "postFactoryImages/image-{$i}.jpg");
    // }

    // dd($images);


    
        

    return view('welcome');
});
