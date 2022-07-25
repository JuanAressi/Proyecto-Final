<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuarios;
use App\Models\Pacientes;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create users.
        for ($i = 0; $i < 100; $i++) {
            // Create Usuario.
            $usuario = new Usuarios();

            $usuario->nombre     = 'nombre' . $i;
            $usuario->apellido   = 'apellido' . $i;
            $usuario->email      = 'email' . $i . '@gmail.com';
            $usuario->contraseña = md5('123456');
            $usuario->dni        = random_int(10000000, 99999999);
            $usuario->telefono   = random_int(152000000, 156999999);
            $usuario->estado     = 'activo';
            $usuario->rol        = 'paciente';

            $usuario->save();

            // Create Paciente.
            $paciente = new Pacientes();

            $paciente->id_usuario = $usuario->id;
            $paciente->id_obra_social = random_int(1, 5);

            $paciente->save();
        }
    }
}
