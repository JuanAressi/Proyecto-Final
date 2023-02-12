import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import SideNav from '../../../components/SideNav/SideNav';
import Alert from '../../../components/Alert/Alert';
import Disponibilidad from './Disponibilidad';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import './style.css';

function Agenda() {
    // Button selected.
    const [selectedButton, setSelectedButton] = useState('nuevaDisponibilidad');

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
    const [actualLabel, setActualLabel] = useState('');
    const [siguienteLabel, setSiguienteLabel] = useState('');
    const [proximoLabel, setProximoLabel] = useState('');

    // Disponibilidad.
    const [díasLista, setDíasLista] = useState([]);
    const [horariosLista, setHorariosLista] = useState([]);
    const [día, setDía] = useState(false);

    // Utilities.
    const [userId, setUserId] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [btnVerDisponibilidadDisabled, setBtnVerDisponibilidadDisabled] = useState(true);
    const [saveData, setSaveData] = useState(false);

    // Alert.
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');


    // Adds an extra label and 'data-mes' to the checkboxes.
    useEffect(() => {
        // Get the user from LocalStorage.
        const user = JSON.parse(localStorage.getItem('user'));

        // Change 'userId' state.
        setUserId(user.id);

        // Get the current Month.
        const currentMonth = new Date().getMonth();

        switch (currentMonth) {
            case 0:
                // Change the labels state.
                setActualLabel('(Enero)');
                setSiguienteLabel('(Febrero)');
                setProximoLabel('(Marzo)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 1:
                // Change the labels state.
                setActualLabel('(Febrero)');
                setSiguienteLabel('(Marzo)');
                setProximoLabel('(Abril)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 2:
                // Change the labels state.
                setActualLabel('(Marzo)');
                setSiguienteLabel('(Abril)');
                setProximoLabel('(Mayo)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 3:
                // Change the labels state.
                setActualLabel('(Abril)');
                setSiguienteLabel('(Mayo)');
                setProximoLabel('(Junio)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 4:
                // Change the labels state.
                setActualLabel('(Mayo)');
                setSiguienteLabel('(Junio)');
                setProximoLabel('(Julio)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 5:
                // Change the labels state.
                setActualLabel('(Junio)');
                setSiguienteLabel('(Julio)');
                setProximoLabel('(Agosto)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 6:
                // Change the labels state.
                setActualLabel('(Julio)');
                setSiguienteLabel('(Agosto)');
                setProximoLabel('(Septiembre)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 7:
                // Change the labels state.
                setActualLabel('(Agosto)');
                setSiguienteLabel('(Septiembre)');
                setProximoLabel('(Octubre)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 8:
                // Change the labels state.
                setActualLabel('(Septiembre)');
                setSiguienteLabel('(Octubre)');
                setProximoLabel('(Noviembre)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 9:
                // Change the labels state.
                setActualLabel('(Octubre)');
                setSiguienteLabel('(Noviembre)');
                setProximoLabel('(Diciembre)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 10:
                // Change the labels state.
                setActualLabel('(Noviembre)');
                setSiguienteLabel('(Diciembre)');
                setProximoLabel('(Enero)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;

            case 11:
                // Change the labels state.
                setActualLabel('(Diciembre)');
                setSiguienteLabel('(Enero)');
                setProximoLabel('(Febrero)');

                // Add the 'data-mes' attribute to the checkboxes.
                $('#actual').attr('data-mes', currentMonth + 1);
                $('#siguiente').attr('data-mes', currentMonth + 2);
                $('#proximo').attr('data-mes', currentMonth + 3);

                break;
                
            default:
                break;
        }
    }, []);


    // Handle changes in the action.
    useEffect(() => {
        if (selectedButton === 'verDisponibilidad') {
            // Get all the días for this user.
            getDías(userId);
        }
    }, [selectedButton]);


    // Handle the btnDisabled state.
    useEffect(() => {
        if ((lunes || martes || miércoles || jueves || viernes) && (actual || siguiente || proximo) && horaSelected) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [lunes, martes, miércoles, jueves, viernes, actual, siguiente, proximo, horaSelected]);


    // Handle the submit event.
    useEffect(() => {
        if (saveData) {
            saveNewHorarios();
        }
    }, [saveData]);


    /**
     * Function selectTabOption - Switch the button selected.
     *
     * @param {object} target - The target of the event.
     *
     * @return {void}
     */
    const selectTabOption = (target) => {
        // Cheek if the button is already selected.
        if (!target.classList.contains('selected')) {
            // Get the id of the button.
            const id = target.id;

            // Get the elements.
            const historiaClinica = document.getElementById('nuevaDisponibilidad');
            const turnos = document.getElementById('verDisponibilidad');

            if (id === 'nuevaDisponibilidad') {
                // Add and remove classes to the buttons
                turnos.classList.remove('bg-primary', 'text-white', 'selected');
                turnos.classList.add('bg-white', 'text-primary', 'border-primary');

                historiaClinica.classList.remove('bg-white', 'text-primary', 'border-primary');
                historiaClinica.classList.add('bg-primary', 'text-white', 'selected');

                // Set the selected button.
                setSelectedButton('nuevaDisponibilidad');
            } else if (id === 'verDisponibilidad') {
                // Add and remove classes to the buttons
                historiaClinica.classList.remove('bg-primary', 'text-white', 'selected');
                historiaClinica.classList.add('bg-white', 'text-primary', 'border-primary');

                turnos.classList.remove('bg-white', 'text-primary', 'border-primary');
                turnos.classList.add('bg-primary', 'text-white', 'selected');

                // Set the selected button.
                setSelectedButton('verDisponibilidad');
            }
        }
    }


    /**
     * Function getDías - Make an ajax request to get all the days available for the selected 'Medico'.
     * 
     * @param {number} id - The id of the 'Medico'.
     *
     * @return {void}
     */
    const getDías = (id) => {
        // Change Spinner state.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'medicos/' + id + '/fechas',
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Change Spinner state.
                setShowSpinner(false);

                // Set the 'fechas' state.
                setDíasLista(response.fechas);
            },
            error: function (error) {
                console.log(error);
            }
        });
    };


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
     * Function getInformationAndSave - Save the new horarios.
     *
     * @return {void}
     */
    const getInformationAndSave = () => {
        // Change Spinner state.
        setShowSpinner(true);

        // Change 'btnDisabled' state.
        setBtnDisabled(true);

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
            let dataMes = mes.getAttribute('data-mes');

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
                        // Save only the dates that are greater than or equal to today.
                        if (i >= today && (díaId - 1 === dateDay)) {
                            // Add a 0 to the day, so it has 2 digits.
                            if (i < 10) {
                                i = '0' + i;
                            }

                            // Add a 0 to the month, so it has 2 digits.
                            if (dataMes.length === 1) {
                                dataMes = '0' + dataMes;
                            }

                            setDatesToSave((datesToSave) => [...datesToSave, `${i}-${dataMes}-${año}`]);
                        }
                    } else {
                        // Save all the dates.
                        // Check if the current 'dataMes' is lower than the current month, that means that the year is the next year.
                        const mesActual = document.getElementById('actual').getAttribute('data-mes');

                        if (parseInt(dataMes) < parseInt(mesActual) && (año === new Date().getFullYear() || año === new Date().getFullYear() + 1)) {
                            año++;
                        }

                        if (díaId - 1 === dateDay) {
                            // Add a 0 to the day, so it has 2 digits.
                            if (i < 10) {
                                i = '0' + i;
                            }

                            // Add a 0 to the month, so it has 2 digits.
                            if (dataMes.length === 1) {
                                dataMes = '0' + dataMes;
                            }

                            setDatesToSave((datesToSave) => [...datesToSave, `${i}-${dataMes}-${año}`]);
                        }
                    }
                }
            });
        });

        // Loop trough the 'horas' buttons.
        horas.forEach((hora) => {
            // Validate if is not in the array already.
            if (!horasSelected.includes(hora.innerText)) {
                setHorasSelected((horasSelected) => [...horasSelected, hora.innerText]);
            }
        });

        // Change 'saveData' state.
        setSaveData(true);
    }


    /**
     * Function saveNewHorarios - Save the new horarios into the database.
     *
     * @return {void}
     */
    const saveNewHorarios = () => {
        // Change 'saveData' state.
        setSaveData(false);

        // Make API call to save the information.
        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'medicos/horarios',
            type: 'POST',
            dataType: 'json',
            data: {
                'id_medico': userId,
                'fechas': datesToSave,
                'horas': horasSelected,
            },
            success: (response) => {
                // Change Spinner state.
                setShowSpinner(false);
        
                // Change 'btnDisabled' state.
                setBtnDisabled(false);

                // Show Alert.
                setAlertType('success')
                setAlertMessage(response.message);
                setShowAlert(true);

                // Close alert message after 4 seconds.
                setTimeout(function () {
                    setShowAlert(false);
                }, 4000);
            },
            error: (error) => {
                // Change Spinner state.
                setShowSpinner(false);
        
                // Change 'btnDisabled' state.
                setBtnDisabled(false);

                console.log(error);
            }
        });
    }


    /**
     * Function setClickedDía - Select the item clicked, get the id and make an ajax call to get all the 'Horarios' and their status.
     *
     * @param {object} target - The clicked element.
     *
     * @return {void}
     */
    const setClickedDía = (target) => {
        // Get the id of the element.
        const id = target.getAttribute('data-id');

        // Set the 'clickedDía' state.
        setDía(id);

        // Change the 'selected' class.
        const díaSelected = document.querySelector('#díasLista .item.selected');

        if (díaSelected) {
            díaSelected.classList.remove('selected');
        }

        target.classList.add('selected');

        // Get the 'Horas' for the selected 'Día'.
        getHoras(id);

        // Change the 'setBtnVerDisponibilidadDisabled' state.
        setBtnVerDisponibilidadDisabled(false);
    }


    /**
     * Function getHoras - Make an ajax request to get all the hours available for the selected 'Medico'.
     *
     * @param {string} id - The ID of the date selected.
     *
     * @return {void}
     */
    const getHoras = (id) => {
        // Set Spinner state.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'medicos/' + id + '/horas',
            type: 'GET',
            dataType: 'json',
            data: {
                'type': 'agenda'
            },
            success: function (response) {
                // Change Spinner state.
                setShowSpinner(false);

                if (response.horas) {
                    // Set the 'horarios' state.
                    setHorariosLista(response.horas);
                }
            },
            error: function (error) {
                // Change Spinner state.
                setShowSpinner(false);

                console.log(error);
            }
        });
    };


    /**
     * Function updateHorarios - Make an ajax request to update the 'Horarios' status.
     *
     * @return {void}
     */
    const updateHorarios = () => {
        // Obtain all the 'Horas' that are checked.
        const horas = document.querySelectorAll('#horariosLista .item input[type="checkbox"]:checked');
        
        // Loop trough the 'horas' and save the 'hora' into an array.
        let horasSelected = [];

        horas.forEach((hora) => {
            horasSelected.push(hora.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText);
        });

        // Make API call to update the information.
        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'medicos/horarios',
            type: 'DELETE',
            dataType: 'json',
            data: {
                'id_turno_fecha': día,
                'horas': horasSelected,
            },
            success: (response) => {
                console.log('response', response)

                // Change Spinner state.
                setShowSpinner(false);
        
                // Change 'btnDisabled' state.
                setBtnDisabled(false);

                // Show Alert.
                setAlertType('success')
                setAlertMessage(response.message);
                setShowAlert(true);

                // Get the 'Horas' for the selected 'Día'.
                getHoras(día);

                // Close alert message after 4 seconds.
                setTimeout(function () {
                    setShowAlert(false);
                }, 4000);
            },
            error: (error) => {
                // Change Spinner state.
                setShowSpinner(false);
        
                // Change 'btnDisabled' state.
                setBtnDisabled(false);

                console.log(error);
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
                        {showSpinner && <img src={loadingGif} alt='Espera a que termine de cargar' height='20px'/>}
                    </div>
                </div>

                {
                    showAlert ? <Alert
                        type={alertType}
                        message={alertMessage}
                    />
                    : null
                }

                <div className='row d-flex justify-content-center'>
                    <div className='col-sm-12'>
                        <h4 className='text-shadow-dark mb-2'>Selecciona el tipo de acción a realizar</h4>

                        {/* Tipo de reporte */}
                        <div id='tipoTab' className='d-flex'>
                            <button
                                id='nuevaDisponibilidad'
                                className='btn bg-primary text-white selected'
                                onClick={(event) => selectTabOption(event.target)}
                            >
                                Cargar disponibilidad
                            </button>

                            <button
                                id='verDisponibilidad'
                                className='btn bg-white border-primary text-primary'
                                onClick={(event) => selectTabOption(event.target)}
                            >
                                Ver disponibilidad cargada
                            </button>
                        </div>
                    </div>

                    {
                        selectedButton === 'nuevaDisponibilidad'
                        ? <>
                            <div className='col-sm-12 mt-6'>
                                <h4 className='text-center text-shadow-dark mb-2'>Selecciona las opciones para cargar su disponibilidad</h4>
                            </div>
                            
                            <div id='checkboxs' className='col-sm-12 d-flex justify-content-around mb-3'>
                                {/* Días */}
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
                                                onChange={(event) => toggleDays(event.target.checked)}
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
                                                onChange={(event) => setMartes(event.target.checked)}
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
                                                onChange={(event) => setMiércoles(event.target.checked)}
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
                                                onChange={(event) => setJueves(event.target.checked)}
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
                                                onChange={(event) => setViernes(event.target.checked)}
                                            />
                                            <label htmlFor='viernes' className='form-check-label ms-2'>Viernes</label>
                                        </div>
                                    </div>
                                </div>

                                {/* Meses */}
                                <div id='meses' className='d-flex flex-column justify-content-between ms-5'>
                                    <h6>Del mes:</h6>

                                    <div className='d-flex'>
                                        <input
                                            id='actual'
                                            type='checkbox'
                                            className='form-check-input ms-2'
                                            value={actual}
                                            onChange={(event) => setActual(event.target.checked)}
                                        />

                                        <label htmlFor='actual' className='form-check-label ms-2'>Actual {actualLabel}</label>
                                    </div>

                                    <div className='d-flex'>
                                        <input
                                            id='siguiente'
                                            type='checkbox'
                                            className='form-check-input ms-2'
                                            value={siguiente}
                                            onChange={(event) => setSiguiente(event.target.checked)}
                                        />

                                        <label htmlFor='siguiente' className='form-check-label ms-2'>Siguiente {siguienteLabel}</label>
                                    </div>

                                    <div className='d-flex'>
                                        <input
                                            id='proximo'
                                            type='checkbox'
                                            className='form-check-input ms-2'
                                            value={proximo}
                                            onChange={(event) => setProximo(event.target.checked)}
                                        />
                                        <label htmlFor='proximo' className='form-check-label ms-2'>Proximo {proximoLabel}</label>
                                    </div>
                                </div>
                            </div>

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
                                    onClick={getInformationAndSave}
                                >
                                    Guardar
                                </button>
                            </div>
                        </>
                        : <div className='row d-flex justify-content-center mt-6'>
                            {/* Días con disponibilidad cargados */}
                            <div className='col-md-6'>
                                <h4 className='text-center text-shadow-dark mb-3'>Días con disponibilidad cargados</h4>

                                <div className='bg-white m-2'>
                                    <div id='díasLista' className='border-05 box-shadow-dark'>
                                        {díasLista && díasLista.map((dia, index) => (
                                            <div
                                                className='item d-flex align-items-center border-bottom pt-1 pb-1 px-2'
                                                data-id={dia.id}
                                                key={index}
                                                onClick={(event) => setClickedDía(event.target)}
                                            >
                                                <p className='m-0' style={{ pointerEvents: 'none' }}>{dia.dia}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Horarios con disponibilidad */}
                            <div className='col-md-6'>
                                <h4 className='text-center text-shadow-dark mb-3'>Horarios con disponibilidad cargados</h4>

                                <div className='bg-white m-2'>
                                    <div id='horariosLista' className='border-05 box-shadow-dark'>
                                        {horariosLista && horariosLista.map((horario, index) => (
                                            <div
                                                className='item d-flex justify-content-between align-items-center border-bottom pt-1 pb-1 px-2'
                                                key={index}
                                            >
                                                <div className='d-flex'>
                                                    <p className='mb-0'>{horario.hora}</p>
                                                    <p className='mb-0'> - {horario.estado !== '' ? horario.estado : 'Horario no cargado como disponible'}</p>
                                                </div>

                                                <div id='switchContainer'>
                                                    {
                                                        horario.estado === 'libre'
                                                        ? <div className='button r'>
                                                            <input
                                                                className='checkbox'
                                                                type='checkbox'
                                                                name={'estado' + index}
                                                            />

                                                            <div className='knobs'></div>
                                                            <div className='layer'></div>
                                                        </div>
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>                         
                                </div>
                            </div>

                            {/* Guardar */}
                            <div className='col-sm-12 d-flex justify-content-center mt-2'>
                                <button
                                    className='btn bg-primary text-white border-primary mt-3 w-25'
                                    type='button'
                                    onClick={updateHorarios}
                                    disabled={btnVerDisponibilidadDisabled}
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    }


                </div>
            </div>

            <Disponibilidad
                horas={horas}
            />
        </div>
    )
}

export default Agenda