<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller {
    /**
    * Function getAll - Returns all users from database.
    *
    * @return array $users - An array of all users.
    */
    public function getAll() {
        $users = Usuarios::orderby('id', 'asc')->select('*')->get();

        return json_encode($users);
    }


    /**
     * Function getById - Returns a user by id.
     */
    public function getById($id) {
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
    public function addNew(Request $request) {
        $user = Usuarios::create([
            'email'      => $request->input('email'),
            'password'   => md5($request->input('password')),
            'rol'        => $request->input('rol'),
        ]);

        return json_encode(
            array(
                'success' => true,
                'user' => $user,
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
    public function update(Request $request) {
        $id = $request->input('id');
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $email = $request->input('email');
        $phone = $request->input('phone');
        $password = $request->input('password');
    }

    
    /**
     * Function delete - Deletes a user by id.
     */
    public function delete($id) {
        $user = Usuarios::where('id', $id)->delete();

        return json_encode($user);
    }


    /**
     * Function LogIn - Logs in a user.
     * 
     * @param Request $request - The request object.
     * 
     *  @return array $user - The logged in user.
     */
    public function LogIn(Request $request) {
        $email = $request->input('email');
        $password = md5($request->input('password'));

        $user = Usuarios::where('email', $email)->where('password', $password)->select('*')->get();

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
                        'message' => 'Password incorrecto.',
                    )
                );
            } else {
                // User is not registered.
                return json_encode(
                    array(
                        'success' => false,
                        'message' => 'El usuario no existe.',
                    )
                );
            }
        }
    }
}
