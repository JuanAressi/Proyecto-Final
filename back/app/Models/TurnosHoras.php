<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TurnosHoras extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_turnos_fechas',
        'hora',
        'estado',
    ];
}
