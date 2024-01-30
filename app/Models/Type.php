<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Type extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'icon'];
    protected $table = 'types';

    public function equipments() : HasMany
    {
        return $this->hasMany(Equipment::class, 'types_id', 'id');
    }
}
