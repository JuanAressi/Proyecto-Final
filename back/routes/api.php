<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Login.
Route::post('login', 'App\Http\Controllers\UsuariosController@LogIn');

// Users.
Route::get('users', 'App\Http\Controllers\UsuariosController@getAll');
Route::post('users', 'App\Http\Controllers\UsuariosController@addNew');
// Route::get('/', 'UsuariosController@get_all');