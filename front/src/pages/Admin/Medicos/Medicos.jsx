import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../../components/Alert/Alert';
import Modal from '../../../components/Modal/Modal';
import SideNav from '../../../components/SideNav/SideNav';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import Table from '../../../components/Table/Table';
import NuevoMedico from './NuevoMedico';
import EditarMedico from './EditarMedico';

function Medicos() {
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

    // Medico information.
    const [medicoNombre, setMedicoNombre] = useState('');
    const [medicoApellido, setMedicoApellido] = useState('');
    const [medicoDni, setMedicoDni] = useState('');
    const [medicoEmail, setMedicoEmail] = useState('');
    const [medicoTelefono, setMedicoTelefono] = useState('');
    const [medicoFechaNacimiento, setMedicoFechaNacimiento] = useState('');
    const [medicoGenero, setMedicoGenero] = useState('');
    const [medicoObraSocial, setMedicoObraSocial] = useState('');


    // Search 'Medicos' when 'page' changes (delay 0s).
    useEffect(() => {
        doSearch();
    }, [page]);


    // Search 'Medicos' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        doSearch();
    }, [showPerPage]);


    // Search 'Medicos' when 'searchInput' changes (delay 0.75s).
    useEffect(() => {
        setPage(1);

        const delayDebounce = setTimeout(() => {
            doSearch();
        }, 750);

        return () => clearTimeout(delayDebounce)
    } , [searchInput]);


    // Get 'Medico' by ID and complete 'userToEdit' state.
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
                    setMedicoNombre(user.nombre);
                    setMedicoApellido(user.apellido);
                    setMedicoDni(user.dni);
                    setMedicoEmail(user.email);
                    setMedicoTelefono(user.telefono);
                    setMedicoFechaNacimiento(user.fecha_nacimiento);
                    setMedicoGenero(user.genero);
                    setMedicoObraSocial(user.numero_obra_social);
                }
            });
        }
    }, [userToEdit]);


    // Function search.
    const doSearch = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/medicos',
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
                setTotalUsers(response.medicos_count);
                setUsers(response.medicos);
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    // Add new 'Medico'.
    const addMedico = () => {
        const medico = {
            nombre: medicoNombre,
            apellido: medicoApellido,
            fecha_nacimiento: medicoFechaNacimiento,
            email: medicoEmail,
            dni: medicoDni,
            telefono: medicoTelefono,
            genero: medicoGenero,
            obra_social: medicoObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/medicos',
            type: 'POST',
            dataType: 'json',
            data: medico,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Medicos' list.
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
                    setAlertMessage('Error al crear el Medico.');
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


    // Update 'Medico'.
    const updateMedico = () => {
        const medico = {
            id: userToEdit,
            nombre: medicoNombre,
            apellido: medicoApellido,
            fecha_nacimiento: medicoFechaNacimiento,
            email: medicoEmail,
            dni: medicoDni,
            telefono: medicoTelefono,
            genero: medicoGenero,
            obra_social: medicoObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        // Set 'userToEdit' to null.
        setUserToEdit(null);

        $.ajax({
            url: 'http://local.misturnos/api/medicos/' + userToEdit,
            type: 'PUT',
            dataType: 'json',
            data: medico,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Medicos' list.
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
                    setAlertMessage('Error al actualizar el Medico.');
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
                    setAlertMessage('El Medico ha sido eliminado correctamente.');
                    setShowAlert(true);

                    // Reload the 'Medicos' table.
                    doSearch();

                    // Close alert message after 4 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                }
            }
        });
    }


    // Set empty values to 'Medico' fields.
    const setEmptyValues = () => {
        setMedicoNombre('');
        setMedicoApellido('');
        setMedicoFechaNacimiento('');
        setMedicoEmail('');
        setMedicoDni('');
        setMedicoTelefono('');
        setMedicoGenero('');
        setMedicoObraSocial('');
    }


    return (
        <div id='pageAdminMedicos' className='d-flex bg-lightgray'>
            <SideNav
                active='medicos'
            />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary font-weight-100 text-shadow-dark me-4'>Medicos</h1>

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

                        Agregar Medico
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
                    setItemToEdit={setUserToEdit}
                    setItemToDelete={setUserToDelete}
                    showPerPage={showPerPage}  
                    tableHeads={['#', 'Apellido y Nombre', 'Email', 'DNI', 'Acciones']}
                    tableKeys={['apellido+nombre', 'email', 'dni']}
                    totalItems={totalUsers}
                    items={users}
                />
            </div>

            <NuevoMedico
                medicoNombre={medicoNombre}
                medicoApellido={medicoApellido}
                medicoFechaNacimiento={medicoFechaNacimiento}
                medicoEmail={medicoEmail}
                medicoDni={medicoDni}
                medicoTelefono={medicoTelefono}
                medicoGenero={medicoGenero}
                medicoObraSocial={medicoObraSocial}
                setMedicoNombre={setMedicoNombre}
                setMedicoApellido={setMedicoApellido}
                setMedicoFechaNacimiento={setMedicoFechaNacimiento}
                setMedicoEmail={setMedicoEmail}
                setMedicoDni={setMedicoDni}
                setMedicoTelefono={setMedicoTelefono}
                setMedicoGenero={setMedicoGenero}
                setMedicoObraSocial={setMedicoObraSocial}
                addMedico={addMedico}
            />

            <EditarMedico
                medicoNombre={medicoNombre}
                medicoApellido={medicoApellido}
                medicoFechaNacimiento={medicoFechaNacimiento}
                medicoEmail={medicoEmail}
                medicoDni={medicoDni}
                medicoTelefono={medicoTelefono}
                medicoGenero={medicoGenero}
                medicoObraSocial={medicoObraSocial}
                setMedicoNombre={setMedicoNombre}
                setMedicoApellido={setMedicoApellido}
                setMedicoFechaNacimiento={setMedicoFechaNacimiento}
                setMedicoEmail={setMedicoEmail}
                setMedicoDni={setMedicoDni}
                setMedicoTelefono={setMedicoTelefono}
                setMedicoGenero={setMedicoGenero}
                setMedicoObraSocial={setMedicoObraSocial}
                updateMedico={updateMedico}
            />

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este medico?'
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

export default Medicos