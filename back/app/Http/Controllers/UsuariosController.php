<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use APP\Usuarios;

class UsuariosController extends Controller {
	public function index(){
		return view('employee_data');
	}


    public function getUsers($id = 0) {
		if ($id == 0) {
			$usuarios = Usuarios::orderby('id', 'asc')->select('*')->get();
		} else {
			$usuarios = Usuarios::select('*')->where('id', $id)->get();			
		}

		// Fetch all records.
		$userData['data'] = $usuarios;

		echo json_encode($userData);

		exit;
	}
}
