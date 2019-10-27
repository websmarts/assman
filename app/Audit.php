<?php

namespace App;

use App\AssetType;
use App\Scopes\ClientScope;
use App\Traits\storesMetadata;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    use storesMetadata;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'asset_id',
        'client_id',
        'created_by',
        'meta'
    ];

    protected $casts = [
        'meta' => 'array'
    ];

    

    
    // public function saveWithMetaData($data,$metakeys)
    // {
    //     $this->asset_type_id = $assetTypeId;

    //     $metaFieldName = $this->metaFieldName();

    //     if(isSet($data[$metaFieldName])){// nothing more to do if metafield is already set in data
    //         $this->meta = $data[$metaFieldName];
    //         return; 
    //     }
        
    //     $this->setMetaData($data); // sets the model metadata 

    //     $this->save(); // save again - now with metadata

    // }

    // public function setMetaData($data)
    // {
        
    //     if(is_array($this->meta)){
    //         $metadata=$this->meta;
    //     } else {
    //         $metadata = [];
    //     }

    //     $metakeys = $this->metakeys();

    //     // overwrite any current metadata if
    //     // the data supplied has a key matching one of
    //     // the models metakeys       
    //     foreach ($metakeys as $metakey) {
    //         if(isSet($data[$metakey])){
    //             $metadata[$metakey] = $data[$metakey];              
    //         } 
    //     };


    //     $this->meta = $metadata;

    // }

    protected function metakeys()
    {
        $asset = Asset::where('id',$this->asset_id)->first();

        return collect($asset->assettype->auditschema)->pluck('name')->all();
    }


    

    

    public function asset()
    {
        return $this->belongsTo('App\Asset');
    }
}
