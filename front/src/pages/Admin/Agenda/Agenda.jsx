import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';
import Calendar from 'react-calendar';
import SideNav from '../../../components/SideNav/SideNav';
import Alert from '../../../components/Alert/Alert';
import Disponibilidad from './Disponibilidad';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import './style.css';

function Agenda() {
    // Fecha.
    const [datesToSave, setDatesToSave] = useState([]);

    // Hora.
    const [horas, setHoras] = useState([
        [{hora: '8:00', estado: 'libre'}, {hora: '8:30', estado: 'libre'}, {hora: '9:00', estado: 'libre'}, {hora: '9:30', estado: 'libre'}, {hora: '10:00', estado: 'libre'}],
        [{hora: '10:30', estado: 'libre'}, {hora: '11:00', estado: 'libre'}, {hora: '11:30', estado: 'libre'}, {hora: '12:00', estado: 'libre'}, {hora: '12:30', estado: 'libre'}],
        [{hora: '13:00', estado: 'libre'}, {hora: '13:30', estado: 'libre'}, {hora: '14:00', estado: 'libre'}, {hora: '14:30', estado: 'libre'}, {hora: '15:00', estado: 'libre'}],
        [{hora: '15:30', estado: 'libre'}, {hora: '16:00', estado: 'libre'}, {hora: '16:30', estado: 'libre'}, {hora: '17:00', estado: 'libre'}, {hora: '17:30', estado: 'libre'}],
    ]);
    const [horasSelected, setHorasSelected] = useState([]);
    const [horaSelected, setHoraSelected] = useState(false);
    const [horasAllActive, setHorasAllActive] = useState(false);

    // Checkboxes.
    const [lunes, setLunes] = useState(false);
    const [martes, setMartes] = useState(false);
    const [miércoles, setMiércoles] = useState(false);
    const [jueves, setJueves] = useState(false);
    const [viernes, setViernes] = useState(false);
    const [actual, setActual] = useState(false);
    const [siguiente, setSiguiente] = useState(false);
    const [proximo, setProximo] = useState(false);

    // Utilities.
    const [showSpinner, setShowSpinner] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Alert. 
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');


    // Adds an extra label and 'data-mes' to the checkboxes.
    useEffect(() => {
        // Get the current Month.
        const currentMonth = new Date().getMonth();

        let mesActual       = '';
        let siguienteActual = '';
        let proximoActual   = '';

        switch (currentMonth) {
            case 0:
                mesActual = 'Enero';
                siguienteActual = 'Febrero';
                proximoActual = 'Marzo';
                break;

            case 1:
                mesActual = 'Febrero';
                siguienteActual = 'Marzo';
                proximoActual = 'Abril';
                break;

            case 2:
                mesActual = 'Marzo';
                siguienteActual = 'Abril';
                proximoActual = 'Mayo';
                break;

            case 3:
                mesActual = 'Abril';
                siguienteActual = 'Mayo';
                proximoActual = 'Junio';
                break;

            case 4:
                mesActual = 'Mayo';
                siguienteActual = 'Junio';
                proximoActual = 'Julio';
                break;

            case 5:
                mesActual = 'Junio';
                siguienteActual = 'Julio';
                proximoActual = 'Agosto';
                break;

            case 6:
                mesActual = 'Julio';
                siguienteActual = 'Agosto';
                proximoActual = 'Septiembre';
                break;

            case 7:
                mesActual = 'Agosto';
                siguienteActual = 'Septiembre';
                proximoActual = 'Octubre';
                break;

            case 8:
                mesActual = 'Septiembre';
                siguienteActual = 'Octubre';
                proximoActual = 'Noviembre';
                break;

            case 9:
                mesActual = 'Octubre';
                siguienteActual = 'Noviembre';
                proximoActual = 'Diciembre';
                break;

            case 10:
                mesActual = 'Noviembre';
                siguienteActual = 'Diciembre';
                proximoActual = 'Enero';
                break;

            case 11:
                mesActual = 'Diciembre';
                siguienteActual = 'Enero';
                proximoActual = 'Febrero';
                break;
                
            default:
                break;
        }
        
        // Set the varibles to the checkboxes.
        const actual = document.querySelector('#actual');
        const month = actual.nextElementSibling.querySelector('.month');
        month.innerHTML = '(' + mesActual + ')';
        actual.setAttribute('data-mes', currentMonth + 1);

        const siguiente = document.querySelector('#siguiente');
        const monthSiguiente = siguiente.nextElementSibling.querySelector('.month');
        monthSiguiente.innerHTML = '(' + siguienteActual + ')';
        siguiente.setAttribute('data-mes', currentMonth + 2);
    
        const proximo = document.querySelector('#proximo');
        const monthProximo = proximo.nextElementSibling.querySelector('.month');
        monthProximo.innerHTML = '(' + proximoActual + ')';
        proximo.setAttribute('data-mes', currentMonth + 3);
    }, []);


    // Handle the btnDisabled state.
    useEffect(() => {
        if ((lunes || martes || miércoles || jueves || viernes) && (actual || siguiente || proximo) && horaSelected) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [lunes, martes, miércoles, jueves, viernes, actual, siguiente, proximo, horaSelected]);



    // useEffect(() => {
    //     // Get checkboxes in 'días' element.
    //     const díasChecked = document.querySelectorAll('#agenda #días input[type="checkbox"]');

    //     // Get checkboxes in 'meses' element.

    //     // Get current day.
    //     const todayDate = new Date().getDate();

    //     // Get the maximum number of days in the current month.
    //     const maxDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    //     // Get all the days buttons.
    //     const días = document.querySelectorAll('#agenda .react-calendar__tile');

    //     // Loop through the days díasChecked and set the selected attribute to the days buttons if the day is between the current day and the maximum number of days in the current month and the day is equal to the day selected in the checkboxes and the day is equal to the day selected in the checkboxes plus 7, 14, 21 or 28.
    //     díasChecked.forEach((díaChecked) => {
    //         días.forEach((día) => {
    //             // Get 'data-id' attribute.
    //             const id = parseInt(díaChecked.getAttribute('data-id'));

    //             // Get the index of the current day.
    //             const index = Array.prototype.indexOf.call(días, día) + 1;

    //             if (index >= todayDate && index <= maxDays && (index === id || index === id + 7 || index === id + 14 || index === id + 21 || index === id + 28)) {
    //                 if (díaChecked.checked) {
    //                     día.setAttribute('selected', '');
    //                 } else {
    //                     día.removeAttribute('selected');
    //                 }
    //             }
    //         });
    //     });
    // }, [lunes, martes, miércoles, jueves, viernes]);


    /**
     * Function fechaOnChange - Set the clicked date as the selected date.
     *
     * @param {date} date - The selected date.
     *
     * @return {void}
     */
    const fechaOnChange = (date) => {
        // Get the date selected in the format 'dd-mm-yyyy'.
        const mes  = (date.getMonth() + 1).toString().padStart(2, '0');
        const año  = date.getFullYear();

        // Format the date selected to select the button in the 'react-calendar' component and add the selected attribute.
        let mesText = '';

        switch (mes) {
            case '01':
                mesText = 'enero';
                break;

            case '02':
                mesText = 'febrero';
                break;

            case '03':
                mesText = 'marzo';
                break;

            case '04':
                mesText = 'abril';
                break;

            case '05':
                mesText = 'mayo';
                break;

            case '06':
                mesText = 'junio';
                break;

            case '07':
                mesText = 'julio';
                break;

            case '08':
                mesText = 'agosto';
                break;

            case '09':
                mesText = 'septiembre';
                break;

            case '10':
                mesText = 'octubre';
                break;

            case '11':
                mesText = 'noviembre';
                break;

            case '12':
                mesText = 'diciembre';
                break;
            
            default:
                break;
        }

        const textSelected = date.getDate() + ' de ' + mesText + ' de ' + año;

        // Get all the abbr elements.
        const abbr = document.querySelectorAll('#agenda .react-calendar__tile abbr');

        // Loop through the abbr elements.
        abbr.forEach((element) => {
            // Get the 'aria-label' attribute.
            const ariaLabel = element.getAttribute('aria-label');

            if (ariaLabel === textSelected) {
                if (element.parentElement.hasAttribute('selected')) {
                    element.parentElement.removeAttribute('selected');
                } else {
                    element.parentElement.setAttribute('selected', '');
                }
            }
        });
    }


    /**
     * Function toggleDays -
     *
     * @param {boolean} value - The value of the checkbox.
     *
     * @return {void}
     */
    const toggleDays = (value) => {
        // Set 'lunes' state.
        setLunes(value);

        // Toggle the 'selected' attribute in all the Monday days.
        const días = document.querySelectorAll('#agenda .react-calendar__tile');

        // Get the current day.
        const todayDate = new Date().getDate();

        // Get the maximum number of days in the current month.
        const maxDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

        días.forEach((día) => {
            // Get the index of the current day.
            const index = Array.prototype.indexOf.call(días, día) + 1;
            
            // if (index >= todayDate && index <= maxDays && (index === indexDay || index === indexDay + 7 || index === indexDay + 14 || index === indexDay + 21 || index === indexDay + 28)) {
                // if (value) {
                //     día.setAttribute('selected', '');
                // } else {
                //     día.removeAttribute('selected');
                // }
            // });
        });
    }


    /**
     * Function selectAllHoras - Select all the buttons in 'hora' element.
     *
     * @return {void}
     */
    const selectAllHoras = () => {
        // Get all the buttons in 'hora' element.
        const buttons = document.querySelectorAll('#horas button');

        // Loop through the buttons.
        if (horasAllActive) {
            buttons.forEach((button) => {
                // Remove the 'selected' class.
                button.classList.remove('selected');
            });

            setHorasAllActive(false);
            setHoraSelected(false);
        } else {
            buttons.forEach((button) => {
                // Add the 'selected' class.
                button.classList.add('selected');
            });

            setHorasAllActive(true);
            setHoraSelected(true);
        }
    }


    /**
     * Function toggleClickedHora - Set
     *
     * @param {object} target - The clicked element.
     *
     * @return {void}
     */
    const toggleClickedHora = (target) => {
        // Toggle the 'selected' class.
        target.classList.toggle('selected');

        // Check if there is at least one button with the 'selected' class.
        const buttons = document.querySelectorAll('#horas button');

        let selected = false;

        buttons.forEach((button) => {
            if (button.classList.contains('selected')) {
                selected = true;
            }
        });
        
        setHoraSelected(selected);
    }


    /**
     * Function saveNewHorarios - Save the new horarios.
     *
     * @return {void}
     */
    const saveNewHorarios = () => {
        // Set the 'showSpinner' state.
        setShowSpinner(true);

        // Get the checked 'días' checkboxes.
        const días = document.querySelectorAll('#días input:checked');

        // Get the checked 'meses' checkboxes.
        const meses = document.querySelectorAll('#meses input:checked');

        // Get the selected 'horas' buttons.
        const horas = document.querySelectorAll('#horas button.selected');
        
        // Get today's date.
        const today = new Date().getDate();

        // Get the year.
        let año = new Date().getFullYear();

        // Loop through the 'meses' checkboxes.
        meses.forEach((mes) => {
            // Get the 'data-mes' attribute.
            const dataMes = mes.getAttribute('data-mes');

            // Get the id of the element mes.
            const mesId = mes.getAttribute('id');

            // Get the maximum number of days in the current month.
            const maxDays = new Date(año, dataMes, 0).getDate();

            // Loop through the 'días' checkboxes.
            días.forEach((día) => {
                // Get the 'data-id' attribute.
                const díaId = día.getAttribute('data-id');

                for (let i = 1; i <= maxDays; i++) {
                    const dateDay = new Date(año, dataMes - 1, i).getDay();

                    if (mesId === 'actual') {
                        // If it is the current month, only save the dates that are greater than or equal to today.
                        if (i >= today && (díaId - 1 === dateDay)) {
                            if (i < 10) {
                                i = `0${i}`;
                            }

                            setDatesToSave((datesToSave) => [...datesToSave, `${i}-${dataMes}-${año}`]);
                        }
                    } else {
                        // If it is not the current month, save all the dates.
                        // Check if the current 'dataMes' is lower than the current month, that means that the year is the next year.
                        const mesActual = document.getElementById('actual').getAttribute('data-mes');

                        if (mesActual < dataMes) {
                            año++;
                        }

                        if (díaId - 1 === dateDay) {
                            if (i < 10) {
                                i = `0${i}`;
                            }

                            setDatesToSave((datesToSave) => [...datesToSave, `${i}-${dataMes}-${año}`]);
                        }
                    }
                }
            });
        });

        // Loop trough the 'horas' buttons.
        horas.forEach((hora) => {
            setHorasSelected((horasSelected) => [...horasSelected, hora.innerText]);
        });

        // Make API call.
        $.ajax({
            url: `${process.env.REACT_APP_API_URL}/horarios`,
            method: 'POST',
            data: {
                'id_medico': '1',
                'fechas': datesToSave,
                'horas': horasSelected,
            },
            success: (response) => {
                // Show spinner.
                setShowSpinner(false);

                // Show Alert.
                setAlertType('success')
                setAlertMessage(response.message);
                setShowAlert(true);
            }
        });
    }


    // Render the 'Agenda' component.
    return (
        <div id='agenda' className='d-flex bg-lightgray'>
            <SideNav
                active='agenda'
            />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary text-shadow-dark me-4'>Mi Agenda</h1>

                    <div style={{width: '40px'}}>
                        {showSpinner && <img src={loadingGif} alt='wait until the page loads' height='20px'/>}
                    </div>

                    <button
                        className='btn bg-white text-primary border-primary'
                        data-bs-toggle='modal'
                        data-bs-target={'#modalAdd'}
                    >
                        <FontAwesomeIcon
                            className='text-primary me-1'
                        />

                        Revisar disponibilidad de cargada
                    </button>
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
                        <h4 className='text-center text-shadow-dark mb-2'>Selecciona las opciones para cargar su disponibilidad</h4>
                    </div>
                    
                    <div id='checkboxs' className='col-sm-12 d-flex justify-content-around mb-3'>
                        <div className='d-flex flex-column'>
                            <div id='días' className='d-flex flex-column'>
                                <h6 htmlFor=''>Aplicar para todos los:</h6>

                                <div className='d-flex'>
                                    <input
                                        id='lunes'
                                        className='form-check-input ms-2'
                                        type='checkbox'
                                        value={lunes}
                                        data-id='2'
                                        onChange={(e) => toggleDays( e.target.checked)}
                                    />

                                    <label htmlFor='lunes' className='form-check-label ms-2'>Lunes</label>
                                </div>

                                <div className='d-flex'>
                                    <input
                                        id='martes'
                                        type='checkbox'
                                        className='form-check-input ms-2'
                                        value={martes}
                                        data-id='3'
                                        onChange={(e) => setMartes(e.target.checked)}
                                    />

                                    <label htmlFor='martes' className='form-check-label ms-2'>Martes</label>

                                </div>

                                <div className='d-flex'>
                                    <input
                                        id='miércoles'
                                        type='checkbox'
                                        className='form-check-input ms-2'
                                        value={miércoles}
                                        data-id='4'
                                        onChange={(e) => setMiércoles(e.target.checked)}
                                    />

                                    <label htmlFor='miércoles' className='form-check-label ms-2'>Miércoles</label>
                                </div>

                                <div className='d-flex'>
                                    <input
                                        id='jueves'
                                        type='checkbox'
                                        className='form-check-input ms-2'
                                        value={jueves}
                                        data-id='5'
                                        onChange={(e) => setJueves(e.target.checked)}
                                    />

                                    <label htmlFor='jueves' className='form-check-label ms-2'>Jueves</label>
                                </div>

                                <div className='d-flex'>
                                    <input
                                        id='viernes'
                                        type='checkbox'
                                        className='form-check-input ms-2'
                                        value={viernes}
                                        data-id='6'
                                        onChange={(e) => setViernes(e.target.checked)}
                                    />
                                    <label htmlFor='viernes' className='form-check-label ms-2'>Viernes</label>
                                </div>
                            </div>
                        </div>


                        <div id='meses' className='d-flex flex-column justify-content-between ms-5'>
                            <h6>Del mes:</h6>

                            <div className='d-flex'>
                                <input
                                    id='actual'
                                    type='checkbox'
                                    className='form-check-input ms-2'
                                    value={actual}
                                    onChange={(e) => setActual(e.target.checked)}
                                />

                                <label htmlFor='actual' className='form-check-label ms-2'>Actual <span className='month'></span></label>
                            </div>

                            <div className='d-flex'>
                                <input
                                    id='siguiente'
                                    type='checkbox'
                                    className='form-check-input ms-2'
                                    value={siguiente}
                                    onChange={(e) => setSiguiente(e.target.checked)}
                                />

                                <label htmlFor='siguiente' className='form-check-label ms-2'>Siguiente <span className='month'></span></label>
                            </div>

                            <div className='d-flex'>
                                <input
                                    id='proximo'
                                    type='checkbox'
                                    className='form-check-input ms-2'
                                    value={proximo}
                                    onChange={(e) => setProximo(e.target.checked)}
                                />
                                <label htmlFor='proximo' className='form-check-label ms-2'>Proximo <span className='month'></span></label>
                            </div>
                        </div>
                    </div>

                    {/* Calendario */}
                    {/* <div className='col-sm-12 d-flex justify-content-center'>
                        <Calendar
                            className='box-shadow-dark w-75 pointer-events-none'
                            calendarType={'US'}
                            minDetail={'year'}
                            minDate={new Date()}
                            onChange={(value) => fechaOnChange(value)}
                        />
                    </div> */}

                    {/* Horas */}
                    <div className='col-sm-12 mt-6'>
                        <h4 className='text-center text-shadow-dark mb-3'>Selecciona los horarios disponibles para el día seleccionado</h4>

                        <div className='d-flex justify-content-center mb-3'>
                            <button
                                className='btn bg-white text-primary border-primary'
                                onClick={() => selectAllHoras()}
                            >
                                Seleccionar todos
                            </button>
                        </div>

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
                                                onClick={(event) => toggleClickedHora(event.target)}
                                            >
                                                {horaItem.hora}
                                            </button>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Guardar */}
                    <div className='col-sm-12 d-flex justify-content-center mt-2'>
                        <button
                            className='btn bg-primary text-white border-primary mt-3 w-25'
                            type='button'
                            disabled={btnDisabled}
                            onClick={() => saveNewHorarios()}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </div>

            <Disponibilidad
                horas={horas}
            />
        </div>
    )
}

export default Agenda