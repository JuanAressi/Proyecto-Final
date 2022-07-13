<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuarios extends Model {
    use HasFactory;

	protected $fillable = [
		'email',
		'password',
		'first_name',
		'last_name',
		'dni',
		'telefono',
		'rol',
	];
}
