<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{

    protected $fillable = [
        'content',
        'user_id',
        'task_id',
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }
}
