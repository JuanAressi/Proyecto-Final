// Utilities.
import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation, faX } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

// Components.
import './style.css';

function Modal({ handleDelete, closeModalHistoriaClinica }) {
    // Render the 'Modal' component.
    return (
        <div id='modalDeleteHistoriaClinica' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div
                        className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'
                        onClick={() => closeModalHistoriaClinica('modalDeleteHistoriaClinica')}
                    >
                        <FontAwesomeIcon
                            icon={faX}
                            aria-label='Close'
                            style={{ pointerEvents: 'none' }}
                        />
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                        <div className='icon-container d-flex justify-content-center align-items-center bg-danger box-shadow-dark rounded-circle mb-2'>
                            <FontAwesomeIcon icon={faTriangleExclamation} className='text-white fa-5x mb-2' />
                        </div>
                        
                        <h5 className='text-center '>¿Está seguro que desea eliminar este registro de historia clínica?</h5>
                        <p className='mb-4'>Esta acción no puede deshacerse</p>

                        <button
                            className='btn btn-danger box-shadow-dark w-50 mb-3'
                            onClick={() => handleDelete()}
                        >
                            Eliminar
                        </button>
                        
                        <button
                            id='closeModalComponent'
                            className='btn btn-secondary box-shadow-dark w-50'
                            onClick={() => closeModalHistoriaClinica('modalDeleteHistoriaClinica')}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal