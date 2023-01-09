import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './style.css';
import './calendar.css';

function Turnos() {
    const [medicos, setMedicos] = useState([]);
    const [medicosShow, setMedicosShow] = useState(true);
    const [medico, setMedico] = useState('');
    const [medicoMessage, setMedicoMessage] = useState('Empieza a escribir para buscar');
    const [medicoMessageShow, setMedicoMessageShow] = useState(false);
    const [medicoDisbleButton, setMedicoDisbleButton] = useState(true);
    const [fecha, setFecha] = useState('');
    const [step, setStep] = useState(2);

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
            setMedicoDisbleButton(true);
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
        const especialistas = document.getElementById('especialistas');

        if (especialistas.classList.contains('d-none')) {
            setMedicoMessageShow(true)
        }
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
        const especialistasChildren = especialistas.children;

        // Counters.
        let counter = 0;

        // Loop through the 'especialistasChildren' div.
        for (let i = 1; i < especialistasChildren.length; i++) {
            // If the 'especialistasChildren' div contains the given input, show it, otherwise, hide it.
            if (especialistasChildren[i].innerHTML.toLowerCase().includes(input.toLowerCase())) {
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
        // Get the 'data-id' attribute of the target.
        const id = target.getAttribute('data-id');

        // Get the divs.
        const input = document.getElementById('especialista');
        const list  = document.getElementById('especialistas');

        // Set the 'Medico' as the selected 'Medico'.
        setMedico(medicos[id]);

        // Hide the 'especialistas' div.
        list.classList.remove('d-flex');
        list.classList.add('d-none');

        // Set the 'especialista' input value and the class.
        input.value = medicos[id].apellido + ', ' + medicos[id].nombre;
        input.classList.add('is-valid');

        // Enable the continue button.
        setMedicoDisbleButton(false);
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
        <div id='turnos' className='bg-primary'>
            <Navbar />

            <div className='container p-6'>
                <div className='d-flex flex-column align-items-center min-height'>
                    {/* Progress bar */}
                    <div id='progressBarContainer' className='d-flex position-relative w-100 mb-8'>
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
                    <div id='steps' className='d-flex w-100 overflow-hidden'>
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
                            <div className='steps d-flex flex-column align-items-center text-white w-100'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>2</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1 mb-5'>Selecciona uno de nuestros especialistas</h4>
                                
                                {/* Crear un input en donde se pueda escribir y su desplegable cargado con todos los medicos, el cual se vaya filtrando según lo tipeado*/}
                                <div className='d-flex flex-column align-items-center w-100'>                   
                                    <div className='d-flex justify-content-center align-items-center w-25 position-relative'>
                                        <input
                                            id='especialista'
                                            type='text'
                                            className='form-control w-100'
                                            placeholder='Buscar especialista...'
                                            onChange={(e) => filterEspecialista(e.target.value)}
                                            onFocus={() => medicoOnFocus()}
                                            onBlur={(e) => setMedicoMessageShow(false)}
                                        />
                                    </div>

                                    <div id='especialistas' className='flex-column bg-white w-25'>
                                        {medicoMessageShow &&
                                            <div className='d-flex align-items-center border-bottom py-2 px-3 medicosMessage'>
                                                <p className='mb-0 text-black'>{medicoMessage}</p>
                                            </div>
                                        }

                                        {medicos && medicos.map((medico, index) => (
                                            <div
                                                className='d-none align-items-center border-bottom py-2 px-3 cursor-pointer item'
                                                data-id={index}
                                                key={index}
                                                onClick={(e) => setClickedEspecialista(e.target)}
                                            >
                                                <p className='mb-0 text-black'>{medico.apellido}, {medico.nombre}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className='btn border border-light text-light text-uppercase px-3 mt-5 w-25 cursor-pointer'
                                    disabled={medicoDisbleButton}
                                    onClick={() => moveStep(3)}
                                >
                                    Continuar
                                </button>
                            </div>
                            
                            {/* Paso 3 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>3</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1 mb-5'>Selecciona el día que te quieres atender</h4>

                                <Calendar
                                />


                                <div className='d-flex justify-content-around w-100'>
                                    <button
                                        className='btn border border-light text-light text-uppercase px-3 mt-5 w-25 cursor-pointer'
                                        disabled={medicoDisbleButton}
                                        onClick={() => moveStep(2)}
                                    >
                                        Paso anterior
                                    </button>

                                    <button
                                        className='btn border border-light text-light text-uppercase px-3 mt-5 w-25 cursor-pointer'
                                        disabled={medicoDisbleButton}
                                        onClick={() => moveStep(4)}
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                            
                            {/* Paso 4 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>4</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1'>Selecciona el horario del turno</h4>

                                <div className='d-flex justify-content-around w-100'>
                                    <button
                                        className='btn border border-light text-light text-uppercase px-3 mt-5 w-25 cursor-pointer'
                                        disabled={medicoDisbleButton}
                                        onClick={() => moveStep(3)}
                                    >
                                        Paso anterior
                                    </button>

                                    <button
                                        className='btn border border-light text-light text-uppercase px-3 mt-5 w-25 cursor-pointer'
                                        disabled={medicoDisbleButton}
                                        onClick={() => moveStep(5)}
                                    >
                                        Continuar
                                    </button>
                                </div>
                            </div>
                            
                            {/* Paso 5 */}
                            <div className='steps d-flex flex-column align-items-center text-white w-100'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='me-2 mb-0'>Paso</h2>

                                    <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                        <h3 className='mb-0'>5</h3>
                                    </div>
                                </div>

                                <h4 className='mt-1'>Confirmar el turno</h4>

                                <div className='d-flex justify-content-around w-100'>
                                    <button
                                        className='btn border border-light text-light text-uppercase px-3 mt-5 w-25 cursor-pointer'
                                        disabled={medicoDisbleButton}
                                        onClick={() => moveStep(4)}
                                    >
                                        Paso anterior
                                    </button>

                                    <button
                                        className='btn border border-light text-light text-uppercase px-3 mt-5 w-25 cursor-pointer'
                                        disabled={medicoDisbleButton}
                                        // onClick={() => moveStep(4)}
                                    >
                                        Confirmar
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