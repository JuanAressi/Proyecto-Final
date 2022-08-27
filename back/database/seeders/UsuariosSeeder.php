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

        // Create users.
        for ($i = 0; $i < 500; $i++) {
            // Create Usuario.
            $usuario = new Usuarios();

            $first_name   = rand(0, count($names) - 1);
            $last_name    = rand(0, count($surnames) - 1);
            $email_prefix = rand(0, count($emails) - 1);

            $usuario->nombre     = $names[$first_name];
            $usuario->apellido   = $surnames[$last_name];
            $usuario->email      = $names[$first_name] . $i . $emails[$email_prefix];
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