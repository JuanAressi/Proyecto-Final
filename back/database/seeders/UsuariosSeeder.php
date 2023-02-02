<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usuarios;
use App\Models\Pacientes;
use App\Models\Turnos;
use App\Models\TurnosFechas;
use App\Models\TurnosHoras;
use App\Models\HistoriaClinica;

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

        // Obras sociales.
        $obras_sociales = array(
            0 => 'OSDE',
            1 => 'Swiss Medical',
            2 => 'Medifé',
            3 => 'Emerger',
            4 => 'Particular',
        );

        // Estados de Turnos.
        $estados_turnos = array(
            0 => 'reservado',
            1 => 'cancelado',
            2 => 'concretado',
            3 => 'confirmado',
        );

        // Alergias.
        $alergias = array(
            0 => null,
            1 => 'Leche',
            2 => 'Ácaros del polvo',
            3 => 'Polen',
            4 => 'Animales',
            5 => 'Picaduras de insectos',
            6 => 'Alimentos',
            7 => 'Medicamentos',
            8 => 'Látex',
            9 => 'Penicilina',
            10 => 'Frutos secos',
        );

        // Antecedentes.
        $antecedentes = array(
            0 => null,
            1 => 'Diabetes',
            2 => 'Depresión y ansiedad',
            3 => 'Enfermedad cardiovascular',
            4 => 'Enfermedad pulmonar',
            5 => 'Enfermedad renal crónica',
            6 => 'Artritis',
            7 => 'Enfermedad tiroidea',
            8 => 'Cáncer',
            9 => 'Enfermedad inflamatoria intestinal',
            10 => 'Hipertensión',
        );

        // Turnos horas estados.
        $turnos_horas_estados = array(
            0 => 'libre',
            1 => 'ocupado',
        );

        // Admin 1.
        $admin                   = new Usuarios();
        $admin->nombre           = 'Juan Manuel';
        $admin->apellido         = 'Aressi';
        $admin->email            = 'Juan.Aressi@hotmail.com';
        $admin->contraseña       = md5('JuanAressi1');
        $admin->dni              = '39858575';
        $admin->fecha_nacimiento = '03-03-1997';
        $admin->genero           = 'Masculino';
        $admin->telefono         = '3413535267';
        $admin->estado           = 'activo';
        $admin->rol              = 'soporte';
        $admin->save();

        // Admin 2.
        $admin                   = new Usuarios();
        $admin->nombre           = 'Silvana';
        $admin->apellido         = 'Ferracuti';
        $admin->email            = 'silferra85@gmail.com';
        $admin->contraseña       = md5('SilvanaFerracuti1');
        $admin->dni              = '31300914';
        $admin->fecha_nacimiento = '04-02-1985';
        $admin->genero           = 'Femenino';
        $admin->telefono         = '3413366082';
        $admin->estado           = 'activo';
        $admin->rol              = 'admin';
        $admin->save();

        // Admin 3.
        $admin                   = new Usuarios();
        $admin->nombre           = 'Jesica';
        $admin->apellido         = 'Guaglianono';
        $admin->email            = 'guaglianonojesica@gmail.com';
        $admin->contraseña       = md5('JesicaGuaglianono1');
        $admin->dni              = '36003567';
        $admin->fecha_nacimiento = '31-08-1991';
        $admin->genero           = 'Femenino';
        $admin->telefono         = '3412115676';
        $admin->estado           = 'activo';
        $admin->rol              = 'admin';
        $admin->save();

        // Usuario 1.
        $usuario                   = new Usuarios();
        $usuario->nombre           = 'Gabriela';
        $usuario->apellido         = 'Garcia';
        $usuario->email            = 'Gabriela.Garcia@yopmail.com';
        $usuario->contraseña       = md5('GabrielaGarcia1');
        $usuario->dni              = '38486985';
        $usuario->fecha_nacimiento = '16-11-1988';
        $usuario->genero           = 'Femenino';
        $usuario->telefono         = '3413678901';
        $usuario->estado           = 'inactivo';
        $usuario->rol              = 'paciente';
        $usuario->save();

        $paciente = new Pacientes();

        $paciente->id_usuario   = $usuario->id;
        $paciente->obra_social  = 'Particular';
        $paciente->antecedentes = 'Artritis';
        $paciente->alergias     = 'Polen';
        $paciente->save();

        // Usuario 2.
        $usuario                   = new Usuarios();
        $usuario->nombre           = 'Daniel';
        $usuario->apellido         = 'Pérez';
        $usuario->email            = 'Daniel.Perez@hotmail.com';
        $usuario->contraseña       = md5('DanielPerez1');
        $usuario->dni              = '35486985';
        $usuario->fecha_nacimiento = '01-01-1990';
        $usuario->genero           = 'Masculino';
        $usuario->telefono         = '3413456789';
        $usuario->estado           = 'inactivo';
        $usuario->rol              = 'paciente';
        $usuario->save();

        $paciente = new Pacientes();

        $paciente->id_usuario          = $usuario->id;
        $paciente->obra_social         = 'OSDE';
        $paciente->numero_obra_social  = '100001';
        $paciente->antecedentes        = '';
        $paciente->alergias            = '';
        $paciente->save();

        // Usuario 3.
        $usuario                   = new Usuarios();
        $usuario->nombre           = 'Elena';
        $usuario->apellido         = 'Ramos';
        $usuario->email            = 'Elena.Ramos@gmail.com';
        $usuario->contraseña       = md5('ElenaRamos1');
        $usuario->dni              = '33486985';
        $usuario->fecha_nacimiento = '12-02-1985';
        $usuario->genero           = 'Femenino';
        $usuario->telefono         = '3413567890';
        $usuario->estado           = 'activo';
        $usuario->rol              = 'paciente';
        $usuario->save();

        $paciente = new Pacientes();

        $paciente->id_usuario          = $usuario->id;
        $paciente->obra_social         = 'Medifé';
        $paciente->numero_obra_social  = '100002';
        $paciente->antecedentes        = 'Enfermedad pulmonar';
        $paciente->alergias            = 'Picaduras de insectos';
        $paciente->save();

        // Usuario 4.
        $usuario                   = new Usuarios();
        $usuario->nombre           = 'Laura';
        $usuario->apellido         = 'Washington';
        $usuario->email            = 'Laura.Washington@yahoo.com.ar';
        $usuario->contraseña       = md5('LauraWashington1');
        $usuario->dni              = '48486985';
        $usuario->fecha_nacimiento = '24-07-2000';
        $usuario->genero           = 'No binario';
        $usuario->telefono         = '3413678901';
        $usuario->estado           = 'activo';
        $usuario->rol              = 'paciente';
        $usuario->save();

        $paciente = new Pacientes();

        $paciente->id_usuario          = $usuario->id;
        $paciente->obra_social         = 'Swiss Medical';
        $paciente->numero_obra_social  = '100003';
        $paciente->antecedentes        = 'Depresión y ansiedad';
        $paciente->alergias            = '';
        $paciente->save();

        // Medico 1.
        $medico                   = new Usuarios();
        $medico->nombre           = 'Kevin';
        $medico->apellido         = 'Nieves';
        $medico->email            = 'Kevin.Nieves@outlook.com';
        $medico->contraseña       = md5('KevinNieves1');
        $medico->dni              = '33486945';
        $medico->fecha_nacimiento = '05-06-1980';
        $medico->genero           = 'Masculino';
        $medico->telefono         = '3413789012';
        $medico->estado           = 'activo';
        $medico->rol              = 'medico';
        $medico->save();

        // Medico 2.
        $medico                   = new Usuarios();
        $medico->nombre           = 'Lorena';
        $medico->apellido         = 'Esparza';
        $medico->email            = 'Lorena.Esparza@hotmail.com';
        $medico->contraseña       = md5('LorenaEsparza1');
        $medico->dni              = '33186985';
        $medico->fecha_nacimiento = '17-07-1979';
        $medico->genero           = 'Masculino';
        $medico->telefono         = '3413890123';
        $medico->estado           = 'inactivo';
        $medico->rol              = 'medico';
        $medico->save();

        // Medico 3.
        $medico                   = new Usuarios();
        $medico->nombre           = 'Pablo';
        $medico->apellido         = 'Escobar';
        $medico->email            = 'Pablo.Escobar@hotmail.com';
        $medico->contraseña       = md5('PabloEscobar1');
        $medico->dni              = '15186985';
        $medico->fecha_nacimiento = '01-12-1949';
        $medico->genero           = 'Masculino';
        $medico->telefono         = '3413890123';
        $medico->estado           = 'activo';
        $medico->rol              = 'medico';
        $medico->save();

        // Administrativo 1.
        $administrativo                   = new Usuarios();
        $administrativo->nombre           = 'Katia';
        $administrativo->apellido         = 'Xenia';
        $administrativo->email            = 'Katia.Xenia@hotmail.com';
        $administrativo->contraseña       = md5('KatiaXenia1');
        $administrativo->dni              = '39858576';
        $administrativo->fecha_nacimiento = '03-03-1997';
        $administrativo->genero           = 'Masculino';
        $administrativo->telefono         = '3413890123';
        $administrativo->estado           = 'activo';
        $administrativo->rol              = 'administrativo';
        $administrativo->save();

        // Administrativo 2.
        $administrativo                   = new Usuarios();
        $administrativo->nombre           = 'Nicolás';
        $administrativo->apellido         = 'Herrera';
        $administrativo->email            = 'Nicolás.Herrera@gmail.com';
        $administrativo->contraseña       = md5('NicolásHerrera1');
        $administrativo->dni              = '33486984';
        $administrativo->fecha_nacimiento = '12-02-1985';
        $administrativo->genero           = 'Masculino';
        $administrativo->telefono         = '3413890123';
        $administrativo->estado           = 'activo';
        $administrativo->rol              = 'administrativo';
        $administrativo->save();

        // Historia Clinica 1.
        $historia_clinica                  = new HistoriaClinica();
        $historia_clinica->id_paciente     = 5;
        $historia_clinica->id_medico       = 8;
        $historia_clinica->fecha           = '01-05-2022';
        $historia_clinica->motivo_consulta = 'Tos persistente y dificultad para respirar';
        $historia_clinica->diagnostico     = 'Asma bronquial';
        $historia_clinica->estado          = 'visible';
        $historia_clinica->save();

        // Historia Clinica 2.
        $historia_clinica                  = new HistoriaClinica();
        $historia_clinica->id_paciente     = 7;
        $historia_clinica->id_medico       = 10;
        $historia_clinica->fecha           = '02-05-2022';
        $historia_clinica->motivo_consulta = 'Dolor de cabeza intenso';
        $historia_clinica->diagnostico     = 'Migraña';
        $historia_clinica->estado          = 'visible';
        $historia_clinica->save();

        // Historia Clinica 3.
        $historia_clinica                  = new HistoriaClinica();
        $historia_clinica->id_paciente     = 5;
        $historia_clinica->id_medico       = 10;
        $historia_clinica->fecha           = '03-05-2022';
        $historia_clinica->motivo_consulta = 'Hinchazón en las piernas y orina de color oscuro';
        $historia_clinica->diagnostico     = 'Insuficiencia renal aguda';
        $historia_clinica->estado          = 'eliminada';
        $historia_clinica->save();

        // Historia Clinica 4.
        $historia_clinica                  = new HistoriaClinica();
        $historia_clinica->id_paciente     = 7;
        $historia_clinica->id_medico       = 8;
        $historia_clinica->fecha           = '04-05-2022';
        $historia_clinica->motivo_consulta = 'Falta de aire y tos con esputo';
        $historia_clinica->diagnostico     = 'Neumonía';
        $historia_clinica->estado          = 'modificada';
        $historia_clinica->save();



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
            $usuario->fecha_nacimiento = date('d-m-Y', strtotime('-' . rand(18, 60) . ' years'));
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
            $paciente->alergias           = $alergias[rand(0, count($alergias) - 1)];
            $paciente->antecedentes       = $antecedentes[rand(0, count($antecedentes) - 1)];

            if ($paciente->obra_social === 'Particular') {
                $paciente->numero_obra_social = null;
            } else {
                $paciente->numero_obra_social = random_int(10000000, 99999999);
            }

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
            $usuario->fecha_nacimiento = date('d-m-Y', strtotime('-' . rand(18, 60) . ' years'));
            $usuario->genero           = $genders[$gender];
            $usuario->telefono         = random_int(152000000, 156999999);
            $usuario->estado           = 'activo';
            $usuario->rol              = 'medico';

            $usuario->save();
        }

        $counter = 0;

        // Create Turnos.
        do {
            // Create Turno.
            $turno = new Turnos();

            $turno->id_paciente = rand(15, 770);
            $turno->id_medico   = rand(770, 790);
            $turno->dia         = date('d-m-Y', strtotime('+' . rand(-60, 30) . ' days'));
            $turno->hora        = rand(8, 18) . ':00';
            $turno->estado      = $estados_turnos[rand(0, count($estados_turnos) - 1)];

            // Verify if the same turno already exists.
            $turno_exists = Turnos::where('id_medico', $turno->id_medico)
                ->where('dia', $turno->dia)
                ->where('hora', $turno->hora)
                ->first();

            if ($turno_exists) {
                continue;
            } else {
                // Verify if the Turno is not a weekend.
                if (date('N', strtotime($turno->dia)) < 6) {
                    $counter++;

                    // Verify if the date is in the future, it only can be estado = 'reservado' or 'cancelado'.
                    if (strtotime($turno->dia) > strtotime(date('d-m-Y'))) {
                        $turno->estado = $estados_turnos[rand(0, 1)];
                    } elseif (strtotime($turno->dia) < strtotime(date('d-m-Y'))) {
                        $turno->estado = $estados_turnos[rand(1, 2)];
                    } else {
                        $turno->estado = $estados_turnos[rand(0, 3)];
                    }

                    $turno->save();
                }
            }
        } while ($counter++ < 2000);

        for ($j = 758; $j < 778; $j++) {
            // Loop trough 40 days, not counting the weekends.
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
