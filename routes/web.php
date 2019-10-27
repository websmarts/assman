<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */



Auth::routes();
Route::get('logout','Auth\LoginController@logout'); // provide a GET logout request option 

// Site guest home
// need to be proteded by auth middleware 
Route::middleware(['guest'])->group(function () {
    Route::get('/', 'IndexController@index')->name('welcome');
});

Route::middleware(['auth'])->group(function () {
    
    Route::get('/home', 'HomeController@index')->name('home');




    
});








// Client Account
Route::get('/account', 'AccountController@index');

Route::prefix('manage')->group(function () {
    Route::get('slings', 'SlingController@index');
});
