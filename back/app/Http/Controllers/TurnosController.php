<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Turnos;

class TurnosController extends Controller
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

        // Get turnos.
        $turnos_sql = Turnos::leftJoin('usuarios as paciente', 'turnos.id_paciente', '=', 'paciente.id')
            ->leftJoin('usuarios as medico', 'turnos.id_medico', '=', 'medico.id')
            // ->where('usuarios.estado', 'activo')
            ->where(function ($query) use ($search) {
                $query->where('turnos.dia', 'like', '%' . $search . '%')
                    ->orWhere('turnos.hora', 'like', '%' . $search . '%')
                    ->orWhere('turnos.estado', 'like', '%' . $search . '%')
                    ->orWhere('paciente.nombre', 'like', '%' . $search . '%')
                    ->orWhere('paciente.apellido', 'like', '%' . $search . '%')
                    ->orWhere('medico.nombre', 'like', '%' . $search . '%')
                    ->orWhere('medico.apellido', 'like', '%' . $search . '%');
            })
            ->orderby('turnos.id', 'asc')
            ->get(
                array(
                    'turnos.id',
                    'turnos.dia',
                    'turnos.hora',
                    'turnos.estado',
                    'paciente.nombre as paciente_nombre',
                    'paciente.apellido as paciente_apellido',
                    'medico.nombre as medico_nombre',
                    'medico.apellido as medico_apellido',
                )
            );

        // Get total of turnos.
        $turnos_count = sizeof($turnos_sql);

        // Get turnos by pagination.
        $turnos = [];

        // Check if offset is valid.S
        if ($offset < $turnos_count) {
            // Fill turnos according to pagination.
            for ($i = $offset; $i < $limit && $i < $turnos_count; $i++) {
                $turnos[] = $turnos_sql[$i];
            }
        } else {
            // Fill turnos with $turnos_sql.
            $turnos = $turnos_sql;
        }

        // Check if turnos are found.
        if (count($turnos) > 0) {
            // Create array of turnos.
            $turnos_filtrados = array();

            // Return dia, horario, estado, paciente_nombre, paciente_apellido, medico_nombre, medico_apellido.
            foreach ($turnos as $turno) {
                $turnos_filtrados[] = array(
                    'id'                => $turno->id,
                    'dia'               => $turno->dia,
                    'hora'              => $turno->horario,
                    'estado'            => $turno->estado,
                    'paciente_nombre'   => $turno->paciente_nombre,
                    'paciente_apellido' => $turno->paciente_apellido,
                    'medico_nombre'     => $turno->medico_nombre,
                    'medico_apellido'   => $turno->medico_apellido,
                );
            }

            // Return turnos.
            return json_encode(
                array(
                    'turnos_count' => $turnos_count,
                    'turnos'       => $turnos,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'error' => 'No turnos found.'
                )
            );
        }
    }
}
