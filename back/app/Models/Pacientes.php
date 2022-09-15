<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pacientes extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_usuario',
        'numero_obra_social',
        'historia_clinica',
        'turnos',
    ];
}
