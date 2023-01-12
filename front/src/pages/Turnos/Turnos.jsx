import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor, faCalendarCheck, faClock } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import './calendar.css';

function Turnos() {
    // Medicos.
    const [medicos, setMedicos] = useState([]);
    const [medico, setMedico] = useState('');
    const [medicoName, setMedicoName] = useState('');
    const [medicoShowList, setMedicoShowList] = useState('d-none');
    const [medicoMessage, setMedicoMessage] = useState('Empieza a escribir para buscar');
    const [medicoMessageShow, setMedicoMessageShow] = useState(false);
    const [medicoDisableButton, setMedicoDisableButton] = useState(true);
    
    // Fechas.
    const [fechas, setFechas] = useState([]);
    const [fecha, setFecha] = useState('');
    const [fechaMax, setFechaMax] = useState('');
    const [idFechasDias, setIdFechasDias] = useState('');
    const [fechaDisableButton, setFechaDisableButton] = useState(true);

    // Hora.
    const [horas, setHoras] = useState('');
    const [hora, setHora] = useState('');
    const [horaDisableButton, setHoraDisableButton] = useState(true);
    const [step, setStep] = useState(2);

    // Turno.
    const [turnoDisableButton, setTurnoDisableButton] = useState(true);

    // On page load, do the search of all active 'Medicos'.
    useEffect(() => {
        doSearch();

        // Si el usuario está logueado, ir al paso 2, sino al paso 1.
        setActiveSteps(step);
    }, []);


    // On 'medico' change, add class to the input.
    useEffect(() => {
        if (medico === '') {
            const input = document.getElementById('especialista');

            // Check if has the class 'is-valid'.
            if (input.classList.contains('is-valid')) {
                input.classList.remove('is-valid');
            }

            // Disable the button.
            setMedicoDisableButton(true);
        }
    }, [medico]);


    /**
     * Function doSearch - Makes the search of all active 'Medicos'
     *
     * @return {void}
     */
    const doSearch = () => {
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
     * Function setActiveSteps - Sets the active steps in the progress bar.
     *
     * @param {number} step - The current step.
     *
     * @return {void}
     */
    const setActiveSteps = (step) => {
        // To the actual step, and all the previous steps, add the class 'active'.
        for (let i = 1; i <= step; i++) {
            $(`#progressBar:nth-child(${i})`).addClass('active');
        }

        // To the next steps, remove the class 'active'.
        for (let i = step + 1; i <= 5; i++) {
            $(`#progressBar:nth-child(${i})`).removeClass('active');
        }
    }


    /**
     * Function medicoOnFocus - Handle the focus event of the 'Medico' input. If the 'especialistas' div is hidden, show the message.
     *
     * @return {void}
     */
    const medicoOnFocus = () => {
        setMedicoShowList('d-flex')
    }


    /**
     * Function medicoOnBlur - Handle the blur event of the 'Medico' input. If the 'especialistas' div is hidden, hide the message.
     *
     * @return {void}
     */
    const medicoOnBlur = () => {        
        setTimeout(() => {
            setMedicoShowList('d-none')
        }, 134);
    }

    
    /**
     * Function filterEspecialista - Filters the 'Medicos' by the selected the given input.
     *
     * @param {string} input - The input to filter by.
     *
     * @return {void}
     */
    const filterEspecialista = (input) => {
        // Delete the current 'medico' in case there is one.
        setMedico('');

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
     * Function setClickedEspecialista - Sets the clicked 'Medico' as the selected 'Medico'.
     * 
     * @param {html} target - The clicked 'Medico' div.
     *
     * @return {void}
     */
    const setClickedEspecialista = (target) => {
        // Get the 'data-id' and 'data-position' attribute of the target.
        const id = target.getAttribute('data-id');
        const position = target.getAttribute('data-position');

        // Get the divs.
        const input = document.getElementById('especialista');
        const list  = document.getElementById('especialistas');

        // Set the id of the 'Medico' as the selected 'Medico'.
        setMedico(id);
        setMedicoName(medicos[position].apellido + ', ' + medicos[position].nombre);

        // Get the dates for the selected 'Medico'.
        getFechas(id);

        // Hide the 'especialistas' div.
        list.classList.remove('d-flex');
        list.classList.add('d-none');

        // Set the 'especialista' input value and the class.
        input.value = medicos[position].apellido + ', ' + medicos[position].nombre;
        input.classList.add('is-valid');

        // Enable the continue button.
        setMedicoDisableButton(false);
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
     * Function fechaOnChange - Set the clicked date as the selected date.
     *
     * @param {date} date - The selected date.
     *
     * @return {void}
     */
    const fechaOnChange = (date) => {
        // Get the date selected in the format 'dd-mm-yyyy'.
        const día   = date.getDate().toString().padStart(2, '0');
        const mes   = (date.getMonth() + 1).toString().padStart(2, '0');
        const año   = date.getFullYear();
        const fecha = día + '-' + mes + '-' + año;

        // Set the date selected.
        setFecha(fecha);

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
        setIdFechasDias(idFechasDias);

        // Get the hours for the given date.
        getHoras(idFechasDias);

        // Enable the continue button.
        setFechaDisableButton(false);
    }


    /**
     * Function getHoras - Make an ajax request to get all the hours available for the selected 'Medico'.
     *
     * @param {string} date - The date selected.
     *
     * @return {void}
     */
    const getHoras = (date) => {
        $.ajax({
            url: `http://local.misturnos/api/medicos/${date}/horas`,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
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
        setHora(hora);

        // Remove the class 'selected' from all the 'Hora' divs.
        const horas = document.querySelectorAll('#horas button');

        for (let i = 0; i < horas.length; i++) {
            horas[i].classList.remove('selected');
        }

        // Add the class 'selected' to the target.
        target.classList.add('selected');

        // Enable the continue button.
        setHoraDisableButton(false);

        // Enable the 'Confirmar' button.
        setTurnoDisableButton(false);
    }


    /**
     * Function confirmarTurno - Save the 'Turno' in the database.
     *
     * @return {void}
     */
    const confirmarTurno = () => {
        // Disable the 'Confirmar' button.
        setTurnoDisableButton(true);

        $.ajax({
            url: 'http://local.misturnos/api/turnos',
            type: 'POST',
            dataType: 'json',
            data: {
                'id_paciente': 5,
                'id_medico': medico,
                'dia': fecha,
                'hora': hora,
                'id_fecha_dia': idFechasDias,
            },
            success: function (response) {
            },
            error: function (error) {
                console.log(error);
            }
        });
    }


    /**
     * Function moveStep - Do the animation to move to the given step and set it.
     * 
     * @param {int} to - The step to move to.
     */
    const moveStep = (to) => {
        // Get the 'steps' divs.
        const stepContainer = document.querySelector('.step-container');

        // Calculate the transition.
        const translate = (to - 2) * 100;

        if (to - step > 0) {
            // Do the animation.
            stepContainer.style.transform = `translateX(-${translate}%)`;

            // Set current step.
            setStep(to)
        } else {
            // Do the animation.
            stepContainer.style.transform = `translateX(-${translate}%)`;

            // Set current step.
            setStep(to)
        }
    }


    return (
        <div id='turnos' className=''>
            <Navbar />

            <div className='container p-6'>
                <div className='d-flex flex-column align-items-center min-height'>
                    {/* Progress bar */}
                    <div id='progressBarContainer' className='d-flex position-relative w-100 mb-4'>
                        <div className='position-absolute'>
                            <div className='triangle'></div>
                        </div>

                        <div id='progressBar' className='d-flex bg-white text-center w-100 box-shadow-dark'>
                            <div className='item position-relative w-20 py-2 px-2'>
                                <h5 className='mb-0 font-weight-100'>1 - Iniciar sesión</h5>
                            </div>

                            <div className='item position-relative w-20 py-2 px-2'>
                                <h5 className='mb-0 font-weight-100'>2 - Especialista</h5>
                            </div>

                            <div className='item position-relative w-20 py-2 px-2'>
                                <h5 className='mb-0 font-weight-100'>3 - Fecha</h5>
                            </div>

                            <div className='item position-relative w-20 py-2 px-2'>
                                <h5 className='mb-0 font-weight-100'>4 - Hora</h5>
                            </div>

                            <div className='item position-relative w-20 py-2 px-2'>
                                <h5 className='mb-0 font-weight-100'>5 - Revision</h5>
                            </div>

                        </div>
                    </div>

                    {/* Steps */}
                    <div id='steps' className='d-flex w-100 p-4 overflow-hidden'>
                        <div className='d-flex w-100 step-container'>
                            {/* Paso 1 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100 d-none'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>1</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1'>Iniciar Sesión</h4>

                                <p className='mt-5 mb-0'>Para poder reservar un turno, debes ingresar a tu cuenta</p>
                                <p className='mt-2 mb-0'>En caso de que no tengas</p>
                                <p className='mt-0 mb-0'>puedes crearla haciendo click en el botón de abajo</p>
                                
                                <Link
                                    to='/login'
                                    className='btn border border-light text-light text-uppercase px-3 mt-5 w-25'
                                >
                                    Iniciar Sesión
                                </Link>
                                
                                <Link
                                    to='/register'
                                    className='btn border border-light text-light text-uppercase px-3 mt-5 w-25'
                                >
                                    Registrarse
                                </Link>
                            </div>

                            {/* Paso 2 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100 overflow-hidden'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>2</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1 mb-5'>Selecciona uno de nuestros especialistas</h4>

                                <div className='d-flex flex-column align-items-center w-100'>                   
                                    <div className='d-flex justify-content-center align-items-center w-25 position-relative'>
                                        <input
                                            id='especialista'
                                            type='text'
                                            className='form-control w-100'
                                            placeholder='Buscar especialista...'
                                            onChange={(event) => filterEspecialista(event.target.value)}
                                            onFocus={() => medicoOnFocus()}
                                            onBlur={(event) => medicoOnBlur(event)}
                                        />
                                    </div>

                                    <div id='especialistas' className={medicoShowList + ' flex-column bg-white w-25'}>
                                        {medicoMessageShow &&
                                            <div className='d-flex align-items-center border-bottom py-2 px-3 medicosMessage'>
                                                <p className='mb-0 text-black'>{medicoMessage}</p>
                                            </div>
                                        }

                                        {medicos && medicos.map((medicoItem, index) => (
                                            <div
                                                className='d-none align-items-center border-bottom py-2 px-3 cursor-pointer item'
                                                data-id={medicoItem.id}
                                                data-position={index}
                                                key={index}
                                                onClick={(e) => setClickedEspecialista(e.target)}
                                            >
                                                <p className='mb-0 text-black'>{medicoItem.apellido}, {medicoItem.nombre}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className='btn bg-white text-dark text-uppercase box-shadow-dark px-3 mt-5 w-25 cursor-pointer'
                                    disabled={medicoDisableButton}
                                    onClick={() => moveStep(3)}
                                >
                                    Continuar
                                </button>
                            </div>
                            
                            {/* Paso 3 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100 overflow-hidden'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>3</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1 mb-5'>Selecciona el día que te quieres atender</h4>

                                <Calendar
                                    className='box-shadow-dark'
                                    calendarType={'US'}
                                    minDetail={'year'}
                                    minDate={new Date()}
                                    maxDate={new Date(fechaMax)}
                                    onChange={(value) => fechaOnChange(value)}
                                />


                                <div className='d-flex justify-content-around w-100'>
                                    <button
                                        className='btn border border-light text-light text-uppercase box-shadow-dark px-3 mt-5 w-25 cursor-pointer'
                                        onClick={() => moveStep(2)}
                                    >
                                        Paso anterior
                                    </button>

                                    <button
                                        className='btn bg-white text-dark text-uppercase box-shadow-dark px-3 mt-5 w-25 cursor-pointer'
                                        disabled={fechaDisableButton}
                                        onClick={() => moveStep(4)}
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                            
                            {/* Paso 4 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100 overflow-hidden'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>4</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1 mb-5'>Selecciona el horario del turno</h4>                                

                                <div id='horas' className='d-flex justify-content-center align-items-center'>
                                    {horas && horas.map((horaArray, indexArray) => (
                                        <div
                                            className='d-flex flex-column align-items-center'
                                            key={indexArray}
                                        >
                                            {horaArray.map((horaItem, indexItem) => {
                                                let isDisabled = false;
                                                
                                                if (horaItem.estado !== 'libre') {
                                                    isDisabled = true;
                                                }

                                                return (
                                                    <button
                                                        className='btn text-uppercase box-shadow-dark px-3 mb-2 mx-2 cursor-pointer'
                                                        key={indexItem}
                                                        disabled={isDisabled}
                                                        onClick={(e) => setClickedHora(e.target)}
                                                    >
                                                        {horaItem.hora}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    ))}
                                </div>

                                <div className='d-flex justify-content-around w-100'>
                                    <button
                                        className='btn border border-light text-light text-uppercase box-shadow-dark px-3 mt-5 w-25 cursor-pointer'
                                        onClick={() => {
                                            // Move back to step 3.
                                            moveStep(3);

                                            // Delete the selected class.
                                            const selected = document.querySelector('#horas .selected');

                                            if (selected) {
                                                selected.classList.remove('selected');
                                            }
                                        }}
                                    >
                                        Paso anterior
                                    </button>

                                    <button
                                        className='btn bg-white text-dark text-uppercase box-shadow-dark px-3 mt-5 w-25 cursor-pointer'
                                        disabled={horaDisableButton}
                                        onClick={() => moveStep(5)}
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                            
                            {/* Paso 5 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100 overflow-hidden'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>5</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1 mb-5'>Confirmar el turno</h4>

                                <div id='resumen' className='d-flex flex-column bg-white text-dark border-05 box-shadow-dark w-33 p-4'>
                                    <h3 className='text-primary pb-05 mb-2'>Turno</h3>

                                    <div className='d-flex align-items-center ms-2'>
                                        <FontAwesomeIcon 
                                            icon={faUserDoctor}
                                            className='text-primary me-1'
                                        />

                                        <p className='mb-0'>Especialista: {medicoName}</p>
                                    </div>

                                    <div className='d-flex align-items-center ms-2'>
                                        <FontAwesomeIcon 
                                            icon={faCalendarCheck}
                                            className='text-primary me-1'
                                        />

                                        <p className='mb-0'>Fecha: {fecha}</p>
                                    </div>

                                    <div className='d-flex align-items-center ms-2'>
                                        <FontAwesomeIcon 
                                            icon={faClock}
                                            className='text-primary me-1'
                                        />

                                        <p className='mb-0'>Hora: {hora}</p>
                                    </div>

                                </div>

                                <div className='d-flex justify-content-around w-100'>
                                    <button
                                        className='btn border border-light text-light text-uppercase box-shadow-dark px-3 mt-5 w-25 cursor-pointer'
                                        onClick={() => moveStep(4)}
                                    >
                                        Paso anterior
                                    </button>

                                    <button
                                        className='btn bg-white text-dark text-uppercase box-shadow-dark px-3 mt-5 w-25 cursor-pointer'
                                        disabled={turnoDisableButton}
                                        onClick={() => confirmarTurno()}
                                    >
                                        Confirmar turno
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>

            <Footer />
        </div>
    )
}

export default Turnos