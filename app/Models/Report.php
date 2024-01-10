<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    // Other có nghĩa là thiết bị khác
    // Location dùng locate bằng gps (sẽ làm sau)
    protected $fillable = ['other', 'description'];
}
