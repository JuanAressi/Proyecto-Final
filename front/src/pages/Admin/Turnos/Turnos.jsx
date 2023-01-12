import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../../components/Alert/Alert';
import Modal from '../../../components/Modal/Modal';
import SideNav from '../../../components/SideNav/SideNav';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import Table from '../../../components/Table/Table';
import NuevoTurno from './NuevoTurno';
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
    const [turnoMedico, setTurnoMedico] = useState('');
    const [turnoPaciente, setTurnoPaciente] = useState(''); 
    const [turnoFecha, setTurnoFecha] = useState('');
    const [turnoHora, setTurnoHora] = useState('');
    const [turnoFechaDia, setTurnoFechaDia] = useState('');

    // Medicos.
    const [medicos, setMedicos] = useState([]);

    // Pacientes.
    const [pacientes, setPacientes] = useState([]);

    // Search 'Turnos' when 'page' changes (delay 0s).
    useEffect(() => {
        searchTurnos();
    }, [page]);


    // Search 'Turnos' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        searchTurnos();
    }, [showPerPage]);


    // Search 'Turnos' when 'searchInput' changes (delay 0.75s).
    useEffect(() => {
        setPage(1);

        const delayDebounce = setTimeout(() => {
            searchTurnos();
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
                    setTurnoMedico(turno.medico);
                    setTurnoPaciente(turno.paciente);
                    setTurnoFecha(turno.fecha);
                    setTurnoHora(turno.hora);
                    setTurnoFechaDia(turno.fecha_dia);
                }
            });
        }
    }, [turnoToEdit]);


    /**
     * Function searchTurnos - Makes the search of all active 'Turnos'.
     *
     * @return {void}
     */
    const searchTurnos = () => {
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
    

    /**
     * Function searchMedicos - Makes the search of all active 'Medicos'.
     *
     * @return {void}
     */
    const searchMedicos = () => {
        $.ajax({
            url: 'http://local.misturnos/api/medicos',
            type: 'GET',
            dataType: 'json',
            data: {
                'page': '',
                'pagination': '',
                'search': '',
            },
            success: function (response) {
                setMedicos(response.medicos);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    

    /**
     * Function searchPacientes - Makes the search of all active 'Pacientes'.
     *
     * @return {void}
     */
    const searchPacientes = () => {
        $.ajax({
            url: 'http://local.misturnos/api/pacientes',
            type: 'GET',
            dataType: 'json',
            data: {
                'page': '',
                'pagination': '',
                'search': '',
            },
            success: function (response) {
                setPacientes(response.pacientes);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }


    /**
     * Function addTurno - Add a new 'Turno' to the database.
     *
     * @return {void}
     */
    const addTurno = () => {
        const turno = {
            medico: turnoMedico,
            paciente: turnoPaciente,
            fecha: turnoFecha,
            hora: turnoHora,
            fecha_dia: turnoFechaDia,
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
                    searchTurnos();

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


    /**
     * Function updateTurno - Update the 'Turno' information in the database.
     *
     * @return {void}
     */
    const updateTurno = () => {
        const turno = {
            id: turnoToEdit,
            medico: turnoMedico,
            paciente: turnoPaciente,
            fecha: turnoFecha,
            hora: turnoHora,
            fecha_dia: turnoFechaDia,
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
                    searchTurnos();

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
    /**
     * Function deleteTurno - Delete the 'Turno' from the database.
     */
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
                    searchTurnos();

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
        setTurnoMedico('');
        setTurnoPaciente('');
        setTurnoFecha('');
        setTurnoHora('');
        setTurnoFechaDia('');
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
                        onClick={() => {
                            // Clear all the values.
                            setEmptyValues();

                            // Search for the 'Medicos' list.
                            searchMedicos();

                            // Search for the 'Pacientes' list.
                            searchPacientes();
                        }}
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
                    setItemToEdit={setTurnoToEdit}
                    setItemToDelete={setTurnoToDelete}
                    showPerPage={showPerPage}  
                    tableHeads={['#', 'Fecha y Hora', 'Estado', 'Paciente', 'Medico', 'Acciones']}
                    tableKeys={['dia+hora', 'estado', 'paciente_apellido+paciente_nombre', 'medico_apellido+medico_nombre']}
                    totalItems={totalTurnos}
                    items={turnos}
                />
            </div>

            <NuevoTurno
                medicos={medicos}
                pacientes={pacientes}
                turnoMedico={turnoMedico}
                turnoPaciente={turnoPaciente}
                turnoFecha={turnoFecha}
                turnoHora={turnoHora}
                turnoFechaDia={turnoFechaDia}
                setTurnoMedico={setTurnoMedico}
                setTurnoPaciente={setTurnoPaciente}
                setTurnoFecha={setTurnoFecha}
                setTurnoHora={setTurnoHora}
                setTurnoFechaDia={setTurnoFechaDia}
                addTurno={addTurno}
            />

            {/* <EditarTurno
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