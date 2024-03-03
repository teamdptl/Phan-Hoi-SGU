<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\RoleEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    #

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function isAdmin()
    {
        return $this->roles->contains('id', RoleEnum::ADMIN->value);
    }

    public function isWorker()
    {
        return $this->roles->contains('id', RoleEnum::WORKER->value);
    }

    public function isInspector()
    {
        return $this->roles->contains('id', RoleEnum::INSPECTOR->value);
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_role', 'users_id', 'roles_id');
    }

    public function reports(): HasMany
    {
        return $this->hasMany(Report::class, 'users_id', 'id');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class, 'users_id', 'id');
    }

    // Relation này dùng cho nhân viên kỹ thuật, lấy các assignment được giao
    public function jobs(): HasMany
    {
        return $this->hasMany(Assignment::class, 'worker_id', 'id');
    }

    // Relation này dùng để lấy report cho worker
    public function reportWorker(): HasManyThrough
    {
        return $this->hasManyThrough(Report::class, Assignment::class, 'worker_id', 'id', 'id', 'reports_id');
    }

    // Relation này dùng cho nhân viên kỹ thuật, lấy các phản hồi đã hoàn thành
    public function replies(): HasMany
    {
        return $this->hasMany(Reply::class, 'users_id', 'id');
    }

    // Relation này dùng cho manager, lấy assignment đã giao
    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class, 'manager_id', 'id');
    }


}
