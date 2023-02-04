import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function EditarTurno({ turnoFecha, turnoHora, turnoEstado, turnoMedico, setTurnoEstado, updateTurno }) {
    let estados = [
        {value: 'reservado', text: 'Reservado'},
        {value: 'cancelado', text: 'Cancelado'},
    ];

    const [changeEstado, setChangeEstado] = useState(false);


    // Render the 'EditarTurno' component.
    return (
        <div id='modalEdit' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    {/* Modal Header */}
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Información del Turno</h1>
                    </div>

                    {/* Close Button */}
                    <div
                        className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                    >
                        <FontAwesomeIcon
                            className='text-primary'
                            icon={faX}
                        />
                    </div>

                    
                    {/* Modal Body */}
                    <div className='d-flex flex-column align-items-center bg-white p-4 w-100'>
                        {/* Inputs */}
                        <div className='row d-flex justify-content-center w-100 mb-3'>
                            {/* Fecha */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='fecha'>Fecha</label>
                                    
                                <input
                                    className='form-control'
                                    type='string'
                                    name='fecha'
                                    aria-label='Fecha del turno'
                                    placeholder={turnoFecha}
                                    disabled={true}
                                />
                            </div>

                            {/* Hora */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='hora'>Hora</label>
                                    
                                <input
                                    className='form-control'
                                    type='string'
                                    name='hora'
                                    aria-label='Hora del turno'
                                    placeholder={turnoHora}
                                    disabled={true}
                                />
                            </div>

                            {/* Médico */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='medico'>Médico</label>
                                    
                                <input
                                    className='form-control'
                                    type='string'
                                    name='medico'
                                    aria-label='Médico del turno'
                                    placeholder={turnoMedico}
                                    disabled={true}
                                />
                            </div>

                            {/* Estado */}
                            <div className='col-md-6 mb-2 position-relative'>
                                <label htmlFor='estado'>Estado</label>

                                <select
                                    id='estado'
                                    className='form-control'
                                    name='estado'
                                    value={turnoEstado}
                                    onChange={(e) => {
                                        setChangeEstado(true);
                                        setTurnoEstado(e.target.value)
                                    }}
                                >
                                    {estados && estados.map((estado, index) => {
                                        if (estado.text === turnoEstado) {
                                            return <option value={estado.value} selected key={index}>{estado.text}</option>
                                        } else {
                                            return <option value={estado.value} key={index}>{estado.text}</option>
                                        }
                                    })}
                                </select>

                                <span className='custom-arrow position-absolute h-100' style={{right: '1rem'}}></span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <button
                            className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                            onClick={() => {
                                setChangeEstado(false);
                                updateTurno();
                            }}
                            disabled={!changeEstado}
                        >
                            Actualizar
                        </button>

                        <button
                            id='closeModalEdit'
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

export default EditarTurno