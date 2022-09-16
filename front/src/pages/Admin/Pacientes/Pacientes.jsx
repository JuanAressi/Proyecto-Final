import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../../components/Alert/Alert';
import Modal from '../../../components/Modal/Modal';
import SideNav from '../../../components/SideNav/SideNav';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import Table from '../../../components/Table/Table';
import NuevoPaciente from './NuevoPaciente';
import EditarPaciente from './EditarPaciente';
import './style.css';

function Pacientes() {
    // Pagination.
    const [lastShowPerPage, setLastShowPerPage] = useState(10);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [showPerPage, setShowPerPage] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [users, setUsers] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);

    // Users.
    const [userToEdit, setUserToEdit] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);

    // Alert. 
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    // Paciente information.
    const [pacienteNombre, setPacienteNombre] = useState('');
    const [pacienteApellido, setPacienteApellido] = useState('');
    const [pacienteDni, setPacienteDni] = useState('');
    const [pacienteEmail, setPacienteEmail] = useState('');
    const [pacienteTelefono, setPacienteTelefono] = useState('');
    const [pacienteFechaNacimiento, setPacienteFechaNacimiento] = useState('');
    const [pacienteGenero, setPacienteGenero] = useState('');
    const [pacienteObraSocial, setPacienteObraSocial] = useState('');


    // Search 'Pacientes' when 'page' changes (delay 0s).
    useEffect(() => {
        doSearch();
    }, [page]);


    // Search 'Pacientes' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        doSearch();
    }, [showPerPage]);


    // Search 'Pacientes' when 'searchInput' changes (delay 0.75s).
    useEffect(() => {
        setPage(1);

        const delayDebounce = setTimeout(() => {
            doSearch();
        }, 750);

        return () => clearTimeout(delayDebounce)
    } , [searchInput]);


    // Get 'Paciente' by ID and complete 'userToEdit' state.
    useEffect(() => {
        // If 'userToEdit' is null, do nothing.
        if (userToEdit !== null) {
            // Show spinner.
            setShowSpinner(true);

            // Loop trough 'users' state to find the 'userToEdit' ID.
            users.forEach(user => {
                if (user.id === userToEdit) {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Complete 'userToEdit' state.
                    setPacienteNombre(user.nombre);
                    setPacienteApellido(user.apellido);
                    setPacienteDni(user.dni);
                    setPacienteEmail(user.email);
                    setPacienteTelefono(user.telefono);
                    setPacienteFechaNacimiento(user.fecha_nacimiento);
                    setPacienteGenero(user.genero);
                    setPacienteObraSocial(user.numero_obra_social);
                }
            });
        }
    }, [userToEdit]);


    // Function search.
    const doSearch = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/pacientes',
            type: 'GET',
            dataType: 'json',
            data: {
                'page': page,
                'pagination': showPerPage,
                'search': searchInput,
            },
            success: function (response) {
                // Scroll to top.
                window.scrollTo(0, 0);

                // Hide spinner.
                setShowSpinner(false);

                setLastShowPerPage(showPerPage);
                setLastPage(page);
                setTotalUsers(response.pacientes_count);
                setUsers(response.pacientes);
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    // Add new 'Paciente'.
    const addPaciente = () => {
        const paciente = {
            nombre: pacienteNombre,
            apellido: pacienteApellido,
            fecha_nacimiento: pacienteFechaNacimiento,
            email: pacienteEmail,
            dni: pacienteDni,
            telefono: pacienteTelefono,
            genero: pacienteGenero,
            obra_social: pacienteObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/pacientes',
            type: 'POST',
            dataType: 'json',
            data: paciente,
            success: function (response) {
                debugger
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Pacientes' list.
                    doSearch();

                    // Show success message.
                    setAlertType('success');
                    setAlertMessage(response.message);
                    setShowAlert(true);

                    // Set values to empty.
                    setEmptyValues();

                    // Close modal.
                    $('#closeModal').click();
                } else {
                    // Show error message.
                    setAlertType('danger');
                    setAlertMessage('Error al crear el Paciente.');
                    setShowAlert(true);
                }
                

                // Close alert message after 4 seconds.
                setTimeout(function () {
                    setShowAlert(false);
                }, 4000);
            },
            error: function (error) {
                setShowSpinner(false);
            }
        });
    }


    // Update 'Paciente'.
    const updatePaciente = () => {
        const paciente = {
            id: userToEdit,
            nombre: pacienteNombre,
            apellido: pacienteApellido,
            fecha_nacimiento: pacienteFechaNacimiento,
            email: pacienteEmail,
            dni: pacienteDni,
            telefono: pacienteTelefono,
            genero: pacienteGenero,
            obra_social: pacienteObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        // Set 'userToEdit' to null.
        setUserToEdit(null);

        $.ajax({
            url: 'http://local.misturnos/api/pacientes/' + userToEdit,
            type: 'PUT',
            dataType: 'json',
            data: paciente,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Pacientes' list.
                    doSearch();

                    // Show success message.
                    setAlertType('success');
                    setAlertMessage(response.message);
                    setShowAlert(true);

                    // Set values to empty.
                    setEmptyValues();

                    // Close modal.
                    $('#closeModalEdit').click();
                } else {
                    // Show error message.
                    setAlertType('danger');
                    setAlertMessage('Error al actualizar el Paciente.');
                    setShowAlert(true);
                }

                // Close alert message after 4 seconds.
                setTimeout(function () {
                    setShowAlert(false);
                }, 4000);
            },
            error: function (error) {
                setShowSpinner(false);
            }
        });
    }


    // Delete a user.
    const deleteUser = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/usuarios/' + userToDelete,
            type: 'DELETE',
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Show success message.
                    setAlertType('success');
                    setAlertMessage('El Paciente ha sido eliminado correctamente.');
                    setShowAlert(true);

                    // Reload the 'Pacientes' table.
                    doSearch();

                    // Close alert message after 4 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                }
            }
        });
    }


    // Set empty values to 'Paciente' fields.
    const setEmptyValues = () => {
        setPacienteNombre('');
        setPacienteApellido('');
        setPacienteFechaNacimiento('');
        setPacienteEmail('');
        setPacienteDni('');
        setPacienteTelefono('');
        setPacienteGenero('');
        setPacienteObraSocial('');
    }


    return (
        <div id='pageAdminPacientes' className='d-flex bg-lightgray'>
            <SideNav
                active='pacientes'
            />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary text-shadow-dark me-4'>Pacientes</h1>

                    <div style={{width: '40px'}}>
                        {showSpinner && <img src={loadingGif} alt="wait until the page loads" height='20px'/>}
                    </div>

                    <button
                        className="btn bg-white text-primary border-primary"
                        data-bs-toggle='modal'
                        data-bs-target={'#modalAdd'}
                    >
                        <FontAwesomeIcon
                            className='text-primary me-1'
                            icon={faPlus}
                        />

                        Agregar Paciente
                    </button>
                </div>

                {showAlert ? 
                    <Alert
                        type={alertType}
                        message={alertMessage}
                    />
                        
                    : null
                }

                <Table
                    lastShowPerPage={lastShowPerPage}
                    lastPage={lastPage}
                    page={page}
                    setPage={setPage}
                    setSearchInput={setSearchInput}
                    setShowPerPage={setShowPerPage}
                    setUserToEdit={setUserToEdit}
                    setUserToDelete={setUserToDelete}
                    showPerPage={showPerPage}  
                    tableHeads={['#', 'Nombre y Apellido', 'Email', 'DNI', 'Acciones']}
                    totalUsers={totalUsers}
                    users={users}
                />
            </div>

            <NuevoPaciente
                pacienteNombre={pacienteNombre}
                pacienteApellido={pacienteApellido}
                pacienteFechaNacimiento={pacienteFechaNacimiento}
                pacienteEmail={pacienteEmail}
                pacienteDni={pacienteDni}
                pacienteTelefono={pacienteTelefono}
                pacienteGenero={pacienteGenero}
                pacienteObraSocial={pacienteObraSocial}
                setPacienteNombre={setPacienteNombre}
                setPacienteApellido={setPacienteApellido}
                setPacienteFechaNacimiento={setPacienteFechaNacimiento}
                setPacienteEmail={setPacienteEmail}
                setPacienteDni={setPacienteDni}
                setPacienteTelefono={setPacienteTelefono}
                setPacienteGenero={setPacienteGenero}
                setPacienteObraSocial={setPacienteObraSocial}
                addPaciente={addPaciente}
            />

            <EditarPaciente
                pacienteNombre={pacienteNombre}
                pacienteApellido={pacienteApellido}
                pacienteFechaNacimiento={pacienteFechaNacimiento}
                pacienteEmail={pacienteEmail}
                pacienteDni={pacienteDni}
                pacienteTelefono={pacienteTelefono}
                pacienteGenero={pacienteGenero}
                pacienteObraSocial={pacienteObraSocial}
                setPacienteNombre={setPacienteNombre}
                setPacienteApellido={setPacienteApellido}
                setPacienteFechaNacimiento={setPacienteFechaNacimiento}
                setPacienteEmail={setPacienteEmail}
                setPacienteDni={setPacienteDni}
                setPacienteTelefono={setPacienteTelefono}
                setPacienteGenero={setPacienteGenero}
                setPacienteObraSocial={setPacienteObraSocial}
                updatePaciente={updatePaciente}
            />

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este paciente?'
                handleDelete={() => {
                    // Close modal.
                    $('#closeModal').click();

                    // Delete the user.
                    deleteUser();
                }}
            />
        </div>
    )
}

export default Pacientes