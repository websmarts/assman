<?php

namespace App;

use App\Scopes\ClientScope;
use Illuminate\Database\Eloquent\Model;

class AssetType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'client_id',
        'name',
        'dataschema',
        'auditschema',
        'metaschema'
    ];

    protected $casts = [
        'dataschema' => 'array',
        'auditschema' => 'array',
        'metaschema' => 'array'
    ];

    


    public function validationRules()
    {

        $dataschema = collect($this->dataschema);
        $metaschema = collect($this->metaschema);

        return $dataschema->merge($metaschema)->pluck('rules','name')->filter()->toArray();

      
    }
    
}
