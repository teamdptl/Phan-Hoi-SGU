<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name', 'description', 'icon'];

    public function users() : BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_role', 'roles_id', 'users_id');
    }
}
