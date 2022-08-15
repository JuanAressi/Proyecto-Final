import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SideNav from '../../../components/SideNav/SideNav';
import Modal from '../../../components/Modal/Modal';
import Filters from '../../../components/Table/Filters/Filters';
import Pagination from '../../../components/Table/Pagination/Pagination';
import './style.css';

function Pacientes() {
	const [users, setUsers] = useState([]);
	const [totalUsers, setTotalUsers] = useState(0);
    const [userToDelete, setUserToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [showPerPage, setShowPerPage] = useState(10);

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
                setTotalUsers(response.user_count);
                setUsers(response.usuarios);
			},
			error: function (error) {
				console.log(error);
			}
		});
    }, [page, showPerPage]);
    
    // When the user changes the amount of users to show.
	useEffect(() => {
        setPage(1);
    }, [showPerPage]);


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
        <div id='pageAdminPacientes' className='d-flex'>
            <SideNav />

            <div className='container py-5'>
                <h1 className='display-3 text-secondary mb-4'>Pacientes</h1>

                {totalUsers && totalUsers > 0 ? (
                    <>
                        <Filters 
                            showPerPage={showPerPage}
                            setShowPerPage={setShowPerPage}
                        />

                        <table className='table table-striped border box-shadow-dark mt-3'>
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
                                                <td>{(index + 1) + ((page - 1) * showPerPage)}</td>
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
                        
                        {totalUsers > showPerPage ? 
                            (    
                                <Pagination
                                    totalUsers={totalUsers}
                                    showPerPage={showPerPage}
                                    page={page}
                                    setPage={setPage}
                                />
                            ) : null
                        }
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