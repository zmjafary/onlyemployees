<?php

namespace App\Models;
use \Venturecraft\Revisionable\RevisionableTrait;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use SoftDeletes, RevisionableTrait, HasFactory;

    protected $fillable = [
        'name',
        'is_active',
    ];

    public function companies()
    {
        return $this->belongsToMany(Company::class)->using(CompanyRole::class);
    }
}
