<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuarios;

class UsuariosController extends Controller
{
    /**
    * Function getAll - Returns all users from database.
    *
    * @return array $users - An array of all users.
    */
    public function getAll()
    {
        $users = Usuarios::orderby('id', 'asc')->select('*')->get();

        return json_encode($users);
    }


    /**
     * Function getById - Returns a user by id.
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
        // $user['first_name'] = $request->input('first_name');
        // $user['last_name'] = $request->input('last_name');
        // $user['email'] = $request->input('email');
        // $user['phone'] = $request->input('phone');
        // $user['password'] = $request->input('password');

        // $result = DB::table('usuarios')->insert($user);


        $user = Usuarios::create([
            'first_name' => $request->input('first_name'),
            'last_name'  => $request->input('last_name'),
            'email'      => $request->input('email'),
            'phone'      => $request->input('phone'),
            'password'   => md5($request->input('password')),
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
    public function update(Request $request)
    {
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
    public function delete($id)
    {
        $user = Usuarios::where('id', $id)->delete();

        return json_encode($user);
    }
}
