<?php

namespace App\Http\Controllers\Api;

use App\Asset;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;


class AuditsController extends ApiController
{
    
    public function index()
    {
        
        $cutoffDate = Carbon::now();
        
        
        $assets = Asset::where('assets.client_id',$this->user->client_id)
                        ->whereNotNull('next_audit_due')
                        ->where('retire_from_service',0)
                        ->whereDate('next_audit_due','<', $cutoffDate)
                        ->leftJoin('asset_types','assets.asset_type_id','=','asset_types.id')
                        ->leftJoin('sites','assets.site_id','=','sites.id')
                        ->leftJoin('departments','assets.department_id','=','departments.id')
                        ->get([
                            'asset_types.name as type',
                            'sites.name as site',
                            'departments.name as department',
                            'assets.*']);

        foreach($assets as $asset) {

            $res = DB::table('audits')
                            ->select( 'meta->audit_date as audit_date')
                            ->where([
                                ['client_id',"=",$this->user->client_id],
                                ['asset_id',"=", $asset->id]
                            ])
                            ->orderBy('audit_date','desc')
                            ->limit(1)
                            ->first();

                        
            
                                
            if($res){
                $asset->last_audit_date = $res->audit_date;//->toFormattedDateString();
            }
            
        }

        return ['items'=>$assets];
    }

    
}
