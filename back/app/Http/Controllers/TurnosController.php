<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;
use App\Models\Turnos;
use App\Models\TurnosHoras;
use Illuminate\Support\Facades\Mail;

class TurnosController extends Controller
{
    /**
     * Function getAll - Returns all 'Turnos' from database that matches with the request.
     *
     * @param Request $request - The request object.
     *
     * @return array - Contains: 'success', 'message' and 'turno'.
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
            ->where('turnos.estado', '<>', 'eliminado')
            ->where(function ($query) use ($search) {
                $query->where('turnos.dia', 'like', '%' . $search . '%')
                    ->orWhere('turnos.hora', 'like', '%' . $search . '%')
                    ->orWhere('turnos.estado', 'like', '%' . $search . '%')
                    ->orWhere('paciente.nombre', 'like', '%' . $search . '%')
                    ->orWhere('paciente.apellido', 'like', '%' . $search . '%')
                    ->orWhere('medico.nombre', 'like', '%' . $search . '%')
                    ->orWhere('medico.apellido', 'like', '%' . $search . '%');
            })
            ->orderByRaw("STR_TO_DATE(concat(turnos.dia, ' ', turnos.hora), '%d-%m-%Y %H:%i') ASC")
            // ->orderby('turnos.id', 'asc')
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

        // Check if offset is valid.
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


    /**
     * Function getAllById - Returns a 'Turno' by ID of the 'Medico'.
     *
     * @param Request $request - The request object.
     * @param int $id - The ID of the 'Medico'.
     *
     * @return array - Contains: 'success', 'message' and 'turnos'.
     */
    public function getAllById(Request $request, $id)
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

        $turnos_sql = Turnos::leftJoin('usuarios as paciente', 'turnos.id_paciente', '=', 'paciente.id')
            ->leftJoin('usuarios as medico', 'turnos.id_medico', '=', 'medico.id')
            ->where('turnos.id_medico', $id)
            ->where('turnos.estado', '<>', 'cancelado')
            ->where('turnos.dia', '<=', date('d-m-Y'))
            ->where(function ($query) use ($search) {
                $query->where('turnos.dia', 'like', '%' . $search . '%')
                    ->orWhere('turnos.hora', 'like', '%' . $search . '%')
                    ->orWhere('turnos.estado', 'like', '%' . $search . '%')
                    ->orWhere('paciente.nombre', 'like', '%' . $search . '%')
                    ->orWhere('paciente.apellido', 'like', '%' . $search . '%')
                    ->orWhere('medico.nombre', 'like', '%' . $search . '%')
                    ->orWhere('medico.apellido', 'like', '%' . $search . '%');
            })
            ->orderByRaw("STR_TO_DATE(concat(turnos.dia, ' ', turnos.hora), '%d-%m-%Y %H:%i') ASC")
            ->get([
                'turnos.id',
                'turnos.dia',
                'turnos.hora',
                'turnos.estado',
                'paciente.nombre as paciente_nombre',
                'paciente.apellido as paciente_apellido',
            ]);

        // Get total of turnos.
        $turnos_count = sizeof($turnos_sql);

        // Get turnos by pagination.
        $turnos = [];

        // Check if offset is valid.
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


    /**
     * Function addNew - Adds a new 'Turno' to the database.
     *
     * @param Request $request - The request object.
     *
     * @return array - Contains: 'success', 'message' and 'turno'.
     */
    public function addNew(Request $request)
    {
        // Validate that there is not a 'Turno' with the same  'id_medico', 'dia' and 'hora'.
        $turno = Turnos::where('id_medico', $request->input('id_medico'))
            ->where('dia', $request->input('dia'))
            ->where('hora', $request->input('hora'))
            ->first();

        // Check if the 'Turno' was found.
        if ($turno === null) {
            $turno = Turnos::create([
                'id_paciente' => $request->input('id_paciente'),
                'id_medico'   => $request->input('id_medico'),
                'dia'         => $request->input('dia'),
                'hora'        => $request->input('hora'),
                'estado'      => 'reservado',
            ]);

            // Check if the 'Turno' was created.
            if ($turno !== null) {
                // Change the 'TurnoHora' state to 'ocupado'.
                TurnosHoras::where('id_turnos_fechas', $request->input('id_fecha_dia'))
                    ->where('hora', $request->input('hora'))
                    ->update(['estado' => 'ocupado']);

                // Get the 'Paciente' data.
                $paciente = Usuarios::where('id', $request->input('id_paciente'))
                    ->first();

                // Send email to the 'Paciente'.
                $data = array(
                    'email' => $paciente->email,
                    'name'  => $paciente->nombre . ' ' . $paciente->apellido,
                    'subject' => 'Turno reservado',
                    'bodyMessage' => 'Estimado ' . $paciente->nombre . ' ' . $paciente->apellido . ',<br><br>Su turno ha sido reservado con éxito.<br><br>Fecha: ' . $request->input('dia') . '<br>Hora: ' . $request->input('hora') . '<br><br>Saludos,<br>Equipo de MisTurnos.<br><br>',
                );

                Mail::send([], $data, function ($message) use ($data) {
                    $message->to($data['email'], $data['name']);
                    $message->subject($data['subject']);
                    $message->setBody($data['bodyMessage'], 'text/html');
                });
            }

            // Return success.
            $success = true;
            $message = 'Turno creado con éxito.';
        } else {
            // Return error.
            $success = false;
            $message = 'Ya existe un turno para el medico en la fecha y hora seleccionada';
        }

        return json_encode(
            array(
                'success' => false,
                'message' => 'Ya existe un turno para el medico en la fecha y hora seleccionada',
            )
        );
    }


