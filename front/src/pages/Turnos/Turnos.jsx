import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './style.css';

function Turnos() {
    const [medicos, setMedicos] = useState([]);
    const [especialista, setEspecialista] = useState('');
    const [step, setStep] = useState(2);

    // On page load, do the search of all active 'Medicos'.
    useEffect(() => {
        doSearch();

        // Si el usuario está logueado, ir al paso 2, sino al paso 1.
        setActiveSteps(step);
    }, []);


    // 
    useEffect(() => {
        setActiveSteps(step);
    }, [step]);


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
     * Function filterEspecialista - Filters the 'Medicos' by the selected the given input.
     *
     * @param {string} input - The input to filter by.
     *
     * @return {void}
     */
    const filterEspecialista = (input) => {
        // If input is empty, show 'empiezaABuscar' div.
        let empiezaABuscar = document.querySelector('.empiezaABuscar');

        if (input === '') {
            empiezaABuscar.classList.remove('d-none');
            empiezaABuscar.classList.add('d-flex');
        } else {
            empiezaABuscar.classList.remove('d-flex');
            empiezaABuscar.classList.add('d-none');
        }

        // Get the 'especialistas' divs.
        const especialistas = document.getElementById('especialistas');
        const especialistasChildren = especialistas.children;

        // Counters.
        let counter = 0;

        // Loop through the 'especialistasChildren' div.
        for (let i = 0; i < especialistasChildren.length; i++) {
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
     * Function showEspecialistas - Shows the div with the 'Medicos' filtered by the given input.
     *
     * @param {string} input - The input to filter by.
     *
     * @return {void}
     */
    const showEspecialistas = (input) => {

    }


    return (
        <div id='turnos' className='min-height bg-primary'>
            <Navbar />

            <div className='container mt-6'>
                <div className='d-flex flex-column align-items-center min-height'>
                    {/* Progress bar */}
                    <div id='progressBarContainer' className='d-flex position-relative w-100 mb-5'>
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
                    <div className='d-flex w-100'>
                        {/* Paso 1 */}
                        <div className='d-flex flex-column align-items-center text-white w-100 d-none'>
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
                        <div className='d-flex flex-column align-items-center text-white w-100'>
                            <div className='d-flex align-items-center'>
                                <h2 className='me-2 mb-0'>Paso</h2>

                                <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                    <h3 className='mb-0'>2</h3>
                                </div>
                            </div>

                            <h4 className='mt-1'>Selecciona uno de nuestros especialistas</h4>
                            
                            {/* Crear un input en donde se pueda escribir y su desplegable cargado con todos los medicos, el cual se vaya filtrando según lo tipeado*/}
                            <div className='d-flex flex-column align-items-center mt-5 w-100'>                   
                                <div className='d-flex justify-content-center align-items-center w-25'>
                                    <input
                                        type='text'
                                        className='form-control w-100'
                                        placeholder='Buscar especialista...'
                                        onChange={(e) => filterEspecialista(e.target.value)}
                                        onFocus={(e) => showEspecialistas(e.target.value)}
                                    />
                                </div>

                                <div id='especialistas' className='bg-white w-25'>
                                    <div className='d-flex align-items-center border-bottom py-2 px-3 empiezaABuscar'>
                                        <p className='mb-0 text-black'>Empieza a escribir para buscar</p>
                                    </div>

                                    {medicos && medicos.map((medico, index) => (
                                        <div className='d-none align-items-center border-bottom py-2 px-3' key={index}>
                                            <p className='mb-0 text-black'>{medico.apellido}, {medico.nombre}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button className='btn border border-light text-light text-uppercase px-3 mt-5 w-25' disabled>Continuar</button>
                        </div>
                        
                        {/* Paso 3 */}
                        <div className='d-flex flex-column align-items-center text-white mt-5 d-none'>
                            <div className='d-flex align-items-center'>
                                <h2 className='me-2 mb-0'>Paso</h2>

                                <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                    <h3 className='mb-0'>2</h3>
                                </div>
                            </div>

                            <h4 className='mt-1'>Selecciona el día que te quieres atender</h4>
                        </div>
                        
                        {/* Paso 4 */}
                        <div className='d-flex flex-column align-items-center text-white mt-5 d-none'>
                            <div className='d-flex align-items-center'>
                                <h2 className='me-2 mb-0'>Paso</h2>

                                <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                    <h3 className='mb-0'>3</h3>
                                </div>
                            </div>

                            <h4 className='mt-1'>Selecciona el horario del turno</h4>
                        </div>
                        
                        {/* Paso 5 */}
                        <div className='d-flex flex-column align-items-center text-white mt-5 d-none'>
                            <div className='d-flex align-items-center'>
                                <h2 className='me-2 mb-0'>Paso</h2>

                                <div className='d-flex justify-content-center align-items-center border-50 border-white-2 circle'>
                                    <h3 className='mb-0'>4</h3>
                                </div>
                            </div>

                            <h4 className='mt-1'>Confirmar el turno</h4>
                        </div>
                    </div>
                </div>            
            </div>

            <Footer />
        </div>
    )
}

export default Turnos