<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'site_id','name'
    ];

    protected $hidden = ['updated_at','created_at'];
    

    public function sites()
    {
        return $this->belongsTo('App\Site');
    }
}
