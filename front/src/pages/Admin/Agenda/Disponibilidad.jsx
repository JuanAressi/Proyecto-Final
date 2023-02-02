import React from 'react';
import $ from 'jquery';
import Calendar from 'react-calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function Disponibilidad( {horas} ) {
    return (
        <div id='modalAdd' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Mis Disponibilidades</h1>
                    </div>

                    <div className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'>
                        <FontAwesomeIcon
                            className='text-primary'
                            icon={faX}
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        />
                    </div>

                    <div className='d-flex flex-column align-items-center w-100'>
                        <div id='modalMessage' className='d-none alert bg-light border p-1 px-3 mb-2 w-100 border-left-danger'>
                            <p className='mb-0'>Ya existe un turno para el medico en la fecha y hora seleccionada</p>
                        </div>

                        <div className='row w-100'>
                            {/* Fecha */}
                            <div id='calendarContainer' className='col-lg-6 col-md-12 mt-2 mb-2'>
                                <label>Fecha</label>                                

                                <Calendar
                                    className='box-shadow-dark-1 mt-1 w-100'
                                    calendarType={'US'}
                                    minDetail={'year'}
                                    minDate={new Date()}
                                    // maxDate={new Date(fechaMax)}
                                    // onChange={(value) => setClickedFecha(value)}
                                />
                            </div>

                            {/* Hora */}
                            <div id='horaContainer' className='col-lg-6 col-md-12 mt-2 mb-2'>
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
                        </div>

                        {/* <button
                            className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                            // onClick={addTurno}
                            // disabled={turnoMedico === '' || turnoPaciente === '' || turnoFecha === '' || turnoHora === ''}
                        >
                            Guardar turno
                        </button> */}

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

export default Disponibilidad