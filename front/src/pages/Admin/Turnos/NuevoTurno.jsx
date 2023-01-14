import { React, useState } from 'react';
import $ from 'jquery';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faX } from '@fortawesome/free-solid-svg-icons';

function NuevoTurno( { medicos, pacientes, turnoMedico, turnoPaciente, turnoFecha, turnoHora, turnoFechaDia, setTurnoMedico, setTurnoPaciente, setTurnoFecha, setTurnoHora, setTurnoFechaDia, addTurno } ) {
    // Medicos.
    const [medicoTurnoName, setMedicoTurnoName] = useState('');
    const [medicoShowList, setMedicoShowList] = useState('d-none');
    const [medicoMessage, setMedicoMessage] = useState('');
    const [medicoMessageShow, setMedicoMessageShow] = useState(false);

    // Fechas.
    const [fechas, setFechas] = useState([]);
    const [fecha, setFecha] = useState('');
    const [fechaMax, setFechaMax] = useState('');
    const [idFechasDias, setIdFechasDias] = useState('');

    // Hora.
    const [horas, setHoras] = useState([
        [{hora: '8:00', estado: 'libre'}, {hora: '8:30', estado: 'libre'}, {hora: '9:00', estado: 'libre'}, {hora: '9:30', estado: 'libre'}, {hora: '10:00', estado: 'libre'}],
        [{hora: '10:30', estado: 'libre'}, {hora: '11:00', estado: 'libre'}, {hora: '11:30', estado: 'libre'}, {hora: '12:00', estado: 'libre'}, {hora: '12:30', estado: 'libre'}],
        [{hora: '13:00', estado: 'libre'}, {hora: '13:30', estado: 'libre'}, {hora: '14:00', estado: 'libre'}, {hora: '14:30', estado: 'libre'}, {hora: '15:00', estado: 'libre'}],
        [{hora: '15:30', estado: 'libre'}, {hora: '16:00', estado: 'libre'}, {hora: '16:30', estado: 'libre'}, {hora: '17:00', estado: 'libre'}, {hora: '17:30', estado: 'libre'}],
        [{hora: '18:00', estado: 'libre'}, {hora: '18:30', estado: 'libre'}, {hora: '19:00', estado: 'libre'}, {hora: '19:30', estado: 'libre'}, {hora: '20:00', estado: 'libre'}],
    ]);
    const [hora, setHora] = useState('');
    

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
        }, 136);
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
                especialistas.classList.remove('d-flex');
                especialistas.classList.add('d-none');
            }
        } else {
            setMedicoMessageShow(false);

            if (especialistas.classList.contains('d-none')) {
                especialistas.classList.remove('d-none');
                especialistas.classList.add('d-flex');
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
        setMedicoTurnoName(medicos[position].apellido + ', ' + medicos[position].nombre);

        // Get the dates for the selected 'Medico'.
        getFechas(id);

        // Hide the 'especialistas' div.
        setMedicoShowList('d-none');

        // Set the 'especialista' input value and the class.
        input.value = medicos[position].apellido + ', ' + medicos[position].nombre;
        input.classList.add('is-valid');
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
                        <form id='formAdd' className="d-flex justify-content-center align-items-center row mb-3">
                            {/* Medico */}
                            <div className='col-md-6 mb-2 position-relative'>
                                <label htmlFor='nombre'>Médico</label>

                                <input
                                    id='medico'
                                    className='form-control box-shadow-dark-1'
                                    type='text'
                                    name='medico'
                                    placeholder='Medico'
                                    aria-label='Medico'
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
                            <div className='col-md-6 mb-2'>
                                <label htmlFor='apellido'>Paciente</label>
                                    
                                <input
                                    className='form-control box-shadow-dark-1'
                                    type='text'
                                    name='paciente'
                                    placeholder='Paciente'
                                    aria-label='Paciente'
                                    value={turnoPaciente}
                                    onChange={e => setTurnoPaciente(e.target.value)}
                                />
                            </div>

                            {/* Fecha */}
                            <div className='col-lg-6 col-md-8 col-sm-12 mb-2'>
                                <label>Fecha</label>                                

                                <Calendar
                                    className='box-shadow-dark-1 mt-1'
                                    calendarType={'US'}
                                    minDetail={'year'}
                                    minDate={new Date()}
                                    maxDate={new Date(fechaMax)}
                                    // onChange={(value) => fechaOnChange(value)}
                                />
                            </div>

                            {/* Hora */}
                            <div className='col-lg-6 col-md-8 col-sm-12 mb-2'>
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
                                                        // onClick={(e) => setClickedHora(e.target)}
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
                            Agregar
                        </button>

                        <button
                            id='closeModal'
                            className='btn btn-secondary box-shadow-dark w-50'
                            data-bs-dismiss='modal'
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoTurno