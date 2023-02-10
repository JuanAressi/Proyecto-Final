import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../../components/Alert/Alert';
import Modal from '../../../components/Modal/Modal';
import SideNav from '../../../components/SideNav/SideNav';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import Table from '../../../components/Table/Table';
import NuevoPersonal from './NuevoPersonal';
import EditarPersonal from './EditarPersonal';

function Personal() {
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

    // Personal information.
    const [personalNombre, setPersonalNombre] = useState('');
    const [personalApellido, setPersonalApellido] = useState('');
    const [personalEmail, setPersonalEmail] = useState('');
    const [personalFechaNacimiento, setPersonalFechaNacimiento] = useState('');
    const [personalFechaNacimientoFormatted, setPersonalFechaNacimientoFormatted] = useState('');
    const [personalGenero, setPersonalGenero] = useState('');
    const [personalDni, setPersonalDni] = useState('');
    const [personalTelefono, setPersonalTelefono] = useState('');
    const [personalRol, setPersonalRol] = useState('');


    // Search 'Personal' when 'page' changes (delay 0s).
    useEffect(() => {
        // Search 'Personal'.
        searchPersonal();
    }, [page]);


    // Search 'Personal' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        // Change 'page' state.
        setPage(1);
        
        // Search 'Personal'.
        searchPersonal();
    }, [showPerPage]);


    // Search 'Personal' when 'searchInput' changes (delay 0.75s).
    useEffect(() => {
        // Change 'page' state.
        setPage(1);

        const delayDebounce = setTimeout(() => {
            // Search 'Personal'.
            searchPersonal();
        }, 750);

        return () => clearTimeout(delayDebounce)
    } , [searchInput]);


    // Get 'Personal' by ID and complete 'userToEdit' state.
    useEffect(() => {
        // If 'userToEdit' is null, do nothing.
        if (userToEdit !== null) {
            // Change Spinner state.
            setShowSpinner(true);

            // Loop trough 'users' state to find the 'userToEdit' ID.
            users.forEach(user => {
                if (user.id === userToEdit) {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Complete 'userToEdit' state.
                    setPersonalNombre(user.nombre);
                    setPersonalApellido(user.apellido);
                    setPersonalEmail(user.email);
                    setPersonalFechaNacimiento(user.fecha_nacimiento);
                    setPersonalGenero(user.genero);
                    setPersonalDni(user.dni);
                    setPersonalTelefono(user.telefono);
                    setPersonalRol(user.rol);
                }
            });
        }
    }, [userToEdit]);


    // Transform 'personalFechaNacimiento' state to 'personalFechaNacimientoFormatted' state.
    useEffect(() => {
        // The 'personalFechaNacimiento' state comes in the format 'dd-mm-yyyy', so we need to convert it to 'yyyy-mm-dd' to be able to use it in the 'input' element.
        const date  = new Date(personalFechaNacimiento);
        const year  = date.getFullYear();
        const month = date.getMonth() + 1;
        const day   = date.getDate();

        const personalFechaNacimientoFormatted = `${year}-${month < 10 ? `0${month}` : `${month}`}-${day < 10 ? `0${day}` : `${day}`}`;

        // Change 'personalFechaNacimiento' state.
        setPersonalFechaNacimientoFormatted(personalFechaNacimientoFormatted);
    }, [personalFechaNacimiento]);


    /**
     * Function searchPersonal - Search all the users that are 'Administrativos' or 'Medicos'.
     *
     * @return {void}
     */
    const searchPersonal = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'personal',
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
                setTotalUsers(response.user_count);
                setUsers(response.personal);
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    ////////////// Add new 'Personal'.
    const addPersonal = () => {
        const personal = {
            nombre: personalNombre,
            apellido: personalApellido,
            fecha_nacimiento: personalFechaNacimiento,
            email: personalEmail,
            dni: personalDni,
            telefono: personalTelefono,
            genero: personalGenero,
            // obra_social: personalObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'personal',
            type: 'POST',
            dataType: 'json',
            data: personal,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Personal' list.
                    searchPersonal();

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
                    setAlertMessage('Error al crear el Personal.');
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


    ////////////// Update 'Personal'.
    const updatePersonal = () => {
        const personal = {
            id: userToEdit,
            nombre: personalNombre,
            apellido: personalApellido,
            fecha_nacimiento: personalFechaNacimiento,
            email: personalEmail,
            dni: personalDni,
            telefono: personalTelefono,
            genero: personalGenero,
        }

        // Show spinner.
        setShowSpinner(true);

        // Set 'userToEdit' to null.
        setUserToEdit(null);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + '/medicos/' + userToEdit,
            type: 'PUT',
            dataType: 'json',
            data: personal,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Personal' list.
                    searchPersonal();

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


    /**
     * Function deleteUser - Delete the selected user from the database.
     *
     * @return {void}
     */
    const deleteUser = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + '/usuarios/' + userToDelete,
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

                    // Reload the 'Personal' table.
                    searchPersonal();

                    // Close alert message after 4 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                }
            }
        });
    }


    /**
     * Function setEmptyValues - Changes the states of all the values of the forms.
     *
     * @return {void}
     */
    const setEmptyValues = () => {
        // Change the personal states.
        setPersonalNombre('');
        setPersonalApellido('');
        setPersonalEmail('');
        setPersonalFechaNacimiento('');
        setPersonalGenero('');
        setPersonalDni('');
        setPersonalTelefono('');
        setPersonalRol('');
    }


    // Render the 'Personal' page.
    return (
        <div id='pageAdminMedicos' className='d-flex bg-lightgray'>
            <SideNav
                active='personal'
            />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary text-shadow-dark me-4'>Personal</h1>

                    <div style={{width: '40px'}}>
                        {showSpinner && <img src={loadingGif} alt='Espera a que termine de cargar' height='20px'/>}
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

                        Agregar Personal
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
                    tableHeads={['#', 'Apellido y Nombre', 'Email', 'DNI', 'Rol', 'Acciones']}
                    tableKeys={['apellido+nombre', 'email', 'dni', 'rol']}
                    totalItems={totalUsers}
                    items={users}
                />
            </div>

            <NuevoPersonal
                personalNombre={personalNombre}
                personalApellido={personalApellido}
                personalEmail={personalEmail}
                personalFechaNacimiento={personalFechaNacimiento}
                personalGenero={personalGenero}
                personalDni={personalDni}
                personalTelefono={personalTelefono}
                personalRol={personalRol}
                setPersonalNombre={setPersonalNombre}
                setPersonalApellido={setPersonalApellido}
                setPersonalEmail={setPersonalEmail}
                setPersonalFechaNacimiento={setPersonalFechaNacimiento}
                setPersonalGenero={setPersonalGenero}
                setPersonalDni={setPersonalDni}
                setPersonalTelefono={setPersonalTelefono}
                setPersonalRol={setPersonalRol}
                addPersonal={addPersonal}
            />

            <EditarPersonal
                personalNombre={personalNombre}
                personalApellido={personalApellido}
                personalEmail={personalEmail}
                personalFechaNacimiento={personalFechaNacimiento}
                personalFechaNacimientoFormatted={personalFechaNacimientoFormatted}
                personalGenero={personalGenero}
                personalDni={personalDni}
                personalTelefono={personalTelefono}
                personalRol={personalRol}
                setPersonalNombre={setPersonalNombre}
                setPersonalApellido={setPersonalApellido}
                setPersonalEmail={setPersonalEmail}
                setPersonalFechaNacimiento={setPersonalFechaNacimiento}
                setPersonalFechaNacimientoFormatted={setPersonalFechaNacimientoFormatted}
                setPersonalGenero={setPersonalGenero}
                setPersonalDni={setPersonalDni}
                setPersonalTelefono={setPersonalTelefono}
                setPersonalRol={setPersonalRol}
                updatePersonal={updatePersonal}
            />

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este usuario?'
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

export default Personal