<?php

namespace App\Models;
use \Venturecraft\Revisionable\RevisionableTrait;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

class CityCompany extends Pivot
{
    use SoftDeletes, RevisionableTrait, HasFactory;

    protected $fillable = [
        'company_id',
        'city_id',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
 
    public function city()
    {
        return $this->belongsTo(City::class);
    }
}
