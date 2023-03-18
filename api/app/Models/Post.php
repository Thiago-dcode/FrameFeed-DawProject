<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Post extends Model
{
    use HasFactory, HasApiTokens;
    protected $guarded = [];

    public function categories()
    {

        return $this->belongsToMany(Category::class);
    }
    public function author()
    {

        return $this->belongsTo(User::class, 'user_id');
    }
    public function comments()
    {

        return $this->hasMany(Comment::class);
    }

    public function likes()
    {

        return $this->hasMany(PostLike::class);
    }
}