    /**
     * Function update - Updates a 'Turno' in the database.
     *
     * @param Request $request - The request object.
     * @param int     $id      - The ID of the 'Turno'.
     *
     * @return array - Contains: 'success' and 'message'.
     */
    public function update(Request $request, $id)
    {
        // Get 'Turno' by id.
        $turno = Turnos::where('id', $id)
            ->first();

        // Check if the 'Turno' was found.
        if ($turno !== null) {
            // Update 'Turno' estado.
            $turno->estado = $request->input('estado');

            // Save 'Turno'.
            $turno->save();

            return json_encode(
                array(
                    'success' => true,
                    'message' => 'Turno actualizado con éxito.'
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'success' => false,
                    'message' => 'No se pudo actualizar el turno.'
                )
            );
        }
    }


    /**
     * Function delete - Deletes a 'Turno' from the database.
     *
     * @param int $id - The ID of the 'Turno'.
     *
     * @return array - Contains: 'success' and 'message'.
     */
    public function delete($id)
    {
        // Get 'Turno' by id.
        $turno = Turnos::where('id', $id)
            ->first();

        // Check if the 'Turno' was found.
        if ($turno !== null) {
            // Change status to: 'eliminado'.
            $turno->estado = 'eliminado';

            // Save 'Turno'.
            $turno->save();

            return json_encode(
                array(
                    'success' => true,
                    'message' => 'Turno eliminado con éxito.'
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'success' => false,
                    'message' => 'No se pudo eliminar el turno.'
                )
            );
        }
    }


    /**
     * Function getAllByIdPaciente - Get 2 arrays of turnos, one for dates that have passed and one for dates that have not passed.
     *
     * @param Request $request - The request object.
     * @param int     $id      - The ID of the 'Turno'.
     *
     * @return array.
     */
    public function getAllByIdPaciente(Request $request, $id)
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
            ->where('turnos.estado', '<>', 'eliminado')
            ->where('id_paciente', $id)
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
                    'medico.nombre as medico_nombre',
                    'medico.apellido as medico_apellido',
                )
            );

        // Loop through all the turnos and divide them into 2 arrays, one for dates that have passed and one for dates that have not passed.
        $turnos_pasados = [];
        $turnos_futuros = [];

        // Get current date.
        $current_date = date_create_from_format('d-m-Y', date('d-m-Y'));

        foreach ($turnos_sql as $turno) {
            // Parse $turno->dia to date object.
            $turno_date = date_create_from_format('d-m-Y', $turno->dia);

            // Check if turno date is before current date.
            if ($current_date > $turno_date) {
                // Add turno to turnos_pasados.
                $turnos_pasados[] = $turno;
            } else {
                // Add turno to turnos_futuros.
                $turnos_futuros[] = $turno;
            }
        }

        // Get total of turnos.
        $turnos_count = sizeof($turnos_futuros);

        // Get turnos by pagination.
        // $turnos = [];

        // // Check if offset is valid.
        // if ($offset < $turnos_count) {
        //     // Fill turnos according to pagination.
        //     for ($i = $offset; $i < $limit && $i <= $turnos_count; $i++) {
        //         $turnos[] = $turnos_pasados[$i];
        //     }
        // } else {
        //     // Fill turnos with $turnos_pasados.
        //     $turnos = $turnos_pasados;
        // }

        // Check if turnos are found.
        if (count($turnos_pasados) > 0 || count($turnos_futuros) > 0) {
            // Create array of turnos.
            $turnos_pasados_filtrados = array();
            $turnos_futuros_filtrados = array();

            // Return dia, horario, estado, paciente_nombre, paciente_apellido, medico_nombre, medico_apellido.
            foreach ($turnos_pasados as $turno) {
                $turnos_pasados_filtrados[] = array(
                    'id'                => $turno->id,
                    'dia'               => $turno->dia,
                    'hora'              => $turno->hora,
                    'estado'            => $turno->estado,
                    'medico_nombre'     => $turno->medico_nombre,
                    'medico_apellido'   => $turno->medico_apellido,
                );
            }

            foreach ($turnos_futuros as $turno) {
                $turnos_futuros_filtrados[] = array(
                    'id'                => $turno->id,
                    'dia'               => $turno->dia,
                    'hora'              => $turno->hora,
                    'estado'            => $turno->estado,
                    'medico_nombre'     => $turno->medico_nombre,
                    'medico_apellido'   => $turno->medico_apellido,
                );
            }

            // Return turnos.
            return json_encode(
                array(
                    'turnos_count'   => $turnos_count,
                    'turnos_pasados' => $turnos_pasados_filtrados,
                    'turnos_futuros' => $turnos_futuros_filtrados,
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
