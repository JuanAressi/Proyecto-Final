<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PacientesController extends Controller
{
    /**
     * Function getAll - Returns all users from database.
     *
     * @return array $users - An array of all users.
     */
    public function getAll()
    {
        $pacientes = Pacientes::orderby('id', 'asc')->select('*')->get();

        return json_encode($pacientes);
    }


    /**
     * Function getById - Returns a user by ID.
     *
     * @param int $id - The ID of the user.
     *
     * @return array $user - An array of the user.
     */
    public function getById($id)
    {
        $paciente = Pacientes::where('id', $id)->select('*')->get();

        return json_encode($paciente);
    }
}
