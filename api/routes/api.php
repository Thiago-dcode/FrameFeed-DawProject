<?php

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\CategoryController;

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


// Protected routes

Route::group(['middleware' => ['auth:sanctum']], function () {
    //create a post
    Route::post('/posts', [PostController::class, 'store']);
    //Update a post
    Route::patch('/posts/{post:slug}', [PostController::class, 'update']);
    //Delete a post
    Route::delete('/posts/{post:slug}', [PostController::class, 'destroy']);
    //Logout a user
    Route::post('/logout', [SessionController::class, 'destroy']);
    //Update a user
    Route::patch('/users/{id}', [UserController::class, 'update']);
    //Delete a user
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});

// Public routes

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user:username}', [UserController::class, 'show']);
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{post:slug}', [PostController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [SessionController::class, 'store']);
