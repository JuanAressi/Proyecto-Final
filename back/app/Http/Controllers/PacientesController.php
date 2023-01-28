<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use App\Models\Pacientes;
use App\Models\HistoriaClinica;

class PacientesController extends Controller
{
    /**
     * Function getAll - Returns all Pacientes from database that matches with the request.
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
            ->where(function ($query) use ($search) {
                $query->where('usuarios.nombre', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.apellido', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.email', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.dni', 'like', '%' . $search . '%');
            })
            ->orderby('usuarios.id', 'asc')
            ->get();

        // Get 'Pacientes' count.
        $pacientes_count = sizeof($pacientes_sql);

        // Get pacientes by pagination.
        $pacientes = [];

        // Calculate offset and limit.
        if ($page === null && $pagination === null) {
            $offset = 0;
            $limit  = $pacientes_count;
        } else {
            $offset = ($page - 1) * $pagination;
            $limit  = $offset + $pagination;
        }

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
                    'id'                 => $usuario->id,
                    'nombre'             => $usuario->nombre,
                    'apellido'           => $usuario->apellido,
                    'email'              => $usuario->email,
                    'fecha_nacimiento'   => $usuario->fecha_nacimiento,
                    'genero'             => $usuario->genero,
                    'dni'                => $usuario->dni,
                    'telefono'           => $usuario->telefono,
                    'obra_social'        => $usuario->obra_social,
                    'numero_obra_social' => $usuario->numero_obra_social,
                    'antecedentes'       => $usuario->antecedentes,
                    'alergias'           => $usuario->alergias,
                );
            }

            // Return pacientes.
            return json_encode(
                array(
                    'pacientes_count' => $pacientes_count,
                    'pacientes'       => $pacientes_filtrados,
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
        $success = false;
        $message = '';

        // Validate that the email is unique or is the same.
        $email = Usuarios::where('email', $request->input('email'))
            ->where('id', '!=', $request->input('id'))
            ->first();

        // Check if email is unique.
        if ($email) {
            // Return error.
            return json_encode(
                array(
                    'success' => false,
                    'message' => 'El email ya se encuentra registrado.',
                    'field'   => 'email',
                )
            );
        }

        // Validate that the dni is unique or is the same.
        $dni = Usuarios::where('dni', $request->input('dni'))
            ->where('id', '!=', $request->input('id'))
            ->first();

        // Check if dni is unique.
        if ($dni) {
            // Return error.
            return json_encode(
                array(
                    'success' => false,
                    'message' => 'El DNI ya se encuentra registrado.',
                    'field'   => 'dni',
                )
            );
        }

        $usuario = Usuarios::where('id', $request->input('id'))
            ->update([
                'nombre'             => $request->input('nombre'),
                'apellido'           => $request->input('apellido'),
                'email'              => $request->input('email'),
                'fecha_nacimiento'   => $request->input('fecha_nacimiento'),
                'genero'             => $request->input('genero'),
                'dni'                => $request->input('dni'),
                'telefono'           => $request->input('telefono'),
            ]);

        // Check for errors.
        if ($usuario) {
            $paciente = Pacientes::where('id_usuario', $request->input('id'))
                ->update([
                    'obra_social'        => $request->input('obra_social'),
                    'numero_obra_social' => $request->input('numero_obra_social'),
                ]);

            // Check for errors.
            if ($paciente) {
                // Return success.
                $success = true;
                $message = 'El Paciente se ha actualizado correctamente.';
            } else {
                // Return error.
                $success = false;
                $message = 'El Paciente no se ha podido actualizar.';
            }
        } else {
            // Return error.
            $success = false;
            $message = 'El Paciente no se ha podido actualizar.';
        }

        // Return response.
        return json_encode(
            array(
                'success' => true,
                'message' => 'El Paciente se ha actualizado correctamente.',
            )
        );
    }


    /**
     * Function getHistoriaClinica - Returns all the records of the 'historia_clinica' table that matches with the user.
     *
     * @param Request $request - The request object.
     *
     * @return array - The records of the 'historia_clinica' table.
     */
    public function getHistoriaClinica(Request $request)
    {
        // Get historia_clinica.
        $historia_clinica = HistoriaClinica::leftJoin('usuarios', 'id_medico', '=', 'usuarios.id')
            ->where('id_paciente', $request->input('id'))
            ->orderBy('fecha', 'desc')
            ->get(['fecha', 'motivo_consulta', 'diagnostico', 'nombre', 'apellido']);

        // Check if historia_clinica is found.
        if ($historia_clinica) {
            // Return historia_clinica.
            return json_encode(
                array(
                    'success'          => true,
                    'historia_clinica' => $historia_clinica,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'success' => false,
                    'error'   => 'Historia Clinica not found.'
                )
            );
        }
    }
}
