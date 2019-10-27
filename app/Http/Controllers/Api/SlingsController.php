<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Sling;

class SlingsController extends Controller
{
    public function index()
    {
        return Sling::select('barcode')->get();
    }

    public function getSlingByBarcode($barcode)
    {
        
        
        $formData =  Sling::where('barcode',$barcode)->first();
        $formSchema =  [ 
                
            [
                'name'=> 'description',
                'input'=>'v-text-field',
                'label'=> 'Description',
                'rules'=>  'required|min:2|max:10'
                            
            ],
            [
                'name'=> 'cost_centre',
                'input'=>'v-text-field',
                'label'=> 'Cost centre',
                
                
            ],
            [
                'name'=> 'current_location',
                'input'=>'v-text-field',
                'label'=> 'Current location',
                
                
            ],  
            [
                'name'=> 'department_id',
                'input'=>'v-select',
                'label'=> 'Department',
                'items'=> [['text'=>'department 1','value'=>'1'],['text'=>'department 2','value'=>'2']],
                
                
            ]

        ];

        return ['formdata'=>$formData,'formschema'=>$formSchema];
    }
}
