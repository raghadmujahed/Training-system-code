<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioEntry extends Model
{
    protected $fillable = [
        'portfolio_id',
        'title',
        'description',
        'file_path',
    ];

    public function portfolio()
    {
        return $this->belongsTo(StudentPortfolio::class, 'portfolio_id');
    }

    public function attachments()
    {
        return $this->morphMany(Attachment::class, 'attachable');
    }
}