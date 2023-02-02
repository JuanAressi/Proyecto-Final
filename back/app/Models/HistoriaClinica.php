<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoriaClinica extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_paciente',
        'id_medico',
        'fecha',
        'motivo_consulta',
        'diagnostico',
        'estado',
    ];

    protected $table = 'historia_clinica';
}
