<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('slings', 'Api\SlingsController@index');
// Route::get('sling/{barcode}', 'Api\SlingsController@getSlingByBarcode');

Route::group( ['middleware'=>['auth:api']], function(){

    Route::get('assets', 'Api\AssetsController@index');
    Route::get('asset/{assetid}', 'Api\AssetsController@getAssetByAssetId');
    Route::post('asset/','Api\AssetsController@store');
    Route::put('asset/{assetid}', 'Api\AssetsController@update');

    
    Route::get('audit/{assetid}', 'Api\AuditController@getAssetByAssetId');
    Route::post('audit/', 'Api\AuditController@store');
    Route::put('audit/{assetid}', 'Api\AuditController@update');

    Route::get('audits/', 'Api\AuditsController@index');

    Route::get('washes/{date}', 'Api\WashController@washes');
    Route::post('washes/', 'Api\WashController@store');

    Route::get('reports/', 'Api\ReportsController@index');



});



