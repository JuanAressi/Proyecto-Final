<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class PacientesController extends Controller
{
    /**
     * Function getAll - Returns all users from database.
     *
     * @return array $users - An array of all users.
     */
    public function getAll(Request $request)
    {
        // Get params from request.
        $page       = $request->input('page');
        $pagination = $request->input('pagination');
        $search     = $request->input('search');

        // Check if $search is null.
        if ($search === null) {
            $search = '';
        }

        // Calculate offset.
        $offset = ($page - 1) * $pagination;

        // Calculate limit.
        $limit = $offset + $pagination;

        // Get pacientes.
        $pacientes_sql = Usuarios::leftJoin('pacientes', 'usuarios.id', '=', 'pacientes.id_usuario')
            ->where('usuarios.rol', 'paciente')
            ->where('usuarios.estado', 'activo')
            ->where(function($query) use ($search) {
                $query->where('usuarios.nombre', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.apellido', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.email', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.dni', 'like', '%' . $search . '%');
            })
            ->orderby('usuarios.id', 'asc')
            ->get();

        // Get total of pacientes.
        $pacientes_count = sizeof($pacientes_sql);

        // Get pacientes by pagination.
        $pacientes = [];

        // Check if offset is valid.
        if ($offset < $pacientes_count) {
            // Fill pacientes according to pagination.
            for ($i = $offset; $i < $limit && $i < $pacientes_count; $i++) {
                $pacientes[] = $pacientes_sql[$i];
            }
        } else {
            // Fill pacientes with $pacientes_sql.
            $pacientes = $pacientes_sql;
        }

        // Check if pacientes are found.
        if (count($pacientes) > 0) {
            // Create array of pacientes.
            $pacientes_filtrados = array();

            // Return nombre, apellido, email.
            foreach ($pacientes as $usuario) {
                $pacientes_filtrados[] = array(
                    'id'          => $usuario->id,
                    'nombre'      => $usuario->nombre,
                    'apellido'    => $usuario->apellido,
                    'email'       => $usuario->email,
                    'dni'         => $usuario->dni,
                );
            }

            // Return pacientes.
            return json_encode(
                array(
                    'pacientes_count' => $pacientes_count,
                    'pacientes'       => $pacientes,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'error' => 'No pacientes found.'
                )
            );
        }
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
