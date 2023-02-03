// Utilities.
import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Components.
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
    const [pacienteEmail, setPacienteEmail] = useState('');
    const [pacienteFechaNacimiento, setPacienteFechaNacimiento] = useState('');
    const [pacienteGenero, setPacienteGenero] = useState('');
    const [pacienteDni, setPacienteDni] = useState('');
    const [pacienteTelefono, setPacienteTelefono] = useState('');
    const [pacienteObraSocial, setPacienteObraSocial] = useState('');
    const [pacienteNumeroObraSocial, setPacienteNumeroObraSocial] = useState('');
    const [pacienteAntecedentes, setPacienteAntecedentes] = useState('');
    const [pacienteAlergias, setPacienteAlergias] = useState('');
    const [historiaClinica, setHistoriaClinica] = useState([]);

    // User.
    const [role, setRole] = useState(null);

    // Search 'Medicos' and 'Pacientes' when component loads (delay 0s).
    useEffect(() => {
        // Get the user from LocalStorage.
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // Set User states.
            setRole(user.rol);
        }
    }, []);


    // Search 'Pacientes' when 'page' changes (delay 0s).
    useEffect(() => {
        searchPacientes();
    }, [page]);


    // Search 'Pacientes' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        searchPacientes();
    }, [showPerPage]);


    // Search 'Pacientes' when 'searchInput' changes (delay 0.75s).
    useEffect(() => {
        setPage(1);

        const delayDebounce = setTimeout(() => {
            searchPacientes();
        }, 750);

        return () => clearTimeout(delayDebounce)
    } , [searchInput]);


    // Get 'Paciente' by ID and complete 'userToEdit' state.
    useEffect(() => {
        // If 'userToEdit' is null, do nothing.
        if (userToEdit !== null) {
            // Show spinner.
            setShowSpinner(true);

            // Make search for 'Historia Clinica' by ID.
            searchHistoriaClinica();

            // Loop trough 'users' state to find the user and obtain his information.
            users.forEach(user => {
                if (user.id === userToEdit) {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Complete 'userToEdit' state.
                    setPacienteNombre(user.nombre);
                    setPacienteApellido(user.apellido);
                    setPacienteEmail(user.email);
                    setPacienteFechaNacimiento(user.fecha_nacimiento);
                    setPacienteGenero(user.genero);
                    setPacienteDni(user.dni);
                    setPacienteTelefono(user.telefono);
                    setPacienteObraSocial(user.obra_social);
                    setPacienteNumeroObraSocial(user.numero_obra_social);
                    setPacienteNumeroObraSocial(user.numero_obra_social);
                    setPacienteAntecedentes(user.antecedentes);
                    setPacienteAlergias(user.alergias);
                }
            });
        }
    }, [userToEdit]);


    /**
     * Function searchPacientes - Makes the search of all active 'Pacientes'
     *
     * @return {void}
     */
    const searchPacientes = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'pacientes',
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


    /**
     * Function addPaciente - Add a new 'Paciente' to the database.
     *
     * @return {void}
     */
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
            numero_obra_social: pacienteNumeroObraSocial,
            antecedentes: pacienteAntecedentes,
            alergias: pacienteAlergias,
        }

        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'pacientes',
            type: 'POST',
            dataType: 'json',
            data: paciente,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Pacientes' list.
                    searchPacientes();

                    // Change Alert states.
                    setAlertType('success');

                    // Set values to empty.
                    setEmptyValues();

                    // Close modal.
                    $('#closeModal').click();
                } else {
                    // Change Alert states.
                    setAlertType('danger');
                }

                // Change Alert states.
                setShowAlert(true);
                setAlertMessage(response.message);
                

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
     * Function updatePaciente - Update a 'Paciente' in the database.
     *
     * @return {void}
     */
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
            url: process.env.REACT_APP_API_ROOT + 'pacientes/' + userToEdit,
            type: 'PUT',
            dataType: 'json',
            data: paciente,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Pacientes' list.
                    searchPacientes();

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


    /**
     * Function deleteUser - Delete a 'Paciente' from the database.
     *
     * @return {void}
     */
    const deleteUser = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'usuarios/' + userToDelete,
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
                    searchPacientes();

                    // Close alert message after 4 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                }
            }
        });
    }


    /**
     * Function setEmptyValues - Set all the values to empty.
     *
     * @return {void}
     */
    const setEmptyValues = () => {
        setPacienteNombre('');
        setPacienteApellido('');
        setPacienteFechaNacimiento('');
        setPacienteEmail('');
        setPacienteDni('');
        setPacienteTelefono('');
        setPacienteGenero('');
        setPacienteObraSocial('');
        setPacienteAlergias('');
        setPacienteAntecedentes('');
    }
    

    /**
     * Function searchHistoriaClinica - Search the historia clinica of the selected paciente.
     *
     * @return {void}
     */
    const searchHistoriaClinica = () => {
        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'pacientes/' + userToEdit + '/historia-clinica',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Set 'historiaClinica' state.
                    setHistoriaClinica(response.historia_clinica);
                }
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    // Render the 'Pacientes' page.
    return (
        <div id='pageAdminPacientes' className='d-flex bg-lightgray'>
            <SideNav
                active='pacientes'
            />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary text-shadow-dark me-4'>Pacientes</h1>

                    <div style={{width: '40px'}}>
                        {showSpinner && <img src={loadingGif} alt='Espera a que termine de cargar' height='20px'/>}
                    </div>

                    {
                        role !== null && (role === 'administrativo' || role === 'admin' || role === 'soporte')
                        ? (

                            <button
                                className='btn bg-white text-primary border-primary'
                                data-bs-toggle='modal'
                                data-bs-target='#modalAdd'
                            >
                                <FontAwesomeIcon
                                    className='text-primary me-1'
                                    icon={faPlus}
                                />
        
                                Agregar Paciente
                            </button>
                        )
                        : null
                    }
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

            <NuevoPaciente
                pacienteNombre={pacienteNombre}
                pacienteApellido={pacienteApellido}
                pacienteEmail={pacienteEmail}
                pacienteFechaNacimiento={pacienteFechaNacimiento}
                pacienteGenero={pacienteGenero}
                pacienteDni={pacienteDni}
                pacienteTelefono={pacienteTelefono}
                pacienteObraSocial={pacienteObraSocial}
                pacienteNumeroObraSocial={pacienteNumeroObraSocial}
                pacienteAntecedentes={pacienteAntecedentes}
                pacienteAlergias={pacienteAlergias}
                setPacienteNombre={setPacienteNombre}
                setPacienteApellido={setPacienteApellido}
                setPacienteEmail={setPacienteEmail}
                setPacienteFechaNacimiento={setPacienteFechaNacimiento}
                setPacienteGenero={setPacienteGenero}
                setPacienteDni={setPacienteDni}
                setPacienteTelefono={setPacienteTelefono}
                setPacienteObraSocial={setPacienteObraSocial}
                setPacienteNumeroObraSocial={setPacienteNumeroObraSocial}
                setPacienteAntecedentes={setPacienteAntecedentes}
                setPacienteAlergias={setPacienteAlergias}
                addPaciente={addPaciente}
            />

            <EditarPaciente
                userToEdit={userToEdit}
                pacienteNombre={pacienteNombre}
                pacienteApellido={pacienteApellido}
                pacienteEmail={pacienteEmail}
                pacienteFechaNacimiento={pacienteFechaNacimiento}
                pacienteGenero={pacienteGenero}
                pacienteDni={pacienteDni}
                pacienteTelefono={pacienteTelefono}
                pacienteObraSocial={pacienteObraSocial}
                pacienteNumeroObraSocial={pacienteNumeroObraSocial}
                pacienteAntecedentes={pacienteAntecedentes}
                pacienteAlergias={pacienteAlergias}
                historiaClinica={historiaClinica}
                setPacienteNombre={setPacienteNombre}
                setPacienteApellido={setPacienteApellido}
                setPacienteEmail={setPacienteEmail}
                setPacienteFechaNacimiento={setPacienteFechaNacimiento}
                setPacienteGenero={setPacienteGenero}
                setPacienteDni={setPacienteDni}
                setPacienteTelefono={setPacienteTelefono}
                setPacienteObraSocial={setPacienteObraSocial}
                setPacienteNumeroObraSocial={setPacienteNumeroObraSocial}
                setPacienteAntecedentes={setPacienteAntecedentes}
                setPacienteAlergias={setPacienteAlergias}
                setHistoriaClinica={setHistoriaClinica}
                updatePaciente={updatePaciente}
                searchHistoriaClinica={searchHistoriaClinica}
            />

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este paciente?'
                handleDelete={() => {
                    // Close modal.
                    $('#modalDelete#closeModalComponent').click();

                    // Delete the user.
                    deleteUser();
                }}
            />
        </div>
    )
}

export default Pacientes