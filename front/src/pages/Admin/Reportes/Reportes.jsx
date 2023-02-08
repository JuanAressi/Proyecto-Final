// Utilities.
import { React, useEffect, useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import $ from 'jquery';

// Components.
import SideNav from '../../../components/SideNav/SideNav';
import Alert from '../../../components/Alert/Alert';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import ReporteHistoriaClinica from '../../../components/Reportes/ReporteHistoriaClinica';
import ReporteTurnosProgramados from '../../../components/Reportes/ReporteTurnosProgramados';
import './style.css'

function Reportes() {
    // Utilities.
    const [showSpinner, setShowSpinner] = useState(false);
    const [historiaClinicaBtnDisabled, setHistoriaClinicaBtnDisabled] = useState(true);
    const [turnosBtnDisabled, setTurnosBtnDisabled] = useState(false);
    const [data, setData] = useState(null);

    // Alert. 
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    // Button selected.
    const [selectedButton, setSelectedButton] = useState('historiaClinicaButton');

    // Pacientes.
    const [paciente, setPaciente] = useState('');
    const [pacientes, setPacientes] = useState([]);
    const [pacienteShowList, setPacienteShowList] = useState('d-none');
    const [pacienteMessage, setPacienteMessage] = useState('');
    const [pacienteMessageShow, setPacienteMessageShow] = useState(false);

    // Medicos.
    const [medico, setMedico] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [medicoShowList, setMedicoShowList] = useState('d-none');
    const [medicoMessage, setMedicoMessage] = useState('');
    const [medicoMessageShow, setMedicoMessageShow] = useState(false);

    // Fechas.
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');

    
    // Search 'Medicos' and 'Pacientes' when component loads (delay 0s).
    useEffect(() => {
        searchPacientes();
        searchMedicos();
    }, []);


    /**
     * Function selectReporte - Toggle the classes of the buttons.
     *
     * @param {object} target - The target of the event.
     *
     * @return {void}
     */
    const selectReporte = (target) => {
        // Cheek if the button is already selected.
        if (!target.classList.contains('selected')) {
            // Get the id of the button.
            const id = target.id;

            // Get the elements.
            const historiaClinica = document.getElementById('historiaClinicaButton');
            const turnos = document.getElementById('turnosButton');

            if (id === 'historiaClinicaButton') {
                // Add and remove classes to the buttons
                turnos.classList.remove('bg-primary', 'text-white', 'selected');
                turnos.classList.add('bg-white', 'text-primary', 'border-primary');

                historiaClinica.classList.remove('bg-white', 'text-primary', 'border-primary');
                historiaClinica.classList.add('bg-primary', 'text-white', 'selected');

                // Set the selected button.
                setSelectedButton('historiaClinicaButton');
            } else if (id === 'turnosButton') {
                // Add and remove classes to the buttons
                historiaClinica.classList.remove('bg-primary', 'text-white', 'selected');
                historiaClinica.classList.add('bg-white', 'text-primary', 'border-primary');

                turnos.classList.remove('bg-white', 'text-primary', 'border-primary');
                turnos.classList.add('bg-primary', 'text-white', 'selected');

                // Set the selected button.
                setSelectedButton('turnosButton');
            }
        }
    }


    /**
     * Function searchPacientes - Makes the search of all active 'Pacientes'.
     *
     * @return {void}
     */
    const searchPacientes = () => {
        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'pacientes/historia-clinica',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                setPacientes(response.pacientes);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }


    /**
     * Function pacienteOnFocus - Handle the focus event of the 'Paciente' input. If the 'pacientes' div is hidden, show the message.
     *
     * @return {void}
     */
    const pacienteOnFocus = () => {
        // Show the 'profesionales' div.
        setPacienteShowList('d-flex');

        // Get 'pacientes' div.
        const pacientes = document.getElementById('pacientes');
        const pacientesChildren = pacientes.querySelectorAll('.item');

        let counter = 0;

        // Count how many #pacientes.item are visible and set minimum height of the 'pacientes' div.
        for (let i = 0; i < pacientesChildren.length; i++) {
            if (pacientesChildren[i].classList.contains('d-flex')) {
                // Increment the counter.
                counter++;
            }
        }

        // Set maximum height of the 'pacientes' div.
        if (counter === 1) {
            pacientes.style.maxHeight = '47px';
        } else if (counter === 2) {
            pacientes.style.maxHeight = '94px';
        } else if (counter === 3) {
            pacientes.style.maxHeight = '141px';
        } else if (counter >= 4) {
            pacientes.style.maxHeight = '188px';
        }
    }


    /**
     * Function pacienteOnBlur - Handle the blur event of the 'Medico' input. If the 'profesionales' div is hidden, hide the message.
     *
     * @return {void}
     */
    const pacienteOnBlur = () => {
        setTimeout(() => {
            setPacienteShowList('d-none')
        }, 150);
    }

    
    /**
     * Function filterPacientes - Filters the 'Pacientes' by the selected the given input.
     *
     * @param {string} input - The input to filter by.
     *
     * @return {void}
     */
    const filterPacientes = (input) => {
        // Delete the current 'paciente' in case there is one.
        // setTurnoPaciente('');

        // Remove 'is-valid' class from the 'paciente' input.
        const pacienteInput = document.getElementById('paciente');
        pacienteInput.classList.remove('is-valid');

        // Show pacientesMessage if the input is empty, otherwise, hide it.
        if (input === '') {
            setPacienteMessage('Empieza a escribir para buscar');
            setPacienteMessageShow(true);
        } else {
            setPacienteMessageShow(false);
        }

        // Get the 'pacientes' divs.
        const pacientes = document.getElementById('pacientes');
        const pacientesChildren = pacientes.querySelectorAll('.item');

        // Counters.
        let counter = 0;

        // Loop through the 'pacientesChildren' div.
        for (let i = 0; i < pacientesChildren.length; i++) {
            // If the 'pacientesChildren' div contains the given input, show it, otherwise, hide it.
            if (pacientesChildren[i].innerText.toLowerCase().includes(input.toLowerCase())) {
                // Hide and show the 'pacientesChildren' div.
                pacientesChildren[i].classList.remove('d-none');
                pacientesChildren[i].classList.add('d-flex');

                // Increment the counter.
                counter++;
            } else {
                // Hide and show the 'pacientesChildren' div.
                pacientesChildren[i].classList.remove('d-flex');
                pacientesChildren[i].classList.add('d-none');
            }
        }

        // If the counter is 0, show the 'pacienteMessage', otherwise, hide it.
        if (counter === 0) {
            setPacienteMessage('No se encontraron resultados');
            setPacienteMessageShow(true);

            if (pacientes.classList.contains('d-flex')) {
                setPacienteShowList('d-none');
            }
        } else {
            setPacienteMessageShow(false);

            if (pacientes.classList.contains('d-none')) {
                setPacienteShowList('d-flex');
            }
        }

        // Set maximum height of the 'pacientes' div.
        if (counter === 1) {
            pacientes.style.maxHeight = '47px';
        } else if (counter === 2) {
            pacientes.style.maxHeight = '94px';
        } else if (counter === 3) {
            pacientes.style.maxHeight = '141px';
        } else if (counter >= 4) {
            pacientes.style.maxHeight = '188px';
        }
    }


    /**
     * Function setClickedPaciente - Sets the clicked 'Paciente' as the selected 'Paciente'.
     * 
     * @param {html} target - The clicked 'Paciente' div.
     *
     * @return {void}
     */
    const setClickedPaciente = (target) => {
        // Get the 'data-id' and 'data-position' attribute of the target.
        const id       = target.getAttribute('data-id');
        const position = target.getAttribute('data-position');

        // Get the divs.
        const input = document.getElementById('paciente');

        // Hide the 'profesionales' div.
        setPacienteShowList('d-none');

        // Set 'paciente' state.
        setPaciente(id);

        // Set the 'profesional' input value and the class.
        input.value = pacientes[position].apellido + ', ' + pacientes[position].nombre;
        input.classList.add('is-valid');

        // Enable button.
        setHistoriaClinicaBtnDisabled(false);
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
     * Function medicoOnFocus - Handle the focus event of the 'Medico' input. If the 'profesionales' div is hidden, show the message.
     *
     * @return {void}
     */
    const medicoOnFocus = () => {
        // Show the 'profesionales' div.
        setMedicoShowList('d-flex');

        // Get 'profesionales' div.
        const profesionales = document.getElementById('profesionales');
        const profesionalesChildren = profesionales.querySelectorAll('.item');

        let counter = 0;

        // Count how many #profesionales.item are visible and set minimum height of the 'profesionales' div.
        for (let i = 0; i < profesionalesChildren.length; i++) {
            if (profesionalesChildren[i].classList.contains('d-flex')) {
                // Increment the counter.
                counter++;
            }
        }

        // Set maximum height of the 'profesionales' div.
        if (counter === 1) {
            profesionales.style.maxHeight = '47px';
        } else if (counter === 2) {
            profesionales.style.maxHeight = '94px';
        } else if (counter === 3) {
            profesionales.style.maxHeight = '141px';
        } else if (counter >= 4) {
            profesionales.style.maxHeight = '188px';
        }
    }


    /**
     * Function medicoOnBlur - Handle the blur event of the 'Medico' input. If the 'profesionales' div is hidden, hide the message.
     *
     * @return {void}
     */
    const medicoOnBlur = () => {
        setTimeout(() => {
            setMedicoShowList('d-none')
        }, 150);
    }

    
    /**
     * Function filterMedicos - Filters the 'Medicos' by the selected the given input.
     *
     * @param {string} input - The input to filter by.
     *
     * @return {void}
     */
    const filterMedicos = (input) => {
        // Delete the current 'medico' in case there is one.
        setMedico('');

        // Remove 'is-valid' class from the 'medico' input.
        const medicoInput = document.getElementById('medico');
        medicoInput.classList.remove('is-valid');

        // Show medicosMessage if the input is empty, otherwise, hide it.
        if (input === '') {
            setMedicoMessage('Empieza a escribir para buscar');
            setMedicoMessageShow(true);
        } else {
            setMedicoMessageShow(false);
        }

        // Get the 'profesionales' divs.
        const profesionales = document.getElementById('profesionales');
        const profesionalesChildren = profesionales.querySelectorAll('.item');

        // Counters.
        let counter = 0;

        // Loop through the 'profesionalesChildren' div.
        for (let i = 0; i < profesionalesChildren.length; i++) {
            // If the 'profesionalesChildren' div contains the given input, show it, otherwise, hide it.
            if (profesionalesChildren[i].innerText.toLowerCase().includes(input.toLowerCase())) {
                // Hide and show the 'profesionalesChildren' div.
                profesionalesChildren[i].classList.remove('d-none');
                profesionalesChildren[i].classList.add('d-flex');

                // Increment the counter.
                counter++;
            } else {
                // Hide and show the 'profesionalesChildren' div.
                profesionalesChildren[i].classList.remove('d-flex');
                profesionalesChildren[i].classList.add('d-none');
            }
        }

        // If the counter is 0, show the 'medicoMessage', otherwise, hide it.
        if (counter === 0) {
            setMedicoMessage('No se encontraron resultados');
            setMedicoMessageShow(true);

            if (profesionales.classList.contains('d-flex')) {
                setMedicoShowList('d-none');
            }
        } else {
            setMedicoMessageShow(false);

            if (profesionales.classList.contains('d-none')) {
                setMedicoShowList('d-flex');
            }
        }

        // Set maximum height of the 'profesionales' div.
        if (counter === 1) {
            profesionales.style.maxHeight = '47px';
        } else if (counter === 2) {
            profesionales.style.maxHeight = '94px';
        } else if (counter === 3) {
            profesionales.style.maxHeight = '141px';
        } else if (counter >= 4) {
            profesionales.style.maxHeight = '188px';
        }
    }


    /**
     * Function setClickedMedico - Sets the clicked 'Medico' as the selected 'Medico'.
     *
     * @param {object} target - The clicked 'Medico' div.
     *
     * @return {void}
     */
    const setClickedMedico = (target) => {
        // Get the 'data-id' and 'data-position' attribute of the target.
        const id       = target.getAttribute('data-id');
        const position = target.getAttribute('data-position');

        // Get the divs.
        const input = document.getElementById('medico');

        // Set the id of the 'Medico' as the selected 'Medico'.
        setMedico(id);

        // Set the 'profesional' input value and the class.
        input.value = medicos[position].apellido + ', ' + medicos[position].nombre;
        input.classList.add('is-valid');
    }


    /**
     * Function generarReporte - Generates the specified report.
     *
     * @param {string} report - The report button selected.
     *
     * @return {void}
     */
    const generarReporte = (report) => {
        // Change the 'showSpinner' state.
        setShowSpinner(true);

        // Change the buttons state.
        setHistoriaClinicaBtnDisabled(true);
        setTurnosBtnDisabled(true);
    
        if (report === 'historiaClinicaButton') {
            // Get the 'paciente' input value.
            const pacienteInput = document.getElementById('paciente');

            // If the 'paciente' input is empty, show alert, otherwise, generate the report.
            if (pacienteInput.value === '') {
                setAlertType('danger');
                setAlertMessage('Debe seleccionar un paciente');
                setShowAlert(true);
            } else {
                // Generate the report.
                $.ajax({
                    url: process.env.REACT_APP_API_ROOT + 'reportes/historia-clinica/' + paciente,
                    type: 'GET',
                    dataType: 'json',
                    success: function (response) {
                        // Change the 'showSpinner' state.
                        setShowSpinner(false);

                        if (response.success) {
                            // Change 'data' state.
                            setData(response.data);

                            setTimeout(function () {
                                // Emulate click on the 'historiaClinicaReporte' span parent.
                                document.getElementById('historiaClinicaReporte').parentElement.click();
                            }, 1000);

                            // Change the Alert state.
                            setAlertType('success');
                        } else {
                            // Change the Alert state.
                            setAlertType('danger');
                        }

                        // Change the Alert state.
                        setAlertMessage(response.message);
                        setShowAlert(true);

                        // Close alert message after 4 seconds.
                        setTimeout(function () {
                            setShowAlert(false);
                        }, 4000);
                    },
                    error: function (error) {
                        // Change the 'showSpinner' state.
                        setShowSpinner(false);

                        // Change the 'historiaClinicaBtnDisabled' state.
                        setHistoriaClinicaBtnDisabled(false);

                        // Change the 'turnosBtnDisabled' state.
                        setTurnosBtnDisabled(false);

                        console.log(error);
                    }
                });
            }
        } else if (report === 'turnosButton') {
            // Generate the report.
            $.ajax({
                url: process.env.REACT_APP_API_ROOT + 'reportes/turnos-programados',
                type: 'GET',
                dataType: 'json',
                data: {
                    'fechaDesde': fechaDesde,
                    'fechaHasta': fechaHasta,
                    'medico': medico,
                },
                success: function (response) {
                    // Change the 'showSpinner' state.
                    setShowSpinner(false);

                    // Change 'turnosBtnDisabled' state. 
                    setTurnosBtnDisabled(false);

                    if (response.success) {
                        // Change 'data' state.
                        setData(response.data);

                        setTimeout(function () {
                            // Emulate click on the 'turnosProgramadosReporte' span parent.
                            document.getElementById('turnosProgramadosReporte').parentElement.click();
                        }, 1000);
    
                        // Change the Alert state.
                        setAlertType('success');
                    } else {
                        // Change the Alert state.
                        setAlertType('danger');
                    }

                    // Change the Alert state.
                    setAlertMessage(response.message);
                    setShowAlert(true);

                    // Close alert message after 4 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                },
                error: function (error) {
                    // Change the 'showSpinner' state.
                    setShowSpinner(false);

                    // Change the 'historiaClinicaBtnDisabled' state.
                    setHistoriaClinicaBtnDisabled(false);

                    // Change the 'turnosBtnDisabled' state.
                    setTurnosBtnDisabled(false);

                    console.log(error);
                }
            });
        }
        
        // Change 'data' state.
        setData(null);
    }


    /**
     * Function formatDNI - Formats the DNI input and sets the value.
     *
     * @param  {string} value - The value of the input.
     *
     * @return {void}
     */
    const formatDNI = (value) => {
        let dni = value.replace(/\D/g, '');

        if (dni.length === 4) {
            dni = dni.replace(/(\d{1})/, '$1.');
        } else if (dni.length === 5) {
            dni = dni.replace(/(\d{2})/, '$1.');
        } else if (dni.length === 6) {
            dni = dni.replace(/(\d{3})/, '$1.');
        } else if (dni.length === 7) {
            dni = dni.replace(/(\d{1})(\d{3})/, '$1.$2.');
        } else if (dni.length === 8) {
            dni = dni.replace(/(\d{2})(\d{3})/, '$1.$2.');
        } else if (dni.length === 9) {
            dni = dni.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
        }

        if (dni.length > 10) {
            dni = dni.substring(0, 10);
        }

        return dni;
    }


    // Return the 'Reportes' page.
    return (
        <div id='reportes'className='d-flex bg-lightgray'>
            <SideNav
                active='reportes'
            />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary text-shadow-dark me-4'>Reportes</h1>

                    <div style={{width: '40px'}}>
                        {showSpinner && <img src={loadingGif} alt='Espera a que termine de cargar' height='20px'/>}
                    </div>
                </div>

                {showAlert ? 
                    <Alert
                        type={alertType}
                        message={alertMessage}
                    />
                        
                    : null
                }

                <div className='row d-flex justify-content-center'>
                    <div className='col-sm-12'>
                        <h4 className='text-shadow-dark mb-2'>Selecciona el tipo de reporte</h4>

                        {/* Tipo de reporte */}
                        <div id='tipoReporte' className='d-flex'>
                            <button
                                id='historiaClinicaButton'
                                className='btn bg-primary text-white selected'
                                onClick={(event) => selectReporte(event.target)}
                            >
                                Historia Clinica
                            </button>

                            <button
                                id='turnosButton'
                                className='btn bg-white border-primary text-primary'
                                onClick={(event) => selectReporte(event.target)}
                            >
                                Turnos Programados
                            </button>
                        </div>
                    </div>

                    {
                        // Historia Clinica Report.
                        selectedButton === 'historiaClinicaButton'
                        ? <div className='col-sm-12 mt-6'>
                            {/* Paciente */}
                            <h4 className='text-shadow-dark mb-2'>Selecciona el paciente</h4>

                            <div className='row'>
                                <div className='col-lg-6 col-md-9 col-sm-12 position-relative'>
                                    <input
                                        id='paciente'
                                        className='form-control box-shadow-dark-1'
                                        type='text'
                                        name='paciente'
                                        placeholder='Paciente'
                                        aria-label='Paciente'
                                        autoComplete='off'
                                        onChange={(event) => filterPacientes(event.target.value)}
                                        onFocus={() => pacienteOnFocus()}
                                        onBlur={(event) => pacienteOnBlur(event)}
                                    />

                                    <div id='pacientes' className={pacienteShowList + ' flex-column bg-white box-shadow-dark position-absolute'}>
                                        {pacienteMessageShow &&
                                            <div className='d-flex align-items-center border-bottom py-2 px-3 pacientesMessage'>
                                                <p className='mb-0 text-black'>{pacienteMessage}</p>
                                            </div>
                                        }

                                        {pacientes && pacientes.map((pacienteItem, index) => (
                                            <div
                                                className='d-flex align-items-center border-bottom py-2 px-3 cursor-pointer item'
                                                data-id={pacienteItem.id}
                                                data-position={index}
                                                key={index}
                                                onClick={(e) => setClickedPaciente(e.target)}
                                            >
                                                <p className='mb-0 text-black' style={{pointerEvents: 'none'}}>{pacienteItem.apellido}, {pacienteItem.nombre} - {formatDNI(pacienteItem.dni)}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className='small mt-1 ms-1'>Solo se mostrarán pacientes los cuales tengan cargada al menos un registro de historia clínica</p>
                                </div>
                            </div>

                            {/* Button */}
                            <div className='row mt-5'>
                                <div className='col-lg-6 col-md-9 col-sm-12 text-center'>
                                    <button
                                        id='generarReporteButton'
                                        className='btn bg-primary text-white box-shadow-dark w-66 mb-3'
                                        onClick={() => generarReporte(selectedButton)}
                                        disabled={historiaClinicaBtnDisabled}
                                    >
                                        Generar Reporte y Descargar
                                    </button>
                                </div>
                            </div>
                        </div>
                        // Turnos Report.
                        : selectedButton === 'turnosButton'
                        ? <div className='col-sm-12 mt-6'>
                            {/* Fechas */}
                            <h4 className='text-shadow-dark mb-2'>Selecciona el rango de fechas</h4>

                            <div className='row'>
                                <div className='col-lg-4 col-md-6 col-sm-12'>
                                    <label htmlFor='fechaDesde'>Fecha Desde</label>
                                    
                                    <input
                                        id='fechaDesde'
                                        className='form-control box-shadow-dark-1'
                                        type='date'
                                        name='fechaDesde'
                                        placeholder='Fecha Desde'
                                        aria-label='Fecha Desde'
                                        autoComplete='off'
                                        value={fechaDesde}
                                        onChange={(event) => setFechaDesde(event.target.value)}
                                    />
                                    
                                    <p className='small mt-1 ms-1'>Dejar vacío para no filtrar por fecha desde</p>
                                </div>

                                <div className='col-lg-4 col-md-6 col-sm-12'>
                                    <label htmlFor='fechaHasta'>Fecha Hasta</label>

                                    <input
                                        id='fechaHasta'
                                        className='form-control box-shadow-dark-1'
                                        type='date'
                                        name='fechaHasta'
                                        placeholder='Fecha Hasta'
                                        aria-label='Fecha Hasta'
                                        autoComplete='off'
                                        value={fechaHasta}
                                        onChange={(event) => setFechaHasta(event.target.value)}
                                    />

                                    <p className='small mt-1 ms-1'>Dejar vacío para no filtrar por fecha hasta</p>
                                </div>
                            </div>
                        
                            {/* Medico */}
                            <h4 className='text-shadow-dark mt-2 mb-2'>Selecciona el Profesional</h4>

                            <div className='row'>
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2 position-relative'>
                                    <input
                                        id='medico'
                                        className='form-control box-shadow-dark-1'
                                        type='text'
                                        name='medico'
                                        placeholder='Medico'
                                        aria-label='Medico'
                                        autoComplete='off'
                                        onChange={(event) => filterMedicos(event.target.value)}
                                        onFocus={() => medicoOnFocus()}
                                        onBlur={(event) => medicoOnBlur(event)}
                                    />

                                    <div id='profesionales' className={medicoShowList + ' flex-column bg-white box-shadow-dark position-absolute'}>
                                        {medicoMessageShow &&
                                            <div className='d-flex align-items-center border-bottom py-2 px-3 medicosMessage'>
                                                <p className='mb-0 text-black'>{medicoMessage}</p>
                                            </div>
                                        }

                                        {medicos && medicos.map((medicoItem, index) => (
                                            <div
                                                className='d-flex align-items-center border-bottom py-2 px-3 cursor-pointer item'
                                                data-id={medicoItem.id}
                                                data-position={index}
                                                key={index}
                                                onClick={(e) => setClickedMedico(e.target)}
                                            >
                                                <p className='mb-0 text-black'>{medicoItem.apellido}, {medicoItem.nombre}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <p className='small mt-1 ms-1'>Dejar vacío para no filtrar por médico</p>
                                </div>
                            </div>

                            {/* Button */}
                            <div className='row'>
                                <div className='col-lg-8 col-sm-12 text-center'>
                                    <button
                                        id='generarReporteButton'
                                        className='btn bg-primary text-white box-shadow-dark w-66 mb-3'
                                        onClick={() => generarReporte(selectedButton)}
                                        disabled={turnosBtnDisabled}
                                    >
                                        Generar Reporte y Descargar
                                    </button>
                                </div>
                            </div>
                        </div>
                        : null
                    }

                    {
                        selectedButton === 'historiaClinicaButton'
                        ? (
                            <PDFDownloadLink document={<ReporteHistoriaClinica data={data} />} filename='historia-clinica.pdf'>
                                <span id='historiaClinicaReporte'></span>
                            </PDFDownloadLink>
                        )
                        : selectedButton === 'turnosButton'
                        ? (
                            <PDFDownloadLink document={<ReporteTurnosProgramados data={data} />} filename='turnos-programados.pdf'>
                                <span id='turnosProgramadosReporte'></span>
                            </PDFDownloadLink>
                        )
                        : null
                    }

                    
                </div>
            </div>
        </div>
    )
}

export default Reportes