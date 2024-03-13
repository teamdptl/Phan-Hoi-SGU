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
    protected $fillable = ['other', 'description', 'rooms_id'];
    protected $table = 'reports';

    protected $attributes = [

        'status' => 'sent'
    ];

    public function getTitle(): string
    {
        $equipments = $this->equipments;
        return empty($this->other) ? $equipments->pluck('name')->join(', ') :
            $equipments->pluck('name')->push($this->other)->join(', ');
    }

    public function getFacility(): string
    {
        switch ($this->room->facility) {
            case 'c':
                return "Cơ sở chính";
            case '1':
                return "Cơ sở 1";
            case '2':
                return "Cơ sở 2";
            default:
                return "";
        }
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function media(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'report_media', 'reports_id', 'media_id');
    }

    public function assignment(): HasOne
    {
        return $this->hasOne(Assignment::class, 'reports_id', 'id');
    }

    public function reply(): HasOne
    {
        return $this->hasOne(Reply::class, 'reports_id', 'id');
    }

    public function equipments(): BelongsToMany
    {
        return $this->belongsToMany(Equipment::class, 'report_equipments', 'reports_id', 'equipments_id');
    }

    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class, 'rooms_id', 'id');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(ReportLog::class, 'reports_id', 'id');
    }
}
