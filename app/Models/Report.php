<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Report extends Model
{
    use HasFactory;

    // Other có nghĩa là thiết bị khác
    // Location dùng locate bằng gps (sẽ làm sau)
    protected $fillable = ['other', 'description'];

    protected $attributes = [
        // 'rooms_id' => '1', 
        'status' => 'sent'
    ];

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function media() : BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'report_media', 'reports_id', 'media_id');
    }

    public function assignment() : HasOne
    {
        return $this->hasOne(Assignment::class, 'reports_id', 'id');
    }

    public function reply() : HasOne
    {
        return $this->hasOne(Reply::class, 'reports_id', 'id');
    }

    public function equipments() : BelongsToMany
    {
        return $this->belongsToMany(Equipment::class, 'report_equipments', 'reports_id', 'equipments_id');
    }

    public function room() : BelongsTo
    {
        return $this->belongsTo(Room::class, 'rooms_id', 'id');
    }
}
