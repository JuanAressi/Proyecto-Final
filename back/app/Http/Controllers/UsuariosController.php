<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller
{
    /**
    * Function getAll - Returns all users from database.
    *
    * @return array $users - An array of all users.
    */
    public function getAll()
    {
        $users = Usuarios::orderby('id', 'asc')->select('*')->get();

        return json_encode($users);
    }


    /**
    * Function add_new - Add new user to database.
    *
    * @return array - Returns the state of addition.
    */
    public function addNew(Request $request)
    {
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = $request->input('password');
    }
}
