<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use APP\Usuarios;

class UsuariosController extends Controller {
	public function get_all(Request $request) {
		$users = Usuarios::orderby('id', 'asc')->select('*')->get(); 
      
		// Fetch all records
		$response['data'] = $users;
	
		return response()->json($response);
    }
}
