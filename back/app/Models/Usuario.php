<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model {
    use HasFactory;

	protected $fillable = [
		'nombre',
		'apellido',
		'email',
		'dni',
		'telefono',
		'historia_clinica',
		'id_obra_social',
	];
}