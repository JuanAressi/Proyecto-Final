import { React, useEffect, useState } from 'react';
import $ from 'jquery';
// import { $ } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../../components/Navbar/Navbar';
import Modal from '../../../components/Modal/Modal';
import './style.css';

function Pacientes() {
	const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [showPerPage, setShowPerPage] = useState(10);
    const [pagination, setPagination] = useState();

    // Get all the active users.
	useEffect(() => {
		$.ajax({
			url: 'http://local.misturnos/api/usuarios',
			type: 'GET',
			dataType: 'json',
            data: {
                'rol': 'paciente',
                'page': page,
                'pagination': showPerPage,
            },
			success: function (response) {
				console.log(response);
                setUsers(response);
			},
			error: function (error) {
				console.log(error);
			}
		});
    }, []);


    // Delete a user.
    function deleteUser() {
        console.log( 'userToDelete: ', userToDelete );

        $.ajax({
            url: 'http://local.misturnos/api/usuarios/' + userToDelete,
            type: 'DELETE',
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    // Close modal.
                    $('#closeModal').click();

                    // Append success message.
                    $('#filters').append(
                        "<div className='alert alert-success alert-dismissible fade show' role='alert'>" +
                        "<strong>El Paciente se eliminó correnctamente</strong>" +
                        "</div>"
                    );

                    // Delete message after 3 seconds.
                    setTimeout(function () {
                        $('.alert').remove();
                    }, 3000);
                }
            }
        });
    }


    return (
        <div id='pageAdminPacientes'>
            <Navbar />

            <div className='container mt-5'>
                <div id='filters'>TODO: filtros</div>

                {users && users.length > 0 ? (
                    <>
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
                                    if (index < showPerPage) {
                                        return (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.nombre} {user.apellido}</td>
                                                <td>{user.email}</td>
                                                <td>{user.dni}</td>
                                                <td>{user.obra_social}</td>
                                                <td>
                                                    <FontAwesomeIcon
                                                        className='text-warning me-3'
                                                        icon={faPencil}
                                                    />

                                                    <FontAwesomeIcon
                                                        className='text-danger'
                                                        icon={faTrashAlt}
                                                        data-bs-toggle='modal'
                                                        data-bs-target={'#modalDelete'}
                                                        onClick={() => setUserToDelete(user.id)}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    }
                                })}
                            </tbody>
                        </table>
                        
                        {users.length > showPerPage ? () => {
                            let pagination = users.length / showPerPage;
                            console.log( 'pagination: ', pagination );

                            return (
                                <div id='pagination' className='d-flex justify-content-end'>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>&lt;</span>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>&lt;&lt;</span>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0 active'>1</span>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>2</span>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>3</span>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>...</span>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>&gt;</span>
                                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border'>&gt;&gt;</span>
                                </div>
                            )
                        } : null}
                    </>
                ) : (
                    // TODO: mostrar mensaje de que no hay usuarios.
                    <div className='text-center'>No hay pacientes registrados</div>
                    )}
            </div>

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este paciente?'
                handleDelete={deleteUser}
            />
        </div>
    )
}

export default Pacientes