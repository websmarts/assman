<?php

namespace App\Http\Controllers\Api;


use App\Asset;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;

class ReportsController extends ApiController
{
    

    public function index()
    {
        $data = [
            'auditsdue' => $this->auditsDue(),
            'auditsOverdue30' => $this->auditsDue(30),
            'auditsdone'=> $this->auditsDone(),
            'assetcount' =>$this->assetCount()

        ];
       
        
        
        return ['data'=>$data];
    }

    protected function auditsDue($days = 0)
    {
        $now = Carbon::now();

        $now->subDays($days);

        
        return Asset::where('client_id',$this->user->client_id)
                    ->whereNotNull('next_audit_due')
                    ->whereDate('next_audit_due', '<=', $now)
                    ->count();
    }
    
    protected function auditsDone()
    {
        // return Audit::where('client_id',$this->user->client_id)->count();

        $res = DB::table('audits')
                    ->leftJoin('assets','audits.asset_id','=','assets.asset_id')
                    ->where('assets.client_id',$this->user->client_id)
                    ->count();
        return $res;
    }

    protected function assetCount()
    {
        return Asset::where('client_id',$this->user->client_id)->count();
    }
}
