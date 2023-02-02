// Utilities.
import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

// Components.
import loadingGif from '../../../components/assets/img/loadingGif.gif';

function EditarHistoriaClinica({ pacienteAntecedentes, pacienteAlergias, fechaConsulta, medico, motivoConsulta, diagnostico, setPacienteAntecedentes, setPacienteAlergias, showSpinner, setMotivoConsulta, setDiagnostico, updateHistoriaClinica, closeModalHistoriaClinica }) {
    const [buttonDisabled, setButtonDisabled] = useState(false);


    // Disable the button.
    useEffect(() => {
        if (motivoConsulta === '' || diagnostico === '') {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [pacienteAntecedentes, pacienteAlergias, motivoConsulta, diagnostico]);


    // Render the 'Nueva Historia Clinica' component.
    return (
        <div id='modalEditHistoriaClinica' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    {/* Modal Header */}
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Editar registro de Historia Clinica</h1>
                    </div>

                    {/* Close Button */}
                    <div
                        className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'
                        onClick={() => closeModalHistoriaClinica('modalEditHistoriaClinica')}
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
                                    type='text'
                                    name='fecha_hoy'
                                    aria-label='Fecha de hoy'
                                    placeholder={fechaConsulta}
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
                                    placeholder={medico}
                                    disabled={true}
                                />
                            </div>

                            {/* Antecedentes */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='antecedentes'>Antecedentes</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='antecedentes'
                                    aria-label='Antecedentes'
                                    placeholder='Antecedentes'
                                    value={pacienteAntecedentes}
                                    onChange={(event) => setPacienteAntecedentes(event.target.value)}
                                />
                            </div>

                            {/* Alergias */}
                            <div className='col-md-6 col-sm-12 mb-2'>
                                <label htmlFor='alergias'>Alergias</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='alergias'
                                    aria-label='Alergias'
                                    placeholder='Alergias'
                                    value={pacienteAlergias}
                                    onChange={(event) => setPacienteAlergias(event.target.value)}
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
                                    value={motivoConsulta}
                                    onChange={(event) => setMotivoConsulta(event.target.value)}
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
                                    value={diagnostico}
                                    onChange={(event) => setDiagnostico(event.target.value)}
                                />
                            </div> 
                        </div>

                        <button
                            className='d-flex justify-content-center align-items-center btn bg-primary text-white box-shadow-dark w-50 mt-3 mb-3'
                            onClick={() => {
                                updateHistoriaClinica();
                                setButtonDisabled(true);
                            }}
                            disabled={buttonDisabled}
                        >
                            {showSpinner && 
                                <div style={{width: '40px', marginTop: '-5px'}}>
                                    <img src={loadingGif} alt='wait until the page loads' height='20px'/>
                                </div>
                            }

                            Actualizar
                        </button>

                        <button
                            id='closeModalEdit'
                            className='btn btn-secondary box-shadow-dark w-50'
                            onClick={() => closeModalHistoriaClinica('modalEditHistoriaClinica')}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditarHistoriaClinica