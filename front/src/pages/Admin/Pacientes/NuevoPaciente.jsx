import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

function NuevoPaciente({ pacienteNombre, pacienteApellido, pacienteEmail, pacienteFechaNacimiento, pacienteGenero, pacienteDni, pacienteTelefono, pacienteObraSocial, pacienteNumeroObraSocial, pacienteAntecedentes, pacienteAlergias, setPacienteNombre, setPacienteApellido, setPacienteEmail, setPacienteFechaNacimiento, setPacienteGenero, setPacienteDni, setPacienteTelefono, setPacienteObraSocial, setPacienteNumeroObraSocial, setPacienteAntecedentes, setPacienteAlergias, addPaciente }) {
    const obrasSociales = [
        {value: '', text: 'Selecciona una opción'},
        {value: 'OSDE', text: 'OSDE'},
        {value: 'Swiss Medical', text: 'Swiss Medical'},
        {value: 'Medifé', text: 'Medifé'},
        {value: 'Emerger', text: 'Emerger'},
        {value: 'Particular', text: 'Particular'}
    ];

    // Errors.
    const [nombreInvalidMessage, setNombreInvalidMessage] = useState('');
    const [apellidoInvalidMessage, setApellidoInvalidMessage] = useState('');
    const [emailInvalidMessage, setEmailInvalidMessage] = useState('');
    const [fechaNacimientoInvalidMessage, setFechaNacimientoInvalidMessage] = useState('');
    const [generoInvalidMessage, setGeneroInvalidMessage] = useState('');
    const [dniInvalidMessage, setDniInvalidMessage] = useState('');
    const [telefonoInvalidMessage, setTelefonoInvalidMessage] = useState('');
    const [obraSocialInvalidMessage, setObraSocialInvalidMessage] = useState('');
    const [numeroObraSocialInvalidMessage, setNumeroObraSocialInvalidMessage] = useState('');


    /**
     * Function validateNombre - Validate the 'Nombre' input.
     *
     * @return {void}
     */
    const validateNombre = () => {
        if (pacienteNombre === '') {
            setNombreInvalidMessage('El nombre es obligatorio.');
        } else {
            setNombreInvalidMessage('');
        }
    }


    /**
     * Function validateApellido - Validate the 'Apellido' input.
     *
     * @return {void}
     */
    const validateApellido = () => {
        if (pacienteApellido === '') {
            setApellidoInvalidMessage('El apellido es obligatorio.');
        } else {
            setApellidoInvalidMessage('');
        }
    }


    /**
     * Function validateEmail - Validate the 'Email' input.
     *
     * @return {void}
     */
    const validateEmail = () => {
        if (pacienteEmail === '') {
            setEmailInvalidMessage('El email es obligatorio.');
        } else if (!pacienteEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setEmailInvalidMessage('El email no es válido.');
        } else {
            setEmailInvalidMessage('');
        }
    }


    /**
     * Function validateFechaNacimiento - Validate the 'Fecha de nacimiento' input.
     *
     * @return {void}
     */
    const validateFechaNacimiento = () => {
        const fecha = pacienteFechaNacimiento.split('-').reverse().join('-');

        if (fecha === '') {
            setFechaNacimientoInvalidMessage('La fecha de nacimiento es obligatoria.');
        } else if (!fecha.match(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/)) {
            setFechaNacimientoInvalidMessage('La fecha de nacimiento no es válida.');
        } else if (fecha !== '') {
            // Validar que sea +18 años.    
            const fechaNacimiento = new Date(pacienteFechaNacimiento);
            const fechaActual = new Date();
            let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
            const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

            if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
                edad--;
            }
            if (edad < 18) {
                setFechaNacimientoInvalidMessage('Debe ser mayor de 18 años.');
            }
        } else {
            setFechaNacimientoInvalidMessage('');
        }
    }


    /**
     * Function validateGenero - Validate the 'Genero' input.
     *
     * @return {void}
     */
    const validateGenero = () => {
        if (pacienteGenero === '') {
            setGeneroInvalidMessage('El género es obligatorio.');
        } else {
            setGeneroInvalidMessage('');
        }
    }


    /**
     * Function validateDni - Validate the 'DNI' input.
     *
     * @return {void}
     */
    const validateDni = () => {
        if (pacienteDni === '') {
            setDniInvalidMessage('El DNI es obligatorio.');
        } else if (!pacienteDni.match(/^[0-9]{7,8}$/)) {
            setDniInvalidMessage('El DNI no es válido.');
        } else {
            setDniInvalidMessage('');
        }
    }


    /**
     * Function validateTelefono - Validate the 'Teléfono' input.
     *
     * @return {void}
     */
    const validateTelefono = () => {
        if (pacienteTelefono === '') {
            setTelefonoInvalidMessage('El teléfono es obligatorio.');
        } else if (!pacienteTelefono.match(/^[0-9]{7,10}$/)) {
            setTelefonoInvalidMessage('El teléfono no es válido.');
        } else {
            setTelefonoInvalidMessage('');
        }
    }


    /**
     * Function validateObraSocial - Validate the 'Obra social' input.
     *
     * @return {void}
     */
    const validateObraSocial = () => {
        if (pacienteObraSocial === '') {
            setObraSocialInvalidMessage('La obra social es obligatoria.');
        } else {
            setObraSocialInvalidMessage('');
        }
    }


    /**
     * Function validateNumeroObraSocial - Validate the 'Número de obra social' input.
     * 
     * @return {void}
     */
    const validateNumeroObraSocial = () => {
        if (pacienteNumeroObraSocial === '') {
            setNumeroObraSocialInvalidMessage('El número de obra social es obligatorio.');
        } else {
            setNumeroObraSocialInvalidMessage('');
        }
    }


    /**
     * Function validateInputs - Validates the inputs before sending the request.
     *
     * @return {void}
     */
    const validateInputs = () => {
        let isValid = true;

        // Nombre.
        if (pacienteNombre === '') {
            setNombreInvalidMessage('El nombre es obligatorio.');
            isValid = false;
        } else {
            setNombreInvalidMessage('');
        }

        // Apellido.
        if (pacienteApellido === '') {
            setApellidoInvalidMessage('El apellido es obligatorio.');
            isValid = false;
        } else {
            setApellidoInvalidMessage('');
        }

        // Email.
        if (pacienteEmail === '') {
            setEmailInvalidMessage('El email es obligatorio.');
            isValid = false;
        } else {
            setEmailInvalidMessage('');
        }

        // Email valido (regex).
        if (pacienteEmail !== '' && !pacienteEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setEmailInvalidMessage('El email no es válido.');
            isValid = false;
        }

        // Fecha de nacimiento.
        if (pacienteFechaNacimiento === '') {
            setFechaNacimientoInvalidMessage('La fecha de nacimiento es obligatoria.');
            isValid = false;
        } else {
            setFechaNacimientoInvalidMessage('');
        }

        // Género.
        if (pacienteGenero === '') {
            setGeneroInvalidMessage('El género es obligatorio.');
            isValid = false;
        } else {
            setGeneroInvalidMessage('');
        }

        // DNI.
        if (pacienteDni === '') {
            setDniInvalidMessage('El DNI es obligatorio.');
            isValid = false;
        } else {
            setDniInvalidMessage('');
        }

        // Teléfono.
        if (pacienteTelefono === '') {
            setTelefonoInvalidMessage('El teléfono es obligatorio.');
            isValid = false;
        } else {
            setTelefonoInvalidMessage('');
        }

        // Obra social.
        if (pacienteObraSocial === '') {
            setObraSocialInvalidMessage('La obra social es obligatoria.');
            isValid = false;
        } else {
            setObraSocialInvalidMessage('');
        }

        // Número de obra social.
        if (pacienteObraSocial !== 'Particular' && pacienteNumeroObraSocial === '') {
            setNumeroObraSocialInvalidMessage('El número de obra social es obligatorio.');
            isValid = false;
        } else {
            setNumeroObraSocialInvalidMessage('');
        }

        return isValid;
    }


    // Render the 'NuevoPaciente' component.
    return (
        <div id='modalAdd' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Agregar nuevo Paciente</h1>
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
                                    value={pacienteNombre}
                                    onChange={(e) => {
                                        setPacienteNombre(e.target.value);
                                        setNombreInvalidMessage('');
                                    }}
                                    onBlur={validateNombre}
                                />

                                {
                                    nombreInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {nombreInvalidMessage}
                                    </div>
                                }
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
                                    value={pacienteApellido}
                                    onChange={(e) => {
                                        setPacienteApellido(e.target.value);
                                        setApellidoInvalidMessage('');
                                    }}
                                    onBlur={validateApellido}
                                />

                                {
                                    apellidoInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {apellidoInvalidMessage}
                                    </div>
                                }
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
                                    value={pacienteEmail}
                                    onChange={(e) => {
                                        setPacienteEmail(e.target.value);
                                        validateEmail(e.target.value);
                                    }}
                                    onBlur={(e) => validateEmail(e.target.value)}
                                />

                                {
                                    emailInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {emailInvalidMessage}
                                    </div>
                                }
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
                                    value={pacienteFechaNacimiento}
                                    onChange={(e) => {
                                        setPacienteFechaNacimiento(e.target.value);
                                        setFechaNacimientoInvalidMessage('');
                                    }}
                                    onBlur={validateFechaNacimiento}
                                />

                                {
                                    fechaNacimientoInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {fechaNacimientoInvalidMessage}
                                    </div>
                                }
                            </div>

                            {/* Genero */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <div className='position-relative'>
                                    <label htmlFor='genero'>Genero</label>

                                    <select
                                        className='form-control'
                                        name='genero'
                                        value={pacienteGenero}
                                        onChange={(e) => {
                                            setPacienteGenero(e.target.value);
                                            setGeneroInvalidMessage('');
                                        }}
                                        onBlur={validateGenero}
                                    >
                                        <option value='' disabled>Seleccione una opción</option>
                                        <option value='Femenino'>Femenino</option>
                                        <option value='Masculino'>Masculino</option>
                                        <option value='No Binario'>No Binario</option>
                                        <option value='No especifica'>No especifica</option>
                                    </select>

                                    <span className='custom-arrow position-absolute h-100'></span>
                                </div>

                                {
                                    generoInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {generoInvalidMessage}
                                    </div>
                                }
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
                                    value={pacienteDni}
                                    onChange={(e) => {
                                        setPacienteDni(e.target.value);
                                        setDniInvalidMessage('');
                                    }}
                                    onBlur={validateDni}
                                />

                                {
                                    dniInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {dniInvalidMessage}
                                    </div>
                                }
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
                                    value={pacienteTelefono}
                                    onChange={(e) => {
                                        setPacienteTelefono(e.target.value);
                                        setTelefonoInvalidMessage('');
                                    }}
                                    onBlur={validateTelefono}
                                />

                                {
                                    telefonoInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {telefonoInvalidMessage}
                                    </div>
                                }
                            </div>
                            
                            {/* Obra Social */}
                            <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                <div className='position-relative'>
                                    <label htmlFor='obraSocial'>Obra Social</label>

                                    <select
                                        className='form-control'
                                        name='obraSocial'
                                        value={pacienteObraSocial}
                                        onChange={(e) => {
                                            setPacienteObraSocial(e.target.value);
                                            setObraSocialInvalidMessage('');
                                        }}
                                        onBlur={validateObraSocial}
                                    >
                                        {obrasSociales && obrasSociales.map((obraSocial, index) => {
                                            if (obraSocial.text === pacienteObraSocial) {
                                                return <option value={obraSocial.value} selected key={index}>{obraSocial.text}</option>
                                            } else {
                                                return <option value={obraSocial.value} key={index}>{obraSocial.text}</option>
                                            }
                                        })}
                                    </select>

                                    <span className='custom-arrow position-absolute h-100'></span>
                                </div>

                                {
                                    obraSocialInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {obraSocialInvalidMessage}
                                    </div>
                                }
                            </div>

                            {/* Numero de Obra Social */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='numero_obra_social'>Numero de Obra Social</label>
                                    
                                <input
                                    className='form-control'
                                    type='numero_obra_social'
                                    name='numero_obra_social'
                                    placeholder='Numero de Obra Social'
                                    aria-label='Numero de Obra Social'
                                    value={pacienteNumeroObraSocial}
                                    onChange={(e) => {
                                        setPacienteNumeroObraSocial(e.target.value);
                                        setNumeroObraSocialInvalidMessage('');
                                    }}
                                    onBlur={validateNumeroObraSocial}
                                />

                                {
                                    numeroObraSocialInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {numeroObraSocialInvalidMessage}
                                    </div>
                                }
                            </div>

                            {/* Antecedentes */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='antecedentes'>Antecedentes</label>
                                    
                                <input
                                    className='form-control'
                                    type='antecedentes'
                                    name='antecedentes'
                                    placeholder='Antecedentes'
                                    aria-label='Antecedentes'
                                    value={pacienteAntecedentes}
                                    onChange={(e) => setPacienteAntecedentes(e.target.value)}
                                />
                            </div>

                            {/* Alergias */}
                            <div className='col-lg-4 col-md-6 mb-2'>
                                <label htmlFor='alergias'>Alergias</label>
                                    
                                <input
                                    className='form-control'
                                    type='alergias'
                                    name='alergias'
                                    placeholder='Alergias'
                                    aria-label='Alergias'
                                    value={pacienteAlergias}
                                    onChange={(e) => setPacienteAlergias(e.target.value)}
                                />
                            </div>
                        </form>

                        <button
                            className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                            onClick={() => {
                                validateInputs();
                                addPaciente();
                            }}
                            disabled={nombreInvalidMessage === '' || apellidoInvalidMessage === '' || fechaNacimientoInvalidMessage === '' || emailInvalidMessage === '' || dniInvalidMessage === '' || telefonoInvalidMessage === '' || generoInvalidMessage === '' || obraSocialInvalidMessage === '' || numeroObraSocialInvalidMessage === '' ? false : true}
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

export default NuevoPaciente