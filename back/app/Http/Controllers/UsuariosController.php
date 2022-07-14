<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller {
	public function get_all(Request $request) {
		$users = array(
			'id' => '1',
			'nombre' => 'juan',
			'apellido' => 'aressi'
		);

        // $return = Usuarios::query();
		$users = Usuarios::orderby('id', 'asc')->select('*')->get(); 
      
		// // Fetch all records
		// $response['data'] = $users;
	
		// return response()->json($response);
		return json_encode( $users );
    }
}
