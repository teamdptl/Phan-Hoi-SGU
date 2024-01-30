<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReportLog extends Model
{
    use HasFactory;

    protected $fillable = ['content'];
    protected $table = 'report_logs';

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'users_id', 'id');
    }
}
