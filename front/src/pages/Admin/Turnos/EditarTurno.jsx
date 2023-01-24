import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function EditarTurno({turnoFecha, turnoHora, turnoEstado, turnoMedico, turnoPaciente, setTurnoEstado}) {
    const estados = [
        {value: 'reservado', text: 'Reservado'},
        {value: 'confirmado', text: 'Confirmado'},
        {value: 'cancelado', text: 'Cancelado'},
        {value: 'concretado', text: 'Concretado'},
    ];

    // Render the 'EditarTurno' component.
    return (
        <div id='modalEdit' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    {/* Modal Header */}
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Editar Turno</h1>
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
                        <div className='row d-flex justify-content-center w-100'>
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
                            
                            {/* Paciente */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='paciente'>Paciente</label>
                                    
                                <input
                                    className='form-control'
                                    type='string'
                                    name='paciente'
                                    aria-label='Paciente del turno'
                                    placeholder={turnoPaciente}
                                    disabled={true}
                                />
                            </div>

                            {/* Genero */}
                            <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                <label htmlFor='estado'>Estado</label>

                                <select
                                    className='form-control'
                                    name='estado'
                                    value={turnoEstado}
                                    onChange={e => setTurnoEstado(e.target.value)}
                                >
                                    {estados && estados.map((estado, index) => {
                                        if (estado.text === turnoEstado) {
                                            return <option value={estado.value} selected key={index}>{estado.text}</option>
                                        } else {
                                            return <option value={estado.value} key={index}>{estado.text}</option>
                                        }
                                    })}
                                </select>

                                <span className='custom-arrow position-absolute h-100'></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarTurno