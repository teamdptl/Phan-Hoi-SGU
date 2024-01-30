<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    use HasFactory;

    protected $fillable = ['rating', 'y_kien'];
    protected $table = 'reviews';

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function room() : BelongsTo
    {
        return $this->belongsTo(Room::class, 'rooms_id', 'id');
    }

}
