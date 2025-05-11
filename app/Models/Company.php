<?php

namespace App\Models;

use \Venturecraft\Revisionable\RevisionableTrait;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Approval\Traits\RequiresApproval;

class Company extends Model
{
    use SoftDeletes, RevisionableTrait, HasFactory, RequiresApproval;

    protected $fillable = [
        'name',
        'about',
        'website',
        'photo',
        'address',
        'phone',
        'email',
        'industry_id',
        'linkedin'
    ];


    protected $updateWhenApproved = true;

    protected function requiresApprovalWhen(array $modifications): bool
    {
        return !auth()->user()->is_admin ? true : false;
    }

    public function cities()
    {
        return $this->belongsToMany(City::class)->using(CityCompany::class);
    }

    public function departments()
    {
        return $this->belongsToMany(Department::class)->using(CompanyDepartment::class);
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class)->using(CompanyRole::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->using(CompanyUser::class);
    }

    public function companyCities()
    {
        return $this->hasMany(CityCompany::class);
    }

    public function companyDepartments()
    {
        return $this->hasMany(CompanyDepartment::class);
    }

    public function companyRoles()
    {
        return $this->hasMany(CompanyRole::class);
    }

    public function companyUsers()
    {
        return $this->hasMany(CompanyUser::class);
    }

    public function industry()
    {
        return $this->belongsTo(Industry::class);
    }
    public function surveys()
    {
        return $this->hasMany(Survey::class);
    }
}
