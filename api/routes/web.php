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


        $images = Storage::disk('public')
        ->allFiles('/postFactoryImages');


       
    // dd($images);
  

    $image = env('POST_IMAGES') . "/". $images[rand(0, count($images)-1)];

  
    redirect($image);

 


    
        

    return view('welcome');
});
