<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ApiController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $user;
    protected $request;

    public function __construct(Request $request)
    {
        $this->middleware(function ($request, $next) {

            $this->user = $request->user('api');
            $this->request = $request;       

            return $next($request);
        });
         
           
        
    }
}
