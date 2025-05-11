<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyQuestionAdditionalResponse extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_question_id',
        'response',
    ];

    public function surveyQuestion()
    {
        return $this->belongsTo(SurveyQuestion::class);
    }
}
