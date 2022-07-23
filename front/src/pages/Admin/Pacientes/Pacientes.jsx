import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../components/Navbar/Navbar';

function Pacientes() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		$.ajax({
			url: 'http://local.misturnos/api/usuarios',
			type: 'GET',
			dataType: 'json',
            data: {
                'role': 'paciente'
            },
			success: function (response) {
                setUsers(response);
                console.log(response);
			},
			error: function (error) {
				console.log(error);
			}
		});
    }, []);


    return (
        <div id='pageAdminPacientes'>
            <Navbar />

            <div className='container mt-5'>
                <div>TODO: filtros</div>

                <table className='table table-striped border box-shadow-dark mt-5'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>DNI</th>
                            <th>Obra Social</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.nombre} {user.apellido}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dni}</td>
                                    <td>{user.obra_social}</td>
                                    <td>
                                        <FontAwesomeIcon className='text-warning me-3' icon={faPencil} />
                                        <FontAwesomeIcon className='text-danger' icon={faTrashAlt} />
                                    </td>
                                </tr>
                            )
                        })}

                            {/* <tr key='1' >
                                <td>1</td>
                                <td>Juan Aressi</td>
                                <td>Juan.Aressi@hotmail.com</td>
                                <td>39.858.575</td>
                                <td>OSDE</td>
                                <th>
                                    <FontAwesomeIcon className='text-warning me-3' icon={faPencil} />
                                    <FontAwesomeIcon className='text-danger' icon={faTrashAlt} />
                                </th>
                            </tr>

                            <tr key='2'>
                                <td>2</td>
                                <td>Juan Aressi</td>
                                <td>Juan.Aressi@hotmail.com</td>
                                <td>39.858.575</td>
                                <td>OSDE</td>
                                <th>
                                    <FontAwesomeIcon className='text-warning me-3' icon={faPencil} />
                                    <FontAwesomeIcon className='text-danger' icon={faTrashAlt} />
                                </th>
                            </tr>

                            <tr key='3'>
                                <td>3</td>
                                <td>Juan Aressi</td>
                                <td>Juan.Aressi@hotmail.com</td>
                                <td>39.858.575</td>
                                <td>OSDE</td>
                                <th>
                                    <FontAwesomeIcon className='text-warning me-3' icon={faPencil} />
                                    <FontAwesomeIcon className='text-danger' icon={faTrashAlt} />
                                </th>
                            </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Pacientes