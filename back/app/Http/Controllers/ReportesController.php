<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
            $headers = "Nombre del paciente,Apellido del paciente,Fecha de nacimiento,Género,DNI,Teléfono,Obra social,Número de obra social,Antecedentes,Alergias,Nombre del médico,Apellido del médico,Fecha,Motivo de la consulta,Diagnóstico\n";
        } else {
            $success = false;
            $message = 'No se encontraron registros.';
            $headers = '';
        }

        return json_encode(
            array(
                'success' => $success,
                'message' => $message,
                'headers' => $headers,
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
        $fecha_desde = $request->input('fecha_desde');
        $fecha_hasta = $request->input('fecha_hasta');
        $id_medico   = $request->input('medico');

        // Get all 'Turnos' that matches the request.
        $turnos = Turnos::selectRaw("turnos.id_medico, usuarios.apellido, usuarios.nombre,
            SUM(case when turnos.estado = 'reservado' THEN 1 ELSE 0 end) as reservados,
            SUM(case when turnos.estado = 'confirmado' THEN 1 ELSE 0 end) as confirmados,
            SUM(case when turnos.estado = 'cancelado' THEN 1 ELSE 0 end) as cancelados,
            SUM(case when turnos.estado = 'concretado' THEN 1 ELSE 0 end) as concretados,
            count(*) as total")
            ->join('usuarios', 'turnos.id_medico', '=', 'usuarios.id')
            ->when($fecha_desde, function ($query, $fecha_desde) {
                return $query->where('turnos.dia', '>=', $fecha_desde);
            })
            ->when($fecha_hasta, function ($query, $fecha_hasta) {
                return $query->where('turnos.dia', '<=', $fecha_hasta);
            })
            ->when($id_medico, function ($query, $id_medico) {
                return $query->where('turnos.id_medico', '=', $id_medico);
            })
            ->groupBy('turnos.id_medico', 'usuarios.nombre', 'usuarios.apellido')
            ->orderBy('turnos.id_medico', 'asc')
            ->get();


        // Check if there is any record.
        if (count($turnos) > 0) {
            $success = true;
            $message = 'Se está generando el reporte y en breve se descargará.';
            $headers = "ID Medico,Apellido,Nombre,Turnos Reservados,Turnos Confirmados,Turnos Cancelados,Turnos Concretados,Cantidad total de Turnos\n";
        } else {
            $success = false;
            $message = 'No se encontraron registros.';
            $headers = '';
        }

        return json_encode(
            array(
                'success' => $success,
                'message' => $message,
                'headers' => $headers,
                'data'    => $turnos
            )
        );
    }
}
