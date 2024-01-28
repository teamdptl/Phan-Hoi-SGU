<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Room extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'type', 'facility', 'qr_code', 'icon', 'extra_data'];
    protected $table = 'rooms';

    public function reports() : HasMany
    {
        return $this->hasMany(Report::class, 'rooms_id', 'id');
    }

    public function reviews() : HasMany
    {
        return $this->hasMany(Room::class, 'rooms_id', 'id');
    }

    public function equipments() : BelongsToMany
    {
        return $this->belongsToMany(Equipment::class, 'room_equipments', 'rooms_id', 'equipments_id')->withPivot('status');
    }


}
