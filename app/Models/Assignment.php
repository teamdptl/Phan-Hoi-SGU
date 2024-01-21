<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Assignment extends Model
{
    use HasFactory;

    protected $fillable = ['note', 'worker_id', 'manager_id', 'reports_id'];

    public function report() : BelongsTo
    {
        return $this->belongsTo(Report::class, 'reports_id', 'id');
    }

    public function worker() : BelongsTo
    {
        return $this->belongsTo(User::class, 'worker_id', 'id');
    }

    public function manager() : BelongsTo
    {
        return $this->belongsTo(User::class, 'manager_id', 'id');
    }
}
