<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use App\Models\Pacientes;

class PacientesController extends Controller
{
    /**
     * Function getAll - Returns all Pacientes from database that matchs with the request.
     *
     * @return array - An array of all users.
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
     * Function addNew - Add a new Paciente to database.
     *
     * @param Request $request - The request object.
     *
     * @return array $user - The new user.
     */
    public function addNew(Request $request)
    {
        $obra_social = $request->input('obra_social');

        $usuario = Usuarios::create([
            'nombre'           => $request->input('nombre'),
            'apellido'         => $request->input('apellido'),
            'email'            => $request->input('email'),
            'contraseña'       => md5($request->input('dni')),
            'fecha_nacimiento' => $request->input('fecha_nacimiento'),
            'dni'              => $request->input('dni'),
            'telefono'         => $request->input('telefono'),
            'genero'           => $request->input('genero'),
            'rol'              => 'paciente',
            'estado'           => 'activo',
        ]);

        $paciente = Pacientes::create([
            'id_usuario'         => $usuario->id,
            'numero_obra_social' => $obra_social,
        ]);

        return json_encode(
            array(
                'success' => true,
                'message' => 'El Paciente se ha creado correctamente.',
            )
        );
    }
}
