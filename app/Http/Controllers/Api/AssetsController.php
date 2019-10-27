<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\ApiController;
use App\Asset;
use App\AssetType;


class AssetsController extends ApiController
{

    public function index()
    {
        
        return Asset::select('asset_id')->get()->pluck('asset_id');
    }

    public function getAssetByAssetId($assetid)
    {
        
        $asset = Asset::where('client_id',$this->user->client_id)
                ->with(['audits','assettype'])->where('asset_id',$assetid)->first();  

        return ['asset'=>$asset];
    }

    public function store()
    {
        // Validate data
        $validatedData = $this->request->validate([
            'client_id'=> 'required',
            'asset_id' => 'required',
            'site_id' => 'required',
            'department_id' => 'required',
            'asset_type_id' => 'required'
            ]);

        $data = $this->process($this->request->input());
 
        $data['client_id'] = $this->user->client_id; // force assets client_id to be users client_id

        // Validate against the assetype rules
        $assettype = AssetType::find($this->request->input('asset_type_id'));
        $rules = $assettype->validationRules();
        $validatedData = $this->request->validate($rules);

        Asset::create($data); // storesMetaData Trait intercepts create method to handle metadata
        
        return ['data'=>'success','record'=>$data];

    }

    public function update( $assetid)
    {
                 
        // Pre Validate data - the rules for asset_id, site_id and department_id are not in the assettype rules
        $validatedData = $this->request->validate([
            'asset_id' => 'required',
            'site_id'=> 'required',
            'department_id' => 'required'
            ]);

  
        $asset = Asset::where('asset_id',$assetid)->first();


        // Validate against the assetype rules
        $rules = $asset->assettype->validationRules();
        $validatedData = $this->request->validate($rules);


        // Data is valid so now update model
        $data = $this->process($this->request->input());

        $asset->update($data); // storesMetaData Trait intercepts update method to process metadata
        
        return ['data'=>'success','record'=>$data];

    }

    

    private function process($data)
    {
        // Note Meta data handled by Asset model

        // Remove the ID if it exists
        unSet($data['id']);

        
        // Handle the switch inputs
        
        $switches = ['quarantined','retire_from_service'];
        foreach($switches as $switch){
            $data[$switch] = isSet($data[$switch]) ? ($data[$switch]===true ? 1 : 0) : 0;
        }
        

        // Commisioned date
        if(!$this->isValidDate($data['commissioned_date'])){
            unSet($data['commissioned_date']);
        }
        

        // Set the client_id
        $data['client_id'] = $this->user->client_id;

        return $data;
    }

    protected function isValidDate($date) 
    {
        // check length = 10 eg YYYY-MM-DD and YYYY does not start wth a zero
        return strlen($date) == 10 && substr($date,0,1 != "0");
    }

    
    
    
}
