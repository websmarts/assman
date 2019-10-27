<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Asset;
use App\AssetType;


class AssetTypesController extends ApiController
{
    public function index()
    {
        return AssetType::where('client_id',$this->user->client_id)->get();
    }

    public function getAssetByAssetId($assetId)
    {
        
        $asset = Asset::with('assettype')->where('asset_id',$assetId)->first();  
       
        return ['asset'=>$asset->toArray()];
    }

    public function update( $assetid)
    {
            // Validate data
            $validatedData = $this->request->validate([
                'asset_id' => 'required',
                'body' => 'required'
                ]);
            // Update data
            $asset = Asset::where('asset_id',$assetid)->first();

            $data = $this->transform($asset);

            $asset->update($data);
            
            return ['data'=>'success','record'=>$data];

    }

    private function transform($asset)
    {

        // Transform the form data into suitable format
        // for model update or save
        $data = $this->request->input();


        
        // Remove the ID
        unSet($data['id']);

        // Handle the switch inputs
        $data['quarantined'] = $data['quarantined']===true ? 1 : 0;
        $data['retire_from_service'] = $data['retire_from_service']===true ? 1 : 0;

        // update any meta data
        // The meta field keys are stored in the asset_type table
        //$assetType = AssetType::find($data['asset_type_id']);




        // dd($asset);
        $metadata = $asset->meta;

        $metakeys = $asset->atype->metakeys;

        if(is_array($metakeys) && count($metakeys)){
            foreach($metakeys as $input){
                if(isSet($data[$input])){
                    $metadata[$input] = $data[$input];
                }
            }
            $data['meta'] = $metadata;
        }
        

        return $data;
    }
}
