<?php

namespace App\Models;
use \Venturecraft\Revisionable\RevisionableTrait;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Question extends Model
{
    use SoftDeletes, RevisionableTrait, HasFactory;

    protected $fillable = [
        'question_regular',
        'question_meme',
        'favour_gif',
        'against_gif',
        'is_active',
        'topic_id',
        'needs_additional_responses',
    ];

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
