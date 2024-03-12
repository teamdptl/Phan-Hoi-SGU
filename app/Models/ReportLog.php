<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportLog extends Model
{
    use HasFactory;

    protected $fillable = ['content', 'status'];
    protected $table = 'report_logs';

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }

    public function report(): BelongsTo
    {
        return $this->belongsTo(Report::class, 'reports_id', 'id');
    }
}
