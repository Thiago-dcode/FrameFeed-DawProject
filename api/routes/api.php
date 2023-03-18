<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/posts', function () {

    return response()->json([['msg' => 'still working 1'], ['msg' => 'still working 2'], ['msg' => 'still working 3'], ['msg' => 'still working 4'], ['msg' => 'still working 5']]);
});

Route::get('/img', function () {

    $imgPath = env('PUBLIC_FOLDER') . '/bd02desarrollo.jpg';

    return response()->json(['img' => $imgPath]);
});
