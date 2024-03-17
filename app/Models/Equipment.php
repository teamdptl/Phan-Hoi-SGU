<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Equipment extends Model
{
    use HasFactory, SoftDeletes;

    protected $dates = ['deleted_at'];
    protected $table = 'equipments';
    protected $fillable = ['name', 'description', 'icon'];

    public function reports() : BelongsToMany
    {
        return $this->belongsToMany(Report::class, 'report_equipments', 'equipments_id', 'reports_id');
    }

    public function rooms() : BelongsToMany
    {
        return $this->belongsToMany(Room::class, 'room_equipments', 'equipments_id', 'rooms_id')->withPivot('status');
    }

    public function type() : BelongsTo
    {
        return $this->belongsTo(Type::class, 'types_id', 'id');
    }
}
