<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'client_id',
        'name', 
        'title',
        'email', 
        'role',
        'password',

    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        // 'client_id',
        // 'name',
        // 'title',
        // 'roles',
        // 'email',
        'password',
        'remember_token'
    ];

    public function client()
    {
        return $this->belongsTo('App\Client');
    }
}
