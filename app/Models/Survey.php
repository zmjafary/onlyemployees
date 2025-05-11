<?php

namespace App\Models;
use \Venturecraft\Revisionable\RevisionableTrait;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Survey extends Model
{
    use SoftDeletes, RevisionableTrait, HasFactory;

    protected $fillable = [
        'user_id',
        'company_id',
        'city_id',
        'role_id',
        'department_id',
        'is_anonymous',
        'is_employed',
        'employed_from_date',
        'employed_to_date',
        'overall_rating',
        'review',
        'last_answered'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function department()
    {
        return $this->belongsTo(Company::class);
    }

    public function surveyQuestions()
    {
        return $this->hasMany(SurveyQuestion::class);
    }
}
