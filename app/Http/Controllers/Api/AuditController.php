<?php

namespace App\Http\Controllers\Api;

use App\Asset;
use App\Audit;
use App\Http\Controllers\ApiController;

class AuditController extends ApiController
{


    public function getAssetByAssetId($assetid)
    {
        
        $asset = Asset::with('assettype')->where('asset_id',$assetid)->first();  
       
        return ['asset'=>$asset->toArray()];
    }

    public function update($assetid)
    {
        dd('audit update function is still a TODO');
    }

    public function store()
    {
            // Validate data
            $validatedData = $this->request->validate([
                'asset_id' => 'required'
                ]);
            // Update data
            $data = $this->request->input();
            $asset = Asset::where('asset_id',$this->request->asset_id)->first();

            // get the audit data
            $data = $this->getData($asset);

            $asset->update($data['assetdata']);
 
            $audit = Audit::create($data['auditdata']);
            
        
            return ['data'=>'success','record'=>$audit];

    }

    private function getData($asset)
    {

        $auditdata=[];
        $assetdata=[];
        $data = [];


        $auditdata['asset_id'] = $asset->id;
        
        $auditdata['client_id'] = $this->user->client_id;

        // Handle the switch inputs
        // $auditdata['quarantined'] = $this->request->quarantined === true ? 1 : 0;
        $auditdata['retire_from_service'] = $this->request->retire_from_service === true ? 1 : 0;


        $auditdata['audit_date'] = $this->convertToUtcDate($this->request->audit_date);

        $auditdata['created_by'] = $this->user->id;
        $auditdata['auditors'] = $this->request->auditors;
        $auditdata['audit_notes'] = $this->request->audit_notes;
        $auditdata['next_action'] = $this->request->next_action;
        $auditdata['condition'] = $this->request->condition;


        // Asset data
        // Handle the switch inputs
        // $assetdata['quarantined'] = $this->request->quarantined === true ? 1 : 0;
        $assetdata['retire_from_service'] = $this->request->retire_from_service === true ? 1 : 0;
        $assetdata['condition'] = $this->request->condition;
        $assetdata['next_audit_due'] = $this->request->next_audit_due;

        if($assetdata['retire_from_service']){
            $assetdata['retired_date'] = gmdate('Y-m-d');
        }

        // Combine data
        $data['auditdata'] = $auditdata;
        $data['assetdata'] = $assetdata; 


        return $data;
    }

    protected function convertToUtcDate($date)
    {
        
        $dt = \DateTime::createFromFormat('Y-m-d',$date,new \DateTimeZone($this->getTimezone())); 
        $dt->setTimeZone(new \DateTimeZone('UTC'));
        return $dt->format('Y-m-d');
    }


    protected function getTimezone()
    {
        return $this->user->client->timezone;
    }

    
    
}
