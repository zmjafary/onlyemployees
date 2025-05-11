<?php

namespace App\Models;

use \Venturecraft\Revisionable\RevisionableTrait;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SurveyQuestion extends Model
{
    use SoftDeletes, RevisionableTrait, HasFactory;

    protected $fillable = [
        'survey_id',
        'question_id',
        'answer',
        'is_yes',
        'rating',
        'comment',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function additionalResponses()
    {
        return $this->hasMany(SurveyQuestionAdditionalResponse::class);
    }
}
