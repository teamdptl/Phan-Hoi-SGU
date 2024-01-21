<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Reply extends Model
{
    use HasFactory;

    protected $fillable = ['content'];

    public function media() : BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'reply_media', 'reply_id', 'media_id');
    }

    public function report() : BelongsTo
    {
        return $this->belongsTo(Report::class, 'reports_id', 'id');
    }

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }
}
