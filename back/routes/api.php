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
Route::post('login', 'App\Http\Controllers\UsuariosController@logIn');

// Usuarios.
Route::get('usuarios', 'App\Http\Controllers\UsuariosController@getAll');
Route::post('usuarios', 'App\Http\Controllers\UsuariosController@addNew');
Route::put('usuarios/{id}', 'App\Http\Controllers\UsuariosController@update');
Route::delete('usuarios/{id}', 'App\Http\Controllers\UsuariosController@delete');

// Pacientes.
Route::get('pacientes', 'App\Http\Controllers\PacientesController@getAll');
Route::get('pacientes/{id}', 'App\Http\Controllers\PacientesController@getById');
Route::post('pacientes', 'App\Http\Controllers\PacientesController@addNew');
Route::put('pacientes/{id}', 'App\Http\Controllers\PacientesController@update');
Route::get('pacientes/{id}/historia_clinica', 'App\Http\Controllers\PacientesController@getHistoriaClinica');

// Medicos.
Route::get('medicos', 'App\Http\Controllers\MedicosController@getAll');
Route::get('medicos/{id}/fechas', 'App\Http\Controllers\MedicosController@getFechas');
Route::get('medicos/{fecha}/horas', 'App\Http\Controllers\MedicosController@getHoras');
Route::post('medicos/agenda', 'App\Http\Controllers\MedicosController@addAgenda');

// Turnos.
Route::get('turnos', 'App\Http\Controllers\TurnosController@getAll');
Route::post('turnos', 'App\Http\Controllers\TurnosController@addNew');
Route::put('turnos/{id}', 'App\Http\Controllers\TurnosController@update');
