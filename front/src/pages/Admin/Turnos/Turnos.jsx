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
import './styles.css';
import EditarTurno from './EditarTurno';

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
    const [turnoEstado, setTurnoEstado] = useState('');

    // Medicos.
    const [medicos, setMedicos] = useState([]);

    // Pacientes.
    const [pacientes, setPacientes] = useState([]);

    // Fechas.
    const [fechaEnabled, setFechaEnabled] = useState('disabled');

    // Hora.
    const [horas, setHoras] = useState([
        [{hora: '8:00', estado: 'libre'}, {hora: '8:30', estado: 'libre'}, {hora: '9:00', estado: 'libre'}, {hora: '9:30', estado: 'libre'}, {hora: '10:00', estado: 'libre'}],
        [{hora: '10:30', estado: 'libre'}, {hora: '11:00', estado: 'libre'}, {hora: '11:30', estado: 'libre'}, {hora: '12:00', estado: 'libre'}, {hora: '12:30', estado: 'libre'}],
        [{hora: '13:00', estado: 'libre'}, {hora: '13:30', estado: 'libre'}, {hora: '14:00', estado: 'libre'}, {hora: '14:30', estado: 'libre'}, {hora: '15:00', estado: 'libre'}],
        [{hora: '15:30', estado: 'libre'}, {hora: '16:00', estado: 'libre'}, {hora: '16:30', estado: 'libre'}, {hora: '17:00', estado: 'libre'}, {hora: '17:30', estado: 'libre'}],
    ]);
    const [horaEnabled, setHoraEnabled] = useState('disabled');


    // Search 'Medicos' and 'Pacientes' when component loads (delay 0s).
    useEffect(() => {
        searchMedicos();
        searchPacientes();
    }, []);


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
                    setTurnoFecha(turno.dia);
                    setTurnoHora(turno.hora);
                    setTurnoEstado(turno.estado);
                    setTurnoMedico(turno.medico_apellido + ', ' + turno.medico_nombre);
                    setTurnoPaciente(turno.paciente_apellido + ', ' + turno.paciente_nombre);
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
            url: process.env.REACT_APP_API_ROOT + 'turnos',
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
     * Function searchMedicos - Makes the search of all active 'Medicos'
     *
     * @return {void}
     */
    const searchMedicos = () => {
        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'medicos',
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
            url: process.env.REACT_APP_API_ROOT + 'pacientes',
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
        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'turnos',
            type: 'POST',
            dataType: 'json',
            data: {
                'id_paciente': turnoPaciente,
                'id_medico': turnoMedico,
                'dia': turnoFecha,
                'hora': turnoHora,
                'id_fecha_dia': turnoFechaDia,
            },
            success: function (response) {
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
                    // Show inline error message.
                    const modalMessage = document.getElementById('modalMessage');

                    modalMessage.classList.remove('d-none');
                    modalMessage.classList.add('d-flex');

                    // Remove the modalMessage after 10 seconds.
                    setTimeout(() => {
                        modalMessage.classList.add('d-none');
                        modalMessage.classList.remove('d-flex');
                    }, 10000);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }


    /**
     * Function updateTurno - Update the 'Turno' information in the database.
     *
     * @return {void}
     */
    const updateTurno = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'turnos/' + turnoToEdit,
            type: 'PUT',
            dataType: 'json',
            data: {
                'estado': turnoEstado,
            },
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Reload 'Turnos' list.
                    searchTurnos();

                    // Show success message.
                    setAlertType('success');

                    // Set values to empty.
                    setEmptyValues();
                } else {
                    // Show error message.
                    setAlertType('danger');
                }

                // Close modal.
                $('#closeModalEdit').click();
                
                setAlertMessage(response.message);
                setShowAlert(true);

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
     * Function deleteTurno - Delete the 'Turno' from the database.
     *
     * @return {void}
     */
    const deleteTurno = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'turnos/' + turnoToDelete,
            type: 'DELETE',
            dataType: 'json',
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Show success message.
                    setAlertType('success');

                    // Reload the 'Turnos' table.
                    searchTurnos();
                } else {
                    // Show error message.
                    setAlertType('danger');
                }
                
                // Close modal.
                

                setAlertMessage(response.message);
                setShowAlert(true);

                // Close alert message after 4 seconds.
                setTimeout(function () {
                    setShowAlert(false);
                }, 4000);
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
        setFechaEnabled('disabled');
        setHoraEnabled('disabled');
        setTurnoToEdit(null);
        setTurnoToDelete(null);

        // Empty the inputs.
        const medico   = document.getElementById('medico');
        const paciente = document.getElementById('paciente');

        medico.value   = '';
        paciente.value = '';

        // Remove 'is-valid' class from the inputs.
        medico.classList.remove('is-valid');
        paciente.classList.remove('is-valid');

        // Remove the date selected from the Calendar component.
        const calendar = document.querySelector('.react-calendar__tile.react-calendar__tile--active');

        if (calendar !== null) {
            calendar.classList.remove('react-calendar__tile--active', 'react-calendar__tile--range', 'react-calendar__tile--rangeStart', 'react-calendar__tile--rangeEnd', 'react-calendar__tile--rangeBothEnds');
        }

        // Remove the time selected.
        const tiempo = document.querySelector('#horas .selected');

        if (tiempo !== null) {
            tiempo.classList.remove('selected');
        }

        setHoras([
            [{hora: '8:00', estado: 'libre'}, {hora: '8:30', estado: 'libre'}, {hora: '9:00', estado: 'libre'}, {hora: '9:30', estado: 'libre'}, {hora: '10:00', estado: 'libre'}],
            [{hora: '10:30', estado: 'libre'}, {hora: '11:00', estado: 'libre'}, {hora: '11:30', estado: 'libre'}, {hora: '12:00', estado: 'libre'}, {hora: '12:30', estado: 'libre'}],
            [{hora: '13:00', estado: 'libre'}, {hora: '13:30', estado: 'libre'}, {hora: '14:00', estado: 'libre'}, {hora: '14:30', estado: 'libre'}, {hora: '15:00', estado: 'libre'}],
            [{hora: '15:30', estado: 'libre'}, {hora: '16:00', estado: 'libre'}, {hora: '16:30', estado: 'libre'}, {hora: '17:00', estado: 'libre'}, {hora: '17:30', estado: 'libre'}],
        ]);
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
                        onClick={() => setEmptyValues()}
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
                fechaEnabled={fechaEnabled}
                horas={horas}
                horaEnabled={horaEnabled}
                setTurnoMedico={setTurnoMedico}
                setTurnoPaciente={setTurnoPaciente}
                setTurnoFecha={setTurnoFecha}
                setTurnoHora={setTurnoHora}
                setTurnoFechaDia={setTurnoFechaDia}
                setFechaEnabled={setFechaEnabled}
                setHoras={setHoras}
                setHoraEnabled={setHoraEnabled}
                addTurno={addTurno}
            />

            <EditarTurno
                turnoFecha={turnoFecha}
                turnoHora={turnoHora}
                turnoEstado={turnoEstado}
                turnoMedico={turnoMedico}
                turnoPaciente={turnoPaciente}
                setTurnoEstado={setTurnoEstado}
                updateTurno={updateTurno}
            />

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este turno?'
                handleDelete={() => {
                    // Close modal.
                    $('#closeModalComponent').click();

                    // Delete the turno.
                    deleteTurno();
                }}
            />
        </div>
    )
}

export default Turnos