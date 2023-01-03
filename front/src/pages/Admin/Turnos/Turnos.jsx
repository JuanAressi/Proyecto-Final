import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../../components/Alert/Alert';
import Modal from '../../../components/Modal/Modal';
import SideNav from '../../../components/SideNav/SideNav';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import Table from '../../../components/Table/Table';
// import NuevoTurno from './NuevoTurno';
// import EditarTurno from './EditarTurno';

function Turnos() {
    // Pagination.
    const [lastShowPerPage, setLastShowPerPage] = useState(10);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [showPerPage, setShowPerPage] = useState(10);
    const [totalTurnos, setTotalTurnos] = useState(0);
    const [turnos, setTurnos] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);

    // Turnos.
    const [turnoToEdit, setTurnoToEdit] = useState(null);
    const [turnoToDelete, setTurnoToDelete] = useState(null);

    // Alert. 
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    // Turno information.
    const [turnoNombre, setTurnoNombre] = useState('');
    const [turnoApellido, setTurnoApellido] = useState('');
    const [turnoDni, setTurnoDni] = useState('');
    const [turnoEmail, setTurnoEmail] = useState('');
    const [turnoTelefono, setTurnoTelefono] = useState('');
    const [turnoFechaNacimiento, setTurnoFechaNacimiento] = useState('');
    const [turnoGenero, setTurnoGenero] = useState('');
    const [turnoObraSocial, setTurnoObraSocial] = useState('');


    // Search 'Turnos' when 'page' changes (delay 0s).
    useEffect(() => {
        doSearch();
    }, [page]);


    // Search 'Turnos' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        doSearch();
    }, [showPerPage]);


    // Search 'Turnos' when 'searchInput' changes (delay 0.75s).
    useEffect(() => {
        setPage(1);

        const delayDebounce = setTimeout(() => {
            doSearch();
        }, 750);

        return () => clearTimeout(delayDebounce)
    } , [searchInput]);


    // Get 'Turno' by ID and complete 'turnoToEdit' state.
    useEffect(() => {
        // If 'turnoToEdit' is null, do nothing.
        if (turnoToEdit !== null) {
            // Show spinner.
            setShowSpinner(true);

            // Loop trough 'turnos' state to find the 'turnoToEdit' ID.
            turnos.forEach(turno => {
                if (turno.id === turnoToEdit) {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Complete 'turnoToEdit' state.
                    setTurnoNombre(turno.nombre);
                    setTurnoApellido(turno.apellido);
                    setTurnoDni(turno.dni);
                    setTurnoEmail(turno.email);
                    setTurnoTelefono(turno.telefono);
                    setTurnoFechaNacimiento(turno.fecha_nacimiento);
                    setTurnoGenero(turno.genero);
                    setTurnoObraSocial(turno.numero_obra_social);
                }
            });
        }
    }, [turnoToEdit]);


    // Function search.
    const doSearch = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/turnos',
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

                debugger;

                setLastShowPerPage(showPerPage);
                setLastPage(page);
                setTotalTurnos(response.turnos_count);
                setTurnos(response.turnos);
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    // Add new 'Turno'.
    const addTurno = () => {
        const turno = {
            nombre: turnoNombre,
            apellido: turnoApellido,
            fecha_nacimiento: turnoFechaNacimiento,
            email: turnoEmail,
            dni: turnoDni,
            telefono: turnoTelefono,
            genero: turnoGenero,
            obra_social: turnoObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/turnos',
            type: 'POST',
            dataType: 'json',
            data: turno,
            success: function (response) {
                debugger
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Turnos' list.
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
                    setAlertMessage('Error al crear el Turno.');
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


    // Update 'Turno'.
    const updateTurno = () => {
        const turno = {
            id: turnoToEdit,
            nombre: turnoNombre,
            apellido: turnoApellido,
            fecha_nacimiento: turnoFechaNacimiento,
            email: turnoEmail,
            dni: turnoDni,
            telefono: turnoTelefono,
            genero: turnoGenero,
            obra_social: turnoObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        // Set 'turnoToEdit' to null.
        setTurnoToEdit(null);

        $.ajax({
            url: 'http://local.misturnos/api/turnos/' + turnoToEdit,
            type: 'PUT',
            dataType: 'json',
            data: turno,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Turnos' list.
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
                    setAlertMessage('Error al actualizar el Turno.');
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


    // Delete a turno.
    const deleteTurno = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/usuarios/' + turnoToDelete,
            type: 'DELETE',
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Show success message.
                    setAlertType('success');
                    setAlertMessage('El Turno ha sido eliminado correctamente.');
                    setShowAlert(true);

                    // Reload the 'Turnos' table.
                    doSearch();

                    // Close alert message after 4 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                }
            }
        });
    }


    // Set empty values to 'Turno' fields.
    const setEmptyValues = () => {
        setTurnoNombre('');
        setTurnoApellido('');
        setTurnoFechaNacimiento('');
        setTurnoEmail('');
        setTurnoDni('');
        setTurnoTelefono('');
        setTurnoGenero('');
        setTurnoObraSocial('');
    }


    return (
        <div id='pageAdminTurnos' className='d-flex bg-lightgray'>
            <SideNav
                active='turnos'
            />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary text-shadow-dark me-4'>Turnos</h1>

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

                        Agregar Turno
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
                    setTurnoToEdit={setTurnoToEdit}
                    setTurnoToDelete={setTurnoToDelete}
                    showPerPage={showPerPage}  
                    tableHeads={['#', 'Fecha', 'Hora', 'Estado', 'Paciente', 'Medico', 'Acciones']}
                    tableKeys={['id', 'fecha', 'hora', 'estado', 'paciente_nombre', 'paciente_apellido', 'medico_nombre', 'medico_apellido',]}
                    totalTurnos={totalTurnos}
                    turnos={turnos}
                />
            </div>

            {/* <NuevoTurno
                turnoNombre={turnoNombre}
                turnoApellido={turnoApellido}
                turnoFechaNacimiento={turnoFechaNacimiento}
                turnoEmail={turnoEmail}
                turnoDni={turnoDni}
                turnoTelefono={turnoTelefono}
                turnoGenero={turnoGenero}
                turnoObraSocial={turnoObraSocial}
                setTurnoNombre={setTurnoNombre}
                setTurnoApellido={setTurnoApellido}
                setTurnoFechaNacimiento={setTurnoFechaNacimiento}
                setTurnoEmail={setTurnoEmail}
                setTurnoDni={setTurnoDni}
                setTurnoTelefono={setTurnoTelefono}
                setTurnoGenero={setTurnoGenero}
                setTurnoObraSocial={setTurnoObraSocial}
                addTurno={addTurno}
            />

            <EditarTurno
                turnoNombre={turnoNombre}
                turnoApellido={turnoApellido}
                turnoFechaNacimiento={turnoFechaNacimiento}
                turnoEmail={turnoEmail}
                turnoDni={turnoDni}
                turnoTelefono={turnoTelefono}
                turnoGenero={turnoGenero}
                turnoObraSocial={turnoObraSocial}
                setTurnoNombre={setTurnoNombre}
                setTurnoApellido={setTurnoApellido}
                setTurnoFechaNacimiento={setTurnoFechaNacimiento}
                setTurnoEmail={setTurnoEmail}
                setTurnoDni={setTurnoDni}
                setTurnoTelefono={setTurnoTelefono}
                setTurnoGenero={setTurnoGenero}
                setTurnoObraSocial={setTurnoObraSocial}
                updateTurno={updateTurno}
            /> */}

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este turno?'
                handleDelete={() => {
                    // Close modal.
                    $('#closeModal').click();

                    // Delete the turno.
                    deleteTurno();
                }}
            />
        </div>
    )
}

export default Turnos