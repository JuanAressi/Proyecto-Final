import { React, useState } from 'react';
import $ from 'jquery';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faX } from '@fortawesome/free-solid-svg-icons';

function NuevoTurno( { medicos, pacientes, turnoMedico, turnoPaciente, turnoFecha, turnoHora, fechaEnabled, horas, horaEnabled, setTurnoMedico, setTurnoPaciente, setTurnoFecha, setTurnoHora, setTurnoFechaDia, setFechaEnabled, setHoras, setHoraEnabled, addTurno } ) {
    // Medicos.
    const [medicoShowList, setMedicoShowList] = useState('d-none');
    const [medicoMessage, setMedicoMessage] = useState('');
    const [medicoMessageShow, setMedicoMessageShow] = useState(false);

    // Pacientes.
    const [pacienteShowList, setPacienteShowList] = useState('d-none');
    const [pacienteMessage, setPacienteMessage] = useState('');
    const [pacienteMessageShow, setPacienteMessageShow] = useState(false);

    // Fechas.
    const [fechas, setFechas] = useState([]);
    const [fechaMax, setFechaMax] = useState('');


    /**
     * Function medicoOnFocus - Handle the focus event of the 'Medico' input. If the 'especialistas' div is hidden, show the message.
     *
     * @return {void}
     */
    const medicoOnFocus = () => {
        // Show the 'especialistas' div.
        setMedicoShowList('d-flex');

        // Get 'eoespecialistas' div.
        const especialistas = document.getElementById('especialistas');
        const especialistasChildren = especialistas.querySelectorAll('.item');

        let counter = 0;

        // Count how many #especialistas.item are visible and set minimum height of the 'especialistas' div.
        for (let i = 0; i < especialistasChildren.length; i++) {
            if (especialistasChildren[i].classList.contains('d-flex')) {
                // Increment the counter.
                counter++;
            }
        }

        // Set maximum height of the 'especialistas' div.
        if (counter === 1) {
            especialistas.style.maxHeight = '47px';
        } else if (counter === 2) {
            especialistas.style.maxHeight = '94px';
        } else if (counter === 3) {
            especialistas.style.maxHeight = '141px';
        } else if (counter >= 4) {
            especialistas.style.maxHeight = '188px';
        }
    }


    /**
     * Function medicoOnBlur - Handle the blur event of the 'Medico' input. If the 'especialistas' div is hidden, hide the message.
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
        setTurnoMedico('');
        
        // Disable the 'Calendar' container.
        setFechaEnabled('disabled');

        // Disable the 'Horas' container.
        setHoraEnabled('disabled');

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

        // Get the 'especialistas' divs.
        const especialistas = document.getElementById('especialistas');
        const especialistasChildren = especialistas.querySelectorAll('.item');

        // Counters.
        let counter = 0;

        // Loop through the 'especialistasChildren' div.
        for (let i = 0; i < especialistasChildren.length; i++) {
            // If the 'especialistasChildren' div contains the given input, show it, otherwise, hide it.
            if (especialistasChildren[i].innerText.toLowerCase().includes(input.toLowerCase())) {
                // Hide and show the 'especialistasChildren' div.
                especialistasChildren[i].classList.remove('d-none');
                especialistasChildren[i].classList.add('d-flex');

                // Increment the counter.
                counter++;
            } else {
                // Hide and show the 'especialistasChildren' div.
                especialistasChildren[i].classList.remove('d-flex');
                especialistasChildren[i].classList.add('d-none');
            }
        }

        // If the counter is 0, show the 'medicoMessage', otherwise, hide it.
        if (counter === 0) {
            setMedicoMessage('No se encontraron resultados');
            setMedicoMessageShow(true);

            if (especialistas.classList.contains('d-flex')) {
                setMedicoShowList('d-none');
            }
        } else {
            setMedicoMessageShow(false);

            if (especialistas.classList.contains('d-none')) {
                setMedicoShowList('d-flex');
            }
        }

        // Set maximum height of the 'especialistas' div.
        if (counter === 1) {
            especialistas.style.maxHeight = '47px';
        } else if (counter === 2) {
            especialistas.style.maxHeight = '94px';
        } else if (counter === 3) {
            especialistas.style.maxHeight = '141px';
        } else if (counter >= 4) {
            especialistas.style.maxHeight = '188px';
        }
    }


    /**
     * Function setClickedMedico - Sets the clicked 'Medico' as the selected 'Medico'.
     * 
     * @param {html} target - The clicked 'Medico' div.
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
        setTurnoMedico(id);

        // Get the dates for the selected 'Medico'.
        getFechas(id);

        // Hide the 'especialistas' div.
        setMedicoShowList('d-none');

        // Set the 'especialista' input value and the class.
        input.value = medicos[position].apellido + ', ' + medicos[position].nombre;
        input.classList.add('is-valid');

        // Enable the 'Calendar' container.
        setFechaEnabled('');
    }


    /**
     * Function getFechas - Make an ajax request to get all the days available for the selected 'Medico'.
     *
     * @param {int} id - The id of the selected 'Medico'.
     *
     * @return {void}
     */
    const getFechas = (id) => {
        $.ajax({
            url: `http://local.misturnos/api/medicos/${id}/fechas`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Set the 'fechas' state.
                setFechas(response.fechas);

                // Transform the last date to a date object and set it as the 'fechaMax' state.
                const lastDate       = response.fechas[response.fechas.length - 1].dia.split('-');
                const lastDateObject = new Date(`${lastDate[1]}-${lastDate[0]}-${lastDate[2]}`);

                setFechaMax(lastDateObject);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };


    /**
     * Function pacienteOnFocus - Handle the focus event of the 'Paciente' input. If the 'pacientes' div is hidden, show the message.
     *
     * @return {void}
     */
    const pacienteOnFocus = () => {
        // Show the 'especialistas' div.
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
     * Function pacienteOnBlur - Handle the blur event of the 'Medico' input. If the 'especialistas' div is hidden, hide the message.
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
        setTurnoPaciente('');

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

        // Set the id of the 'Paciente' as the selected 'Paciente'.
        setTurnoPaciente(id);

        // Hide the 'especialistas' div.
        setPacienteShowList('d-none');

        // Set the 'especialista' input value and the class.
        input.value = pacientes[position].apellido + ', ' + pacientes[position].nombre;
        input.classList.add('is-valid');
    }


    /**
     * Function setClickedFecha - Set the clicked date as the selected date.
     *
     * @param {date} date - The selected date.
     *
     * @return {void}
     */
    const setClickedFecha = (date) => {
        // Get the date selected in the format 'dd-mm-yyyy'.
        const día   = date.getDate().toString().padStart(2, '0');
        const mes   = (date.getMonth() + 1).toString().padStart(2, '0');
        const año   = date.getFullYear();
        const fecha = día + '-' + mes + '-' + año;

        // Set the date selected.
        setTurnoFecha(fecha);

        // Loop trough the 'fechas' array to get the id of the selected date.
        let idFechasDias = '';

        for (let i = 0; i < fechas.length; i++) {
            // If the date selected is equal to the date in the array, save the index.
            if (fechas[i].dia === fecha) {
                idFechasDias = fechas[i].id;

                break;
            }
        }

        // Set the idFechasDuas state.
        setTurnoFechaDia(idFechasDias);

        // Get the hours for the given date.
        getHoras(idFechasDias);
    }


    /**
     * Function getHoras - Make an ajax request to get all the hours available for the selected 'Medico'.
     *
     * @param {string} date - The date selected.
     *
     * @return {void}
     */
    const getHoras = (date) => {
        // Enable the 'Hora' container.
        setHoraEnabled('disabled');

        $.ajax({
            url: `http://local.misturnos/api/medicos/${date}/horas`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Enable the 'Hora' container.
                setHoraEnabled('');

                // Set the 'horas' state.
                setHoras(response.horas);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };


    /**
     * Function setClickedHora - Sets the clicked 'Hora' as the selected 'Hora'.
     *
     * @param {html} target - The clicked 'Hora' div.
     *
     * @return {void}
     */
    const setClickedHora = (target) => {
        // Get the text content of the target.
        const hora = target.textContent;

        // Set the 'Hora' selected.
        setTurnoHora(hora);

        // Remove the class 'selected' from all the 'Hora' divs.
        const horas = document.querySelectorAll('#horas button');

        for (let i = 0; i < horas.length; i++) {
            horas[i].classList.remove('selected');
        }

        // Add the class 'selected' to the target.
        target.classList.add('selected');

        console.log();
    }


    // Return the 'AddTurno' component.
    return (
        <div id='modalAdd' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Agregar nuevo Turno</h1>
                    </div>

                    <div className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'>
                        <FontAwesomeIcon
                            className='text-primary'
                            icon={faX}
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        />
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                        <div id='modalMessage' className='d-none alert bg-light border p-1 px-3 mb-2 w-100 border-left-danger'>
                            <p className='mb-0'>Ya existe un turno para el medico en la fecha y hora seleccionada</p>
                        </div>

                        <form id='formAdd' className="d-flex justify-content-center align-items-center row mb-3">
                            {/* Medico */}
                            <div className='col-md-6 mb-2 position-relative'>
                                <label htmlFor='medico'>Médico</label>

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

                                <div id='especialistas' className={medicoShowList + ' flex-column bg-white box-shadow-dark position-absolute'}>
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
                            </div>

                            {/* Paciente */}
                            <div className='col-md-6 mb-2 position-relative'>
                                <label htmlFor='paciente'>Paciente</label>

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
                                            <p className='mb-0 text-black'>{pacienteItem.apellido}, {pacienteItem.nombre}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Fecha */}
                            <div id='calendarContainer' className={'col-lg-6 col-md-8 col-sm-12 mt-2 mb-2 ' + fechaEnabled}>
                                <label>Fecha</label>                                

                                <Calendar
                                    className='box-shadow-dark-1 mt-1'
                                    calendarType={'US'}
                                    minDetail={'year'}
                                    minDate={new Date()}
                                    maxDate={new Date(fechaMax)}
                                    onChange={(value) => setClickedFecha(value)}
                                />
                            </div>

                            {/* Hora */}
                            <div id='horaContainer' className={'col-lg-6 col-md-8 col-sm-12 mt-2 mb-2 ' + horaEnabled}>
                                <label>Hora</label>

                                <div id='horas' className='d-flex justify-content-center align-items-center mt-1'>
                                    {horas && horas.map((horaArray, indexArray) => (
                                        <div
                                            className='d-flex flex-column align-items-center p-0'
                                            key={indexArray}
                                        >
                                            {horaArray.map((horaItem, indexItem) => {
                                                // Status of the 'hora' button.
                                                let isDisabled = false;
                                                
                                                if (horaItem.estado !== 'libre') {
                                                    isDisabled = true;
                                                }

                                                // Check if it's the last one.
                                                let marginBottomLastOne = 'mb-2';

                                                if (indexItem === horaArray.length - 1) {
                                                    marginBottomLastOne = 'mb-0';
                                                }

                                                return (
                                                    <button
                                                        className={'btn text-uppercase box-shadow-dark-1 px-2 mx-1 cursor-pointer ' + marginBottomLastOne}
                                                        key={indexItem}
                                                        disabled={isDisabled}
                                                        type='button'
                                                        onClick={(e) => setClickedHora(e.target)}
                                                    >
                                                        {horaItem.hora}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </form>

                        <button
                            className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                            onClick={addTurno}
                            disabled={turnoMedico === '' || turnoPaciente === '' || turnoFecha === '' || turnoHora === ''}
                        >
                            Guardar turno
                        </button>

                        <button
                            id='closeModal'
                            className='btn btn-secondary box-shadow-dark w-50'
                            data-bs-dismiss='modal'
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoTurno