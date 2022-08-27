import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SideNav from '../../../components/SideNav/SideNav';
import Modal from '../../../components/Modal/Modal';
import Alert from '../../../components/Alert/Alert';
import Filters from '../../../components/Table/Filters/Filters';
import Pagination from '../../../components/Table/Pagination/Pagination';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import './style.css';

function Pacientes() {
    const [lastShowPerPage, setLastShowPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showPerPage, setShowPerPage] = useState(10);
    const [showSpinner, setShowSpinner] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);

    // Search 'Pacientes' when 'page' changes (delay 0s).
    useEffect(() => {
        doSearch();
    }, [page]);

    // Search 'Pacientes' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        doSearch();
    }, [showPerPage]);

    // Search 'Pacientes' when 'searchInput' changes (delay 1s).
    useEffect(() => {
        setPage(1);

        const delayDebounce = setTimeout(() => {
            doSearch();
        }, 750);

        return () => clearTimeout(delayDebounce)
    } , [searchInput]);


    // Function search.
    const doSearch = () => {
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/usuarios',
            type: 'GET',
            dataType: 'json',
            data: {
                'rol': 'paciente',
                'page': page,
                'pagination': showPerPage,
                'search': searchInput,
            },
            success: function (response) {
                setLastShowPerPage(showPerPage);
                setShowSpinner(false);
                setTotalUsers(response.user_count);
                setUsers(response.usuarios);
            },
            error: function (error) {
                setShowSpinner(false);
            }
        });
    }


    // Delete a user.
    const deleteUser = () => {
        $.ajax({
            url: 'http://local.misturnos/api/usuarios/' + userToDelete,
            type: 'DELETE',
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    // Empty #alert message after 3 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);

                    // Reload the 'Pacientes' table.
                    doSearch();

                    // Close modal.
                    $('#closeModal').click();

                    // Show success message.
                    setShowAlert(true);
                }
            }
        });
    }


    return (
        <div id='pageAdminPacientes' className='d-flex'>
            <SideNav />

            <div className='container py-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-secondary me-4'>Pacientes</h1>
                    {showSpinner && <img src={loadingGif} alt="wait until the page loads" height='20px'/>}
                </div>

                {showAlert ? 
                    <Alert
                        type='success'
                        message='Se ha eliminado el usuario correctamente.'
                    />
                        
                    : null
                }

                {totalUsers && totalUsers > 0 ? (
                    <>
                        <Filters 
                            setShowPerPage={setShowPerPage}
                            setSearchInput={setSearchInput}
                        />

                        <table className='table table-striped border box-shadow-dark mt-3'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre y Apellido</th>
                                    <th>Email</th>
                                    <th>DNI</th>
                                    <th>Obra Social</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user, index) => {
                                    if (index < lastShowPerPage) {
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