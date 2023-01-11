<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuarios;
use App\Models\Pacientes;
use App\Models\Turnos;
use App\Models\TurnosFechas;
use App\Models\TurnosHoras;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create array of random names.
        $names = array(
            0 => 'Adrián',
            1 => 'Ángel',
            2 => 'Aurora',
            3 => 'Benjamín',
            4 => 'Bruno',
            5 => 'Blanca',
            6 => 'Carlos',
            7 => 'Carmen',
            8 => 'Cristina',
            9 => 'Daniel',
            10 => 'David',
            11 => 'Diego',
            12 => 'Elena',
            13 => 'Elvira',
            14 => 'Emilio',
            15 => 'Fernando',
            16 => 'Francisco',
            17 => 'Fabio',
            18 => 'Gabriela',
            19 => 'Germán',
            20 => 'Gonzalo',
            21 => 'Héctor',
            22 => 'Hugo',
            23 => 'Helena',
            24 => 'Ignacio',
            25 => 'Isabel',
            26 => 'Iván',
            27 => 'Javier',
            28 => 'Jesús',
            29 => 'Juan',
            30 => 'Karla',
            31 => 'Kevin',
            32 => 'Katia',
            33 => 'Laura',
            34 => 'Leonardo',
            35 => 'Leticia',
            36 => 'Lorena',
            37 => 'Manuel',
            38 => 'María',
            39 => 'Marcela',
            40 => 'Nicolás',
            41 => 'Natalia',
            42 => 'Nerea',
            43 => 'Óscar',
            44 => 'Olivia',
            45 => 'Omar',
            46 => 'Pablo',
            47 => 'Paula',
            48 => 'Pedro',
            49 => 'Quique',
            50 => 'Quintana',
            51 => 'Quildonia',
            52 => 'Rafael',
            53 => 'Ramón',
            54 => 'Raquel',
            55 => 'Santiago',
            56 => 'Sara',
            57 => 'Sofía',
            58 => 'Tomás',
            59 => 'Tamara',
            60 => 'Teresa',
            61 => 'Ursula',
            62 => 'Ulises',
            63 => 'Uriel',
            64 => 'Vicente',
            65 => 'Víctor',
            66 => 'Violeta',
            67 => 'Walter',
            68 => 'Wendy',
            69 => 'Waldo',
            70 => 'Xavier',
            71 => 'Ximena',
            72 => 'Xanthe',
            73 => 'Yolanda',
            74 => 'Yasmine',
            75 => 'Yuri',
            76 => 'Zacarias',
            77 => 'Zoe',
            78 => 'Zulema',
        );

        // Create array of random surnames.
        $surnames = array(
            0 => 'Álvarez',
            1 => 'Ávila',
            2 => 'Beltrán',
            3 => 'Blanco',
            4 => 'Castro',
            5 => 'Cervantes',
            6 => 'Díaz',
            7 => 'Domínguez',
            8 => 'Escobar',
            9 => 'Esparza',
            10 => 'Fernández',
            11 => 'Farías',
            12 => 'García',
            13 => 'González',
            14 => 'Hernández',
            15 => 'Herrera',
            16 => 'Iglesias',
            17 => 'Iniesta',
            18 => 'Jiménez',
            19 => 'Jerez',
            20 => 'López',
            21 => 'Lozano',
            22 => 'Maldonado',
            23 => 'Molina',
            24 => 'Nieto',
            25 => 'Nieves',
            26 => 'Ortega',
            27 => 'Ortiz',
            28 => 'Pérez',
            29 => 'Pineda',
            30 => 'Quiroga',
            31 => 'Quintana',
            32 => 'Ramos',
            33 => 'Reyes',
            34 => 'Sánchez',
            35 => 'Santos',
            36 => 'Torres',
            37 => 'Tapia',
            38 => 'Uribe',
            39 => 'Ureña',
            40 => 'Vargas',
            41 => 'Vázquez',
            42 => 'Wagner',
            43 => 'Washington',
            44 => 'Xenia',
            45 => 'Xochitl',
            46 => 'Yáñez',
            47 => 'Yepez',
            48 => 'Zamora',
            49 => 'Zapata',
        );

        // Create array of random prefix emails.
        $emails = array(
            0 => '@gmail.com',
            1 => '@hotmail.com',
            2 => '@outlook.com',
            3 => '@yahoo.com',
            4 => '@live.com',
            5 => '@yopmail.com',
            6 => '@mail.com',
            7 => '@xmail.com',
        );

        // Create an array of genders.
        $genders = array(
            0 => 'Masculino',
            1 => 'Femenino',
            2 => 'No binario',
            3 => 'No especificado',
        );

        $obras_sociales = array(
            0 => 'OSDE',
            1 => 'Swiss Medical',
            2 => 'Medifé',
            3 => 'Emerger',
        );

        $turnos_horas_estados = array(
            0 => 'libre',
            1 => 'ocupado',
        );


        $admin                   = new Usuarios();
        $admin->nombre           = 'Administrador';
        $admin->apellido         = '';
        $admin->email            = 'admin@xmail.com';
        $admin->contraseña       = md5('admin');
        $admin->dni              = '1';
        $admin->fecha_nacimiento = date('Y-m-d', strtotime('-' . rand(18, 60) . ' years'));
        $admin->genero           = '';
        $admin->telefono         = '';
        $admin->estado           = 'activo';
        $admin->rol              = 'admin';
        $admin->save();


        $usuario                   = new Usuarios();
        $usuario->nombre           = 'Usuario';
        $usuario->apellido         = 'Prueba';
        $usuario->email            = 'usuario.prueba@xmail.com';
        $usuario->contraseña       = md5('Contraseña1');
        $usuario->dni              = '';
        $usuario->fecha_nacimiento = date('Y-m-d', strtotime('-' . rand(18, 60) . ' years'));
        $usuario->genero           = '2';
        $usuario->telefono         = '';
        $usuario->estado           = 'activo';
        $usuario->rol              = 'paciente';
        $usuario->save();


        // Create users - Pacientes.
        for ($i = 0; $i < 758; $i++) {
            // Create Usuario.
            $usuario = new Usuarios();

            $first_name   = rand(0, count($names) - 1);
            $last_name    = rand(0, count($surnames) - 1);
            $email_prefix = rand(0, count($emails) - 1);
            $gender       = rand(0, count($genders) - 1);

            $usuario->nombre           = $names[$first_name];
            $usuario->apellido         = $surnames[$last_name];
            $usuario->email            = $names[$first_name] . $i . $emails[$email_prefix];
            $usuario->contraseña       = md5('123456');
            $usuario->dni              = random_int(10000000, 59999999);
            $usuario->fecha_nacimiento = date('Y-m-d', strtotime('-' . rand(18, 60) . ' years'));
            $usuario->genero           = $genders[$gender];
            $usuario->telefono         = random_int(152000000, 156999999);
            $usuario->estado           = 'activo';
            $usuario->rol              = 'paciente';

            $usuario->save();

            // Create Paciente.
            $paciente = new Pacientes();

            $paciente->id_usuario         = $usuario->id;
            $paciente->obra_social        = $obras_sociales[rand(0, count($obras_sociales) - 1)];
            $paciente->numero_obra_social = random_int(10000000, 99999999);

            $paciente->save();
        }


        // Create users - Médicos.
        for ($i = 0; $i < 20; $i++) {
            // Create Usuario.
            $usuario = new Usuarios();

            $first_name   = rand(0, count($names) - 1);
            $last_name    = rand(0, count($surnames) - 1);
            $email_prefix = rand(0, count($emails) - 1);
            $gender       = rand(0, count($genders) - 1);

            $usuario->nombre           = $names[$first_name];
            $usuario->apellido         = $surnames[$last_name];
            $usuario->email            = $names[$first_name] . $i . $emails[$email_prefix];
            $usuario->contraseña       = md5('123456');
            $usuario->dni              = random_int(10000000, 59999999);
            $usuario->fecha_nacimiento = date('Y-m-d', strtotime('-' . rand(18, 60) . ' years'));
            $usuario->genero           = $genders[$gender];
            $usuario->telefono         = random_int(152000000, 156999999);
            $usuario->estado           = 'activo';
            $usuario->rol              = 'medico';

            $usuario->save();
        }


        // Create Turnos.
        for ($i = 0; $i < 752; $i++) {
            // Create Turno.
            $turno = new Turnos();

            $turno->id_paciente = rand(3, 758);
            $turno->id_medico   = rand(758, 778);
            $turno->dia         = date('Y-m-d', strtotime('+' . rand(0, 30) . ' days'));
            $turno->hora        = rand(8, 18) . ':00';
            $turno->estado      = 'pendiente';

            $turno->save();
        }

        for ($j = 758; $j < 778; $j++) {
            // Loop trough 40days, not counting the weekends.
            for ($k = 0; $k < 40; $k++) {
                // Get the next day.
                $next_day = date('d-m-Y', strtotime('+' . $k . ' days'));

                // Check if the next day is a weekend.
                if (date('N', strtotime($next_day)) < 6) {
                    // Create TurnoFecha.
                    $turno_fecha = new TurnosFechas();

                    // Create TurnoFecha.
                    $turno_fecha->id_medico = $j;
                    $turno_fecha->dia       = date('d-m-Y', strtotime($next_day));

                    $turno_fecha->save();

                    // Create TurnosHoras.
                    for ($l = 8; $l < 18; $l++) {
                        // Create TurnoHora.
                        $turno_hora = new TurnosHoras();

                        $turno_hora->id_turnos_fechas = $turno_fecha->id;
                        $turno_hora->hora             = $l . ':00';
                        $turno_hora->estado           = $turnos_horas_estados[rand(0, count($turnos_horas_estados) - 1)];

                        $turno_hora->save();

                        $turno_hora = new TurnosHoras();

                        $turno_hora->id_turnos_fechas = $turno_fecha->id;
                        $turno_hora->hora             = $l . ':30';
                        $turno_hora->estado           = $turnos_horas_estados[rand(0, count($turnos_horas_estados) - 1)];

                        $turno_hora->save();
                    }
                }
            }
        }
    }
}
