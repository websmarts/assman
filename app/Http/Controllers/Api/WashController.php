<?php

namespace App\Http\Controllers\Api;


use App\Wash;
use App\Asset;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;

class WashController extends ApiController
{


    public function washes($date)
    {
        
        $washes = $this->washlist($date);

        return ['records'=>$washes];
    }

    public function store()
    {     
        $this->request->validate([ 
            'asset_id'=> 'required',
            'washdate' => 'required'
            ]
        );
        
        // Okay it is a valid request
        $asset = Asset::where('asset_id',$this->request->asset_id)->first();


        $data = [
            'asset_id' =>$asset->asset_id,
            'client_id' =>$asset->client_id,
            'washdate' =>$this->request->washdate,
            'washcount' =>$asset->meta['wash_count'] + 1,
            'condition' => $asset->condition,
            'quarantined' => $asset->meta['quarantined']
        ];

        // If wash exists for today then return
        if($this->isWashRecorded($data['asset_id'],$data['washdate'])){
            return ['data'=>'duplicate record','record'=>$data];
        }

        

        $wash = Wash::create($data);// new wash record

        $asset->update([
            'wash_count'=>$asset->meta['wash_count'] + 1,
            'last_washed_date'=>$data['washdate']
            ]); // increment asset.washcount and updat last washed date



        return ['data'=>'success','records'=>$this->washlist($data['washdate'])];
    }

    protected function isWashRecorded($assetId,$date){

        return  Wash::where('client_id',$this->user->client_id)
                    ->where('asset_id',$assetId)
                    ->whereDate('washdate','=', $date)
                    ->first();

    }

    protected function washlist($date)
    {
        return DB::table('washes')
           ->join('assets', 'washes.asset_id', '=', 'assets.asset_id')
           ->where('washes.client_id','=',$this->user->client_id)
           ->whereDate('washdate','=', $date)
           ->select('washes.*', 'assets.description as description')
           ->get();

    }
}
