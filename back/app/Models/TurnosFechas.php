<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TurnosFechas extends Model
{
    use HasFactory;

    protected $fillable = [
        'id_medico',
        'dia',
    ];
}
