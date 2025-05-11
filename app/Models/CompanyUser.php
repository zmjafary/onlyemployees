<?php

namespace App\Models;
use \Venturecraft\Revisionable\RevisionableTrait;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyUser extends Pivot
{
    use SoftDeletes, RevisionableTrait, HasFactory;

    protected $fillable = [
        'company_id',
        'user_id',
        'department_id',
        'start_date',
        'end_date',
        'rating',
        'overall_experience',
        'is_active',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
 
    public function user()
    {
        return $this->belongsTo(User::class);
    }
 
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
