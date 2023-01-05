<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use App\Models\Medicos;

class MedicosController extends Controller
{
    /**
     * Function getAll - Returns all 'Medicos' from database that matches with the request.
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

        // Get medicos.
        $medicos_sql = Usuarios::leftJoin('medicos', 'usuarios.id', '=', 'medicos.id_usuario')
            ->where('usuarios.rol', 'medico')
            ->where('usuarios.estado', 'activo')
            ->where(function ($query) use ($search) {
                $query->where('usuarios.nombre', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.apellido', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.email', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.dni', 'like', '%' . $search . '%');
            })
            ->orderby('usuarios.id', 'asc')
            ->get();

        // Get total of medicos.
        $medicos_count = sizeof($medicos_sql);

        // Get 'Medicos' by pagination.
        $medicos = [];

        // Calculate offset and limit.
        if ($page === null && $pagination === null) {
            $offset = 0;
            $limit  = $medicos_count;
        } else {
            $offset = ($page - 1) * $pagination;
            $limit  = $offset + $pagination;
        }

        // Check if offset is valid.
        if ($offset < $medicos_count) {
            // Fill medicos according to pagination.
            for ($i = $offset; $i < $limit && $i < $medicos_count; $i++) {
                $medicos[] = $medicos_sql[$i];
            }
        } else {
            // Fill medicos with $medicos_sql.
            $medicos = $medicos_sql;
        }

        // Check if medicos are found.
        if (count($medicos) > 0) {
            // Create array of medicos.
            $medicos_filtrados = array();

            // Return nombre, apellido, email.
            foreach ($medicos as $usuario) {
                $medicos_filtrados[] = array(
                    'id'       => $usuario->id,
                    'nombre'   => $usuario->nombre,
                    'apellido' => $usuario->apellido,
                    'email'    => $usuario->email,
                    'dni'      => $usuario->dni,
                );
            }

            // Return medicos.
            return json_encode(
                array(
                    'medicos_count' => $medicos_count,
                    'medicos'       => $medicos,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'error' => 'No medicos found.'
                )
            );
        }
    }


    /**
     * Function getById - Returns a Paciente from database that matches with the request.
     *
     * @return array - The Paciente.
     */
    public function getById(Request $request, $id)
    {
        // Get paciente.
        $paciente = Usuarios::leftJoin('pacientes', 'usuarios.id', '=', 'pacientes.id_usuario')
            ->where('usuarios.rol', 'paciente')
            ->where('usuarios.estado', 'activo')
            ->where('usuarios.id', $id)
            ->first();

        // Check if paciente is found.
        if ($paciente) {
            // Return paciente.
            return json_encode(
                array(
                    'success'  => true,
                    'paciente' => $paciente,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'success' => false,
                    'error'   => 'Paciente not found.'
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
            'numero_obra_social' => $request->input('obra_social'),
        ]);

        return json_encode(
            array(
                'success' => true,
                'message' => 'El Paciente se ha creado correctamente.',
            )
        );
    }


    /**
     * Function update - Update a Paciente from database.
     *
     * @param Request $request - The request object.
     *
     * @return array - The status and the message of the update.
     */
    public function update(Request $request)
    {
        $usuario = Usuarios::where('id', $request->input('id'))
            ->update([
                'nombre'           => $request->input('nombre'),
                'apellido'         => $request->input('apellido'),
                'email'            => $request->input('email'),
                'fecha_nacimiento' => $request->input('fecha_nacimiento'),
                'dni'              => $request->input('dni'),
                'telefono'         => $request->input('telefono'),
                'genero'           => $request->input('genero'),
            ]);

        $paciente = Pacientes::where('id_usuario', $request->input('id'))
            ->update([
                'numero_obra_social' => $request->input('obra_social'),
            ]);

        return json_encode(
            array(
                'success' => true,
                'message' => 'El Paciente se ha actualizado correctamente.',
            )
        );
    }
}
