<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller
{
    /**
     * Function getAll - Returns all users from database.
     *
     * @param Request $request - The request object.
     *
     * @return array $users - An array of all users.
     */
    public function getAll(Request $request)
    {
        // Get params from request.
        $rol        = $request->input('rol');
        $page       = $request->input('page');
        $pagination = $request->input('pagination');
        $search     = $request->input('search');

        // Calculate offset.
        $offset = ($page - 1) * $pagination;

        // Calculate limit.
        $limit = $offset + $pagination;

        // Check if role is set.
        if (isset($rol)) {
            // Get all users with role.
            $usuarios_sql = Usuarios::leftJoin('pacientes', 'usuarios.id', '=', 'pacientes.id_usuario')
                ->where('usuarios.rol', $rol)
                ->where('usuarios.estado', 'activo')
                ->where('usuarios.nombre', 'like', '%' . $search . '%')
                ->orWhere('usuarios.apellido', 'like', '%' . $search . '%')
                ->orWhere('usuarios.email', 'like', '%' . $search . '%')
                ->orWhere('usuarios.dni', 'like', '%' . $search . '%')
                ->orderby('usuarios.id', 'asc')
                ->leftJoin('obras_sociales', 'pacientes.id_obra_social', '=', 'obras_sociales.id')
                ->select('usuarios.*', 'obras_sociales.nombre as obra_social')
                ->get();

            // Get total of users.
            $user_count = sizeof($usuarios_sql);

            // Get users by pagination.
            $usuarios = [];

            // Check if offset is valid.
            if ($offset < $user_count) {
                // Fill usuarios according to pagination.
                for ($i = $offset; $i < $limit && $i < $user_count; $i++) {
                    $usuarios[] = $usuarios_sql[$i];
                }
            } else {
                // Fill usuarios with $usuarios_sql.
                $usuarios = $usuarios_sql;
            }
        } else {
            $usuarios_sql = Usuarios::orderby('id', 'asc')
                ->where('estado', 'activo')
                ->select('*')
                ->get();

            // Get total of users.
            $user_count = sizeof($usuarios_sql);

            // Get users by pagination.
            $usuarios = [];

            // Check if offset is valid.
            if ($offset < $user_count) {
                // Fill usuarios according to pagination.
                for ($i = $offset; $i < $limit; $i++) {
                    $usuarios[] = $usuarios_sql[$i];
                }
            } else {
                // Fill usuarios with $usuarios_sql.
                $usuarios = $usuarios_sql;
            }
        }

        // Check if users are found.
        if (count($usuarios) > 0) {
            // Create array of users.
            $usuarios_filtrados = array();

            // Return nombre, apellido, email.
            foreach ($usuarios as $usuario) {
                $usuarios_filtrados[] = array(
                    'id'          => $usuario->id,
                    'nombre'      => $usuario->nombre,
                    'apellido'    => $usuario->apellido,
                    'email'       => $usuario->email,
                    'dni'         => $usuario->dni,
                    'obra_social' => $usuario->obra_social,
                );
            }

            // Return usuarios.
            return json_encode(
                array(
                    'user_count' => $user_count,
                    'usuarios'   => $usuarios,
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'error' => 'No users found.'
                )
            );
        }
    }


    /**
     * Function getById - Returns a user by id.
     *
     * @param int $id - The ID of the user.
     *
     * @return array $user - An array of the user.
     */
    public function getById($id)
    {
        $user = Usuarios::where('id', $id)->select('*')->get();

        return json_encode($user);
    }


    /**
     * Function addNew - Adds a new user to database.
     *
     * @param Request $request - The request object.
     *
     * @return array $user - The new user.
     */
    public function addNew(Request $request)
    {
        $success = true;
        $message = '';
        $field   = '';

        // Validate that the 'email' is unique.
        $email = Usuarios::where('email', $request->input('email'))
            ->select('email')
            ->get();

        if (count($email) > 0) {
            $success = false;
            $message = 'El email ya se encuentra en uso';
            $field   = 'email';
        }

        if ($success) {
            // Validate that the 'dni' is unique.
            $dni = Usuarios::where('dni', $request->input('dni'))
                ->select('dni')
                ->get();

            if (count($dni) > 0) {
                $success = false;
                $message = 'El DNI ya se encuentra en uso';
                $field   = 'dni';
            }
        }

        if ($success) {
            $user = Usuarios::create([
                'nombre'           => $request->input('nombre'),
                'apellido'         => $request->input('apellido'),
                'email'            => $request->input('email'),
                'contraseña'       => md5($request->input('contraseña')),
                'fecha_nacimiento' => $request->input('fecha_nacimiento'),
                'genero'           => $request->input('genero'),
                'dni'              => $request->input('dni'),
                'telefono'         => $request->input('telefono'),
                'rol'              => 'paciente',
                'estado'           => 'activo',
            ]);

            if ($user !== null) {
                $paciente = Pacientes::create([
                    'id_usuario' => $user->id,
                    'obra_social' => $request->input('obra_social'),
                    'numero_obra_social' => $request->input('numero_obra_social'),
                ]);

                if ($paciente !== null) {
                    $success = true;
                    $message = 'Usuario creado con éxito';
                } else {
                    $success = false;
                    $message = 'Error al crear el usuario, por favor intente nuevamente';
                }
            } else {
                $success = false;
                $message = 'Error al crear el usuario, por favor intente nuevamente';
            }
        }

        return json_encode(
            array(
                'success' => $success,
                'message' => $message,
                'field'   => $field,
            )
        );
    }


    /**
     * Function update - Updates a user by id.
     *
     * @param Request $request - The request object.
     *
     * @return array $user - The updated user.
     */
    public function update(Request $request)
    {
        $id         = $request->input('id');
        $first_name = $request->input('first_name');
        $last_name  = $request->input('last_name');
        $email      = $request->input('email');
        $phone      = $request->input('phone');
        $password   = $request->input('password');
    }


    /**
     * Function delete - Deletes a user by ID.
     *
     * @param int $id - The ID of the user.
     *
     * @return array - The status of the response.
     */
    public function delete($id)
    {
        // Update user status.
        $user = Usuarios::where('id', $id)
            ->update(['estado' => 'eliminado']);

        // Check if user was updated.
        if ($user) {
            // Return success.
            return json_encode(
                array(
                    'success' => true
                )
            );
        } else {
            // Return error.
            return json_encode(
                array(
                    'success' => false,
                    'message' => 'El usuario no se pudo actualizar.'
                )
            );
        }

        return json_encode($user);
    }


    /**
     * Function logIn - Logs in a user.
     *
     * @param Request $request - The request object.
     *
     * @return array $user - The logged in user.
     */
    public function logIn(Request $request)
    {
        $email = $request->input('email');
        $password = md5($request->input('password'));

        $user = Usuarios::where('email', $email)->where('contraseña', $password)->select('*')->get();

        // If user exists.
        if (count($user) > 0) {
            // Get user role.
            $role = $user[0]->rol;

            // Return the rol of the user.
            return json_encode(
                array(
                    'success' => true,
                    'role' => $role,
                )
            );
        } else {
            // Check if the email is registered.
            $email_exists = Usuarios::where('email', $email)->select('*')->get();

            if (count($email_exists) > 0) {
                // Password is incorrect.
                return json_encode(
                    array(
                        'success' => false,
                        'message' => 'Contraseña incorrecta.',
                        'field'   => 'password',
                    )
                );
            } else {
                // User is not registered.
                return json_encode(
                    array(
                        'success' => false,
                        'message' => 'El usuario no existe.',
                        'field'   => 'email',
                    )
                );
            }
        }
    }
}
