<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Backup extends Model
{
    protected $fillable = [
        'user_id',
        'type',
        'name',
        'file_path',
        'size',
        'status',
        'notes',
    ];

    /**
     * المستخدم الذي أنشأ النسخة الاحتياطية
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}