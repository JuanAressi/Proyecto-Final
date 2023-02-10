<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Usuarios;
use App\Models\Turnos;

class ReportesController extends Controller
{
    /**
     * Function createHistoriaClinica - Get all the 'Pacientes' that has a record in 'historia_clinica'.
     *
     * @param mixed $id - The 'id' of the 'Paciente'.
     *
     * @return void
     */
    public function createHistoriaClinica($id)
    {
        // Get all 'Pacientes' that has a record in 'historia_clinica'.
        $pacientes = Usuarios::leftJoin('pacientes', 'pacientes.id_usuario', 'usuarios.id')
            ->leftJoin('historia_clinica', 'historia_clinica.id_paciente', 'usuarios.id')
            ->leftJoin('usuarios as medicos', 'medicos.id', 'historia_clinica.id_medico')
            ->where('usuarios.id', $id)
            ->where('historia_clinica.id_paciente', '!=', '')
            ->where('historia_clinica.estado', '<>', 'eliminada')
            ->orderBy('historia_clinica.id_paciente', 'asc')
            ->get(['usuarios.nombre as paciente_nombre', 'usuarios.apellido as paciente_apellido', 'usuarios.fecha_nacimiento', 'usuarios.genero', 'usuarios.dni', 'usuarios.telefono', 'pacientes.obra_social', 'pacientes.numero_obra_social', 'pacientes.antecedentes', 'pacientes.alergias', 'medicos.nombre as medico_nombre', 'medicos.apellido as medico_apellido', 'historia_clinica.fecha', 'historia_clinica.motivo_consulta', 'historia_clinica.diagnostico']);

        // Check if there is any record.
        if (count($pacientes) > 0) {
            $success = true;
            $message = 'Se está generando el reporte y en breve se descargará.';
        } else {
            $success = false;
            $message = 'No se encontraron registros.';
        }

        return json_encode(
            array(
                'success' => $success,
                'message' => $message,
                'data'    => $pacientes
            )
        );
    }


    /**
     * Function createTurnosProgramados - Get all the 'Turnos'.
     *
     * @param Request $request - The request object.
     */
    public function createTurnosProgramados(Request $request)
    {
        // Get values from the request.
        $date_start  = $request->input('fechaDesde');
        $date_finish = $request->input('fechaHasta');
        $id_medico   = $request->input('medico');

        // Parse the dates.
        $date_start  = $date_start ? date('d-m-Y', strtotime($date_start)) : null;
        $date_finish = $date_finish ? date('d-m-Y', strtotime($date_finish)) : null;

        // $turnos_por_día = Turnos::selectRaw('dia,
        //     SUM(CASE WHEN estado = "reservado" THEN 1 ELSE 0 END) as reservados,
        //     SUM(CASE WHEN estado = "cancelado" THEN 1 ELSE 0 END) as cancelados,
        //     SUM(CASE WHEN estado = "confirmado" THEN 1 ELSE 0 END) as confirmados,
        //     SUM(CASE WHEN estado = "concretado" THEN 1 ELSE 0 END) as concretados')
        //     ->when($date_start, function ($query) use ($date_start) {
        //         return $query->whereRaw("dia >= STR_TO_DATE(?, '%d-%m-%Y')", [$date_start]);
        //     })
        //     ->when($date_finish, function ($query) use ($date_finish) {
        //         return $query->whereRaw("dia <= STR_TO_DATE(?, '%d-%m-%Y')", [$date_finish]);
        //     })
        //     ->when($id_medico, function ($query) use ($id_medico) {
        //         return $query->where('id_medico', $id_medico);
        //     })
        //     ->groupBy('dia')
        //     ->orderByRaw('STR_TO_DATE(dia, "%d-%m-%Y") DESC')
        //     ->get();

        $query = "
            SELECT usuarios.id, usuarios.apellido, usuarios.nombre, turnos.estado
            FROM turnos
            INNER JOIN usuarios ON turnos.id_medico = usuarios.id
            WHERE ('$date_start' = '' OR STR_TO_DATE(turnos.dia, '%d-%m-%Y') >= STR_TO_DATE('$date_start', '%d-%m-%Y'))
            AND ('$date_finish' = '' OR STR_TO_DATE(turnos.dia, '%d-%m-%Y') <= STR_TO_DATE('$date_finish', '%d-%m-%Y'))
            AND ('$id_medico' = '' OR turnos.id_medico = '$id_medico')
            ORDER BY usuarios.id ASC;
        ";

        // Execute the query.
        $results = DB::select(DB::raw($query));

        // Loop through the results.
        $turnos_por_medico_temp = array();

        foreach ($results as $result) {
            $turnos_por_medico_temp[$result->id]['apellido'] = $result->apellido;
            $turnos_por_medico_temp[$result->id]['nombre']   = $result->nombre;

            if ($result->estado === 'reservado') {
                if (!isset($turnos_por_medico_temp[$result->id]['reservados'])) {
                    $turnos_por_medico_temp[$result->id]['reservados'] = 1;
                } else {
                    $turnos_por_medico_temp[$result->id]['reservados']++;
                }
            } elseif ($result->estado === 'cancelado') {
                if (!isset($turnos_por_medico_temp[$result->id]['cancelados'])) {
                    $turnos_por_medico_temp[$result->id]['cancelados'] = 1;
                } else {
                    $turnos_por_medico_temp[$result->id]['cancelados']++;
                }
            } elseif ($result->estado === 'confirmado') {
                if (!isset($turnos_por_medico_temp[$result->id]['confirmados'])) {
                    $turnos_por_medico_temp[$result->id]['confirmados'] = 1;
                } else {
                    $turnos_por_medico_temp[$result->id]['confirmados']++;
                }
            } elseif ($result->estado === 'concretado') {
                if (!isset($turnos_por_medico_temp[$result->id]['concretados'])) {
                    $turnos_por_medico_temp[$result->id]['concretados'] = 1;
                } else {
                    $turnos_por_medico_temp[$result->id]['concretados']++;
                }
            }

            if (!isset($turnos_por_medico_temp[$result->id]['total'])) {
                $turnos_por_medico_temp[$result->id]['total'] = 1;
            } else {
                $turnos_por_medico_temp[$result->id]['total']++;
            }
        }

        // Delete the 'id' key.
        $turnos_por_medico = array();

        foreach ($turnos_por_medico_temp as $key => $value) {
            $turnos_por_medico[] = $value;
        }

        // If 'date_start' is null, get the first record date.
        if ($date_start === null) {
            $date_start = Turnos::orderByRaw('STR_TO_DATE(dia, "%d-%m-%Y") ASC')
                ->first()
                ->dia;
        }

        // If 'date_finish' is null, get the today date.
        if ($date_finish === null) {
            $date_finish = ' - ';
        }


        // Check if there is any record.
        if (count($turnos_por_medico) > 0) {
            $success = true;
            $message = 'Se está generando el reporte y en breve se descargará.';
        } else {
            $success = false;
            $message = 'No se encontraron registros.';
        }

        return json_encode(
            array(
                'success' => $success,
                'message' => $message,
                'data'    => array(
                    'turnos_por_medico' => $turnos_por_medico,
                    'fecha_inicio'      => $date_start,
                    'fecha_fin'         => $date_finish,
                ),
            )
        );
    }
}
