<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pacientes extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_paciente',
        'obra_social',
        'numero_obra_social',
        'historia_clinica',
        'antecedentes',
        'alergias',
    ];
}
