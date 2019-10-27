<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','status','timezone'
    ];

    protected $hidden = ['updated_at','created_at'];

    public function sites()
    {
        return $this->hasMany('App\Site');
    }
}
