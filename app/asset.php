<?php

namespace App;

use App\Scopes\ClientScope;
use App\Traits\storesMetadata;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    
    use storesMetadata;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'client_id',
        'asset_id',
        'vendor', 
        'vendor_part_reference', 
        'description', 
        'cost_price', 
        'site_id',
        'department_id',        
        'cost_centre', 
        'asset_type_id',
        'meta', 
        'condition',   
        'retire_from_service',
        'commissioned_date', 
        'retired_date', 
        'next_audit_due' 
    ];

    protected $casts = [
        'meta' => 'array'
    ];

   
 
    /**
     *  Returns an array of the supported keys in metadata
     */
    protected function metakeys()
    {
        return collect($this->assettype->metaschema)->pluck('name')->all();
    }

    

    public function assettype()
    {
        return $this->belongsTo('App\AssetType','asset_type_id');

    }

    public function audits()
    {
        return $this->hasMany('App\Audit');
    }

    
}
