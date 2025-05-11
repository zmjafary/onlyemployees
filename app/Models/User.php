<?php

namespace App\Models;
use \Venturecraft\Revisionable\RevisionableTrait;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Approval\Traits\ApprovesChanges;

class User extends Authenticatable
{
    use HasFactory, Notifiable, ApprovesChanges;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'photo',
        'linkedin'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }


    protected function authorizedToApprove(\Approval\Models\Modification $mod) : bool
    {
        return $this->is_admin ? true : false;
    }

    protected function authorizedToDisapprove(\Approval\Models\Modification $mod) : bool
    {
        return $this->is_admin ? true : false;
    }

    public function companies()
    {
        return $this->hasManyThrough(Company::class, CompanyUser::class);
    }

    public function surveys()
    {
        return $this->hasMany(Survey::class);
    }
}
