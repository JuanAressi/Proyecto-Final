import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faX } from '@fortawesome/free-solid-svg-icons';

function NuevoTurno( { turnoMedico, turnoPaciente, turnoFecha, turnoHora, turnoFechaDia, setTurnoMedico, setTurnoPaciente, setTurnoFecha, setTurnoHora, setTurnoFechaDia, addTurno } ) {
    





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
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='nombre'>Médico</label>

                                <input
                                    className='form-control'
                                    type='text'
                                    name='medico'
                                    placeholder='Medico'
                                    aria-label='Medico'
                                    value={turnoMedico}
                                    onChange={e => setTurnoMedico(e.target.value)}
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='apellido'>Paciente</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='paciente'
                                    placeholder='Paciente'
                                    aria-label='Paciente'
                                    value={turnoPaciente}
                                    onChange={e => setTurnoPaciente(e.target.value)}
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='fecha_nacimiento'>Fecha</label>
                                    
                                <input
                                    className='form-control'
                                    type='date'
                                    name='fecha'
                                    placeholder='Fecha'
                                    aria-label='Fecha'
                                    value={turnoFecha}
                                    onChange={e => setTurnoFecha(e.target.value)}
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='hora'>Hora</label>
                                    
                                <input
                                    className='form-control'
                                    type='hora'
                                    name='hora'
                                    placeholder='Hora'
                                    aria-label='Hora'
                                    value={turnoHora}
                                    onChange={e => setTurnoHora(e.target.value)}
                                />
                            </div>
                        </form>

                        <button
                            className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                            onClick={addTurno}
                            // disabled={turnoNombre === '' || turnoApellido === '' || turnoFechaNacimiento === '' || turnoEmail === '' || turnoDni === '' || turnoTelefono === '' || turnoGenero === '' || turnoObraSocial === ''}
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