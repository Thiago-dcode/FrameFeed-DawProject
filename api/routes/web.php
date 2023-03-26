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


    $imageSize = getimagesize('http://localhost/DAW-PROJECT/api/public/storage/postFactoryImages/pic-1-5.jpg');



    $imageShape = 'square';

    if ($imageSize[0] > $imageSize[1]) $imageShape = 'horizontal';
    elseif ($imageSize[0] < $imageSize[1]) $imageShape = 'vertical';

    dd($imageShape);






    return view('welcome');
});
