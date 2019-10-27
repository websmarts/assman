<?php

namespace App\Http\Controllers;

class SlingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Show the Slings App page
        return view('slings.index');
    }

}
