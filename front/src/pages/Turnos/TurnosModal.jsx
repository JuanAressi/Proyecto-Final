import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';


function TurnosModal( { medicoName, fecha, hora } ) {
    return (
        <div id='modalTurnos' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'>
                        <FontAwesomeIcon
                            className='text-primary'
                            icon={faX}
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        />
                    </div>

                    <div className='d-flex flex-column align-items-center text-center'>
                        <FontAwesomeIcon
                            className='text-success rounded-circle p-2 mb-2'
                            icon={faCheck}
                            data-bs-dismiss='modal'
                            aria-label='Close'
                            style={{ width: '50px', height: '50px', border: '2px solid' }}
                        />

                        <h3 className='text-success mb-2'>¡Turno confirmado!</h3>
                        <p>Su turno se con el especialista: <span className='text-primary'>{medicoName}</span>, el día <span className='text-primary'>{fecha}</span> a las <span className='text-primary'>{hora}</span>, se registró de manera correcta</p>

                        <p className='small'>En breve será redireccionado a la pagina de inicio</p>

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

export default TurnosModal