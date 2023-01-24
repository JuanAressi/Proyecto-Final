import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function NuevaHistoriaClinica() {
    /**
     * Function closeModal - Closes the modal.
     *
     * @returns {void}
     */
    const closeModal = () => {

        // Get the modal.
        const modal = document.getElementById('modalHistoriaClinica');

        // Close the modal.
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        modal.removeAttribute('role');

        setTimeout(() => {
            modal.style.display = 'none';
        }, 75);
    };

    // Render the 'Nueva Historia Clinica' component.
    return (
        <div id='modalHistoriaClinica' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    {/* Modal Header */}
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Agregar registro de Historia Clinica</h1>
                    </div>

                    {/* Close Button */}
                    <div
                        className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'
                        onClick={closeModal}
                    >
                        <FontAwesomeIcon
                            className='text-primary'
                            icon={faX}
                        />
                    </div>

                    {/* Modal Body */}
                    <div className='d-flex flex-column align-items-center bg-white p-4 w-100'>
                        <div className='row w-100'>
                            {/* Fecha de hoy */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='fecha_hoy'>Fecha</label>
                                    
                                <input
                                    className='form-control'
                                    type='date'
                                    name='fecha_hoy'
                                    aria-label='Fecha de hoy'
                                    disabled={true}
                                />
                            </div>
                            
                            {/* Medico */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='medico'>Medico</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='medico'
                                    aria-label='Medico'
                                    placeholder='Aressi, Juan'
                                    disabled={true}
                                />
                            </div>
                            
                            {/* Motivo de consulta */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='motivo_consulta'>Motivo de consulta</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='motivo_consulta'
                                    aria-label='Motivo de consulta'
                                    placeholder='Motivo de consulta'
                                />
                            </div>
                            
                            {/* Diagnostico */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='diagnostico'>Diagnostico</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='diagnostico'
                                    aria-label='Diagnostico'
                                    placeholder='Diagnostico'
                                />
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevaHistoriaClinica