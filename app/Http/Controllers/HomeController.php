<?php

namespace App\Http\Controllers;

use App\Asset;


use App\Client;
use App\AssetType;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;

class HomeController extends Controller
{
    protected $user;
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');


    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {  
        
        $user = auth()->user();
        $clientdata = $this->clientdata();
        $refdata = $this->referenceData();
        $assetids = $this->getAssetIds();

        
        return view('home',compact('clientdata','refdata','assetids','user'));
    }

    protected function clientdata()
    {
        
        return Client::where('id',auth()->user()->client_id)->with('sites.departments')->first();
    }

    protected function referenceData()
    {
        
        $refdata = [];

        // $refdata['condition_options'] = $this->getConditionOptions();
        $refdata['asset_types'] = $this->getAssetTypes();
        $refdata['user'] = auth()->user();
        $refdata['audits_due_count'] = $this->auditsDueCount();
        
        
        return $refdata;
        
    }


    protected function auditsDueCount() 
    {
        
        $cutoffDate = Carbon::now();
        $user = auth()->user();
        
        return Asset::whereNotNull('next_audit_due')
                        ->where('retire_from_service', 0)
                        ->whereDate('next_audit_due','<=', $cutoffDate)
                        ->count();
        
    }
    
    protected function getAssetTypes()
    {
        $col =  AssetType::get();

        return $col->keyBy('id')->toArray();
    }

    protected function getAssetIds()
    {
        $assetIds = Asset::select('asset_id')
                    //->where('client_id',auth()->user()->client_id)
                    ->orderBy('asset_id','ASC')
                    ->get()
                    ->pluck('asset_id')
                    ->all();

        return $assetIds;
    }
}
