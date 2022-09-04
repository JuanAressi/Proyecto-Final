import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faX } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function NuevoPaciente() {
    return (
        <div id='modalAdd' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Agregar nuevo Paciente</h1>
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
                        <div className="d-flex justify-content-center align-items-center row mb-3">
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='nombre'>Nombre</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='nombre'
                                    placeholder='Nombre'
                                    aria-label='Nombre'
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='apellido'>Apellido</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='apellido'
                                    placeholder='Apellido'
                                    aria-label='Apellido'
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='fecha_nacimiento'>Fecha de Nacimiento</label>
                                    
                                <input
                                    className='form-control'
                                    type='fecha_nacimiento'
                                    name='fecha_nacimiento'
                                    placeholder='Fecha de Nacimiento'
                                    aria-label='Fecha de Nacimiento'
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='email'>Email</label>
                                    
                                <input
                                    className='form-control'
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    aria-label='Email'
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='dni'>DNI</label>
                                    
                                <input
                                    className='form-control'
                                    type='dni'
                                    name='dni'
                                    placeholder='DNI'
                                    aria-label='DNI'
                                />
                            </div>

                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='telefono'>Telefono</label>
                                    
                                <input
                                    className='form-control'
                                    type='telefono'
                                    name='telefono'
                                    placeholder='Telefono'
                                    aria-label='Telefono'
                                />
                            </div>                            

                            <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                <label htmlFor='genero'>Genero</label>

                                <select
                                    className='form-control'
                                    name='genero'
                                >
                                    <option value='Femenino'>Femenino</option>
                                    <option value='Masculino'>Masculino</option>
                                    <option value='No Binario'>No Binario</option>
                                    <option value='No especifica'>No especifica</option>
                                </select>

                                <span className='custom-arrow position-absolute h-100'></span>
                            </div>
                            
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='numero_obra_social'>Numero de Obra Social</label>
                                    
                                <input
                                    className='form-control'
                                    type='numero_obra_social'
                                    name='numero_obra_social'
                                    placeholder='Numero de Obra Social'
                                    aria-label='Numero de Obra Social'
                                />
                            </div>
                        </div>

                        <button className='btn bg-primary text-white box-shadow-dark w-50 mb-3'>Agregar</button>
                        <button id='closeModal' className='btn btn-secondary box-shadow-dark w-50' data-bs-dismiss='modal'>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NuevoPaciente