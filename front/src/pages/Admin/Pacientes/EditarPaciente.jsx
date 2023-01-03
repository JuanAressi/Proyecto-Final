import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faX } from '@fortawesome/free-solid-svg-icons';

function EditarPaciente( { pacienteNombre, pacienteApellido, pacienteFechaNacimiento, pacienteEmail, pacienteDni, pacienteTelefono, pacienteGenero, pacienteObraSocial, setPacienteNombre, setPacienteApellido, setPacienteFechaNacimiento, setPacienteEmail, setPacienteDni, setPacienteTelefono, setPacienteGenero, setPacienteObraSocial, updatePaciente } ) {
    /**
     * Function toggleActive - Switch the active tab.
     *
     * @param object event - The event object.
     */
    function toggleActive(event) {
        // Check if the clicked element is not the active one.
        if (! event.target.className.includes('active')) {
            // Obtain all the tabs.
            var tabsChild = document.getElementById('tabs').childNodes;

            tabsChild.forEach(element => {
                if (element.className.includes('active')) {
                    element.classList.remove('active');
                    event.target.classList.add('active');
                }
            });
        }
    }


    return (
        <div id='modalEdit' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Editar Paciente</h1>
                    </div>

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

                    <div className='d-flex flex-column'>
                        <div id='tabs' className='d-flex bg-lightgray pt-1 z-index-0'>
                            <div 
                                className='border-top-1 py-2 px-4 ms-2 cursor-pointer active'
                                onClick={(event) => { toggleActive(event) }}
                            >
                                Datos personales
                            </div>

                            <div 
                                className='border-top-1 py-2 px-4 cursor-pointer'
                                onClick={(event) => { toggleActive(event) }}
                            >
                                Historia clinica
                            </div>
                        </div>

                        <div id='formContainer' className='d-flex flex-column align-items-center bg-white z-index-1'>
                            <form id='formAdd' className='d-flex justify-content-center align-items-center row mb-3'>
                                <div className='col-lg-4 col-md-6 mb-2'>
                                    <label htmlFor='nombre'>Nombre</label>

                                    <input
                                        className='form-control'
                                        type='text'
                                        name='nombre'
                                        placeholder='Nombre'
                                        aria-label='Nombre'
                                        value={pacienteNombre}
                                        onChange={e => setPacienteNombre(e.target.value)}
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
                                        value={pacienteApellido}
                                        onChange={e => setPacienteApellido(e.target.value)}
                                    />
                                </div>

                                <div className='col-lg-4 col-md-6 mb-2'>
                                    <label htmlFor='fecha_nacimiento'>Fecha de Nacimiento</label>
                                        
                                    <input
                                        className='form-control'
                                        type='date'
                                        name='fecha_nacimiento'
                                        placeholder='Fecha de Nacimiento'
                                        aria-label='Fecha de Nacimiento'
                                        value={pacienteFechaNacimiento}
                                        onChange={e => setPacienteFechaNacimiento(e.target.value)}
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
                                        value={pacienteEmail}
                                        onChange={e => setPacienteEmail(e.target.value)}
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
                                        value={pacienteDni}
                                        onChange={e => setPacienteDni(e.target.value)}
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
                                        value={pacienteTelefono}
                                        onChange={e => setPacienteTelefono(e.target.value)}
                                    />
                                </div>                            

                                <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                    <label htmlFor='genero'>Genero</label>

                                    <select
                                        className='form-control'
                                        name='genero'
                                        value={pacienteGenero}
                                        onChange={e => setPacienteGenero(e.target.value)}
                                    >
                                        <option value='' disabled>Seleccione una opción</option>
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
                                        value={pacienteObraSocial}
                                        onChange={e => setPacienteObraSocial(e.target.value)}
                                    />
                                </div>
                            </form>

                            <button
                                className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                                onClick={updatePaciente}
                            >
                                Guardar cambios
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
        </div>
    )
}

export default EditarPaciente