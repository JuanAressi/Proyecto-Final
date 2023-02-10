<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use App\Models\TurnosFechas;
use App\Models\TurnosHoras;

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
        $page         = $request->input('page');
        $pagination   = $request->input('pagination');
        $search       = $request->input('search');
        $orderBy1     = $request->input('order1');
        $orderBy2     = $request->input('order2');

        // Check if $search is null.
        if ($search === null) {
            $search = '';
        }

        // If $orderBy1 contains a ',' split it and order by the 2 results.
        if ($orderBy1 !== null && strpos($orderBy1, ',') !== false) {
            $orderBy1 = explode(',', $orderBy1);
            $orderBy2 = $orderBy1[1];
            $orderBy1 = $orderBy1[0];
        }

        // Get 'Medicos'.
        $medicos_sql = Usuarios::where('usuarios.rol', 'medico')
            ->where('usuarios.estado', 'activo')
            ->where(function ($query) use ($search) {
                $query->where('usuarios.nombre', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.apellido', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.email', 'like', '%' . $search . '%')
                    ->orWhere('usuarios.dni', 'like', '%' . $search . '%');
            });

        if ($orderBy1 !== null) {
            if ($orderBy2 !== null) {
                $medicos_sql = $medicos_sql->orderby($orderBy1, 'asc')
                    ->orderby($orderBy2, 'asc');
            } else {
                $medicos_sql = $medicos_sql->orderby($orderBy1, 'asc');
            }
        } else {
            $medicos_sql = $medicos_sql->orderby('usuarios.id', 'asc');
        }

        // Get 'Medicos'.
        $medicos_sql = $medicos_sql->get();

        // Get 'Medicos' count.
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
            foreach ($medicos as $medico) {
                $medicos_filtrados[] = array(
                    'id'       => $medico->id,
                    'nombre'   => $medico->nombre,
                    'apellido' => $medico->apellido,
                    'email'    => $medico->email,
                    'dni'      => $medico->dni,
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
     * Function getById - Returns a 'Médico' from database that matches with the request.
     *
     * REVISAR ----------------------------.
     *
     * @return array - The 'Médico'.
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
     * REVISAR ----------------------------.
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
     * REVISAR ----------------------------.
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


    /**
     * Function getFechas - Get all the days that the 'Medico' has available.
     *
     * @param int $id - The id of the 'Medico'.
     *
     * @return array - The days available.
     */
    public function getFechas($id)
    {
        // Get today date.
        $today = date('d-m-Y');

        $fechas = TurnosFechas::where('id_medico', $id)
            ->where('dia', '>=', $today)
            ->get(['id', 'dia']);

        // Make a new array where the id is the key and the dia is the value.
        // $fechas = array_column($fechas->toArray(), 'dia', 'id');

        // Check if fechas are found.
        if (count($fechas) > 0) {
            // Return fechas.
            return json_encode(
                array(
                    'fechas' => $fechas,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array()
            );
        }
    }


    /**
     * Function getHoras - Get all hours that the 'Medico' has available for a given date.
     *
     * @param string $id - The id of the date in 'TurnosFechas'.
     *
     * @return array - The hours available.
     */
    public function getHoras($id)
    {
        $horas = TurnosHoras::where('id_turnos_fechas', $id)
            ->get(['hora', 'estado']);

        // Check if horas are found.
        if (count($horas) > 0) {
            // Divide the hours in 4 arrays.
            $horas = array_chunk($horas->toArray(), 5);

            // Return horas.
            return json_encode(
                array(
                    'horas' => $horas,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array()
            );
        }
    }


    /**
     * Function addAgenda - Add new availabilities to the 'Medico'.
     *
     * @param Request $request - The request object.
     *
     * @return array - The status and the message of the update.
     */
    public function addAgenda(Request $request)
    {
        $id_medico = $request->input('id_medico');
        $fechas    = $request->input('fechas');
        $horas     = $request->input('horas');

        // Loop through $fechas.
        foreach ($fechas as $fecha) {
            // Check if the date already exists.
            $fecha_exists = TurnosFechas::where('id_medico', $id_medico)
                ->where('dia', $fecha)
                ->first();

            // If the date doesn't exist, create it.
            if (!$fecha_exists) {
                $fecha = TurnosFechas::create([
                    'id_medico' => $id_medico,
                    'dia'       => $fecha,
                ]);

                // Loop through $horas.
                foreach ($horas as $hora) {
                    // Create the hour.
                    TurnosHoras::create([
                        'id_turnos_fechas' => $fecha->id,
                        'hora'             => $hora,
                        'estado'           => 'libre',
                    ]);
                }
            }
        }

        return json_encode(
            array(
                'success' => true,
                'message' => 'La agenda se ha actualizado correctamente.',
            )
        );
    }
}
