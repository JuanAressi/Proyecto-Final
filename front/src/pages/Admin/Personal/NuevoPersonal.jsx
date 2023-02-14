// Utilities.
import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function NuevoPersonal({ personalNombre, personalApellido, personalEmail, personalFechaNacimiento, personalGenero, personalDni, personalTelefono, personalRol, setPersonalNombre, setPersonalApellido, setPersonalEmail, setPersonalFechaNacimiento, setPersonalGenero, setPersonalDni, setPersonalTelefono, setPersonalRol, addPersonal }) {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        // Enable the 'Agregar' button if all the fields are filled.
        if (personalNombre !== '' && personalApellido !== '' && personalEmail !== '' && personalFechaNacimiento !== '' && personalGenero !== '' && personalDni !== '' && personalTelefono !== '' && personalRol !== '') {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [personalNombre, personalApellido, personalEmail, personalFechaNacimiento, personalGenero, personalDni, personalTelefono, personalRol]);


    // Render the 'NuevoPersonal' component.
    return (
        <div id='modalAdd' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Agregar nuevo Personal</h1>
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
                            {/* Nombre */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='nombre'>Nombre</label>

                                <input
                                    className='form-control'
                                    type='text'
                                    name='nombre'
                                    placeholder='Nombre'
                                    aria-label='Nombre'
                                    value={personalNombre}
                                    onChange={(event) => setPersonalNombre(event.target.value)}
                                />
                            </div>

                            {/* Apellido */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='apellido'>Apellido</label>
                                    
                                <input
                                    className='form-control'
                                    type='text'
                                    name='apellido'
                                    placeholder='Apellido'
                                    aria-label='Apellido'
                                    value={personalApellido}
                                    onChange={(event) => setPersonalApellido(event.target.value)}
                                />
                            </div>

                            {/* Email */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='email'>Email</label>
                                    
                                <input
                                    className='form-control'
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    aria-label='Email'
                                    value={personalEmail}
                                    onChange={(event) => setPersonalEmail(event.target.value)}
                                />
                            </div>

                            {/* Fecha de Nacimiento */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='fecha_nacimiento'>Fecha de Nacimiento</label>
                                    
                                <input
                                    className='form-control'
                                    type='date'
                                    name='fecha_nacimiento'
                                    placeholder='Fecha de Nacimiento'
                                    aria-label='Fecha de Nacimiento'
                                    value={personalFechaNacimiento}
                                    onChange={(event) => setPersonalFechaNacimiento(event.target.value)}
                                />
                            </div>

                            {/* Genero */}
                            <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                <label htmlFor='genero'>Genero</label>

                                <select
                                    className='form-control'
                                    name='genero'
                                    value={personalGenero}
                                    onChange={(event) => setPersonalGenero(event.target.value)}
                                >
                                    <option value='' disabled>Seleccione una opción</option>
                                    <option value='Femenino'>Femenino</option>
                                    <option value='Masculino'>Masculino</option>
                                    <option value='No Binario'>No Binario</option>
                                    <option value='No especifica'>No especifica</option>
                                </select>

                                <span className='custom-arrow position-absolute h-100'></span>
                            </div>

                            {/* DNI */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='dni'>DNI</label>
                                    
                                <input
                                    className='form-control'
                                    type='dni'
                                    name='dni'
                                    placeholder='DNI'
                                    aria-label='DNI'
                                    value={personalDni}
                                    onChange={(event) => setPersonalDni(event.target.value)}
                                />
                            </div>

                            {/* Telefono */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='telefono'>Telefono</label>
                                    
                                <input
                                    className='form-control'
                                    type='telefono'
                                    name='telefono'
                                    placeholder='Telefono'
                                    aria-label='Telefono'
                                    value={personalTelefono}
                                    onChange={(event) => setPersonalTelefono(event.target.value)}
                                />
                            </div>

                            {/* Rol */}
                            <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                <label htmlFor='rol'>Rol</label>

                                <select
                                    className='form-control'
                                    name='rol'
                                    value={personalRol}
                                    onChange={(event) => setPersonalRol(event.target.value)}
                                >
                                    <option value='' disabled>Seleccione una opción</option>
                                    <option value='Administrativo'>Administrativo</option>
                                    <option value='Médico'>Médico</option>
                                </select>

                                <span className='custom-arrow position-absolute h-100 right-2'></span>
                            </div>
                        </form>

                        <button
                            className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                            onClick={addPersonal}
                            disabled={buttonDisabled}
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

export default NuevoPersonal