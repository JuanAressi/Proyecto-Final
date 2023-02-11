// Utilities.
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import $ from 'jquery';

// Components.
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Alert from '../../components/Alert/Alert';
import loadingGif from '../../components/assets/img/loadingGif.gif';


function DatosPersonales() {
    const idUser = 753;

    // Utilities
    const [showSpinner, setShowSpinner] = useState(false);

    // Alert. 
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    // Paciente information.
    const [pacienteNombre, setPacienteNombre] = useState('');
    const [pacienteApellido, setPacienteApellido] = useState('');
    const [pacienteEmail, setPacienteEmail] = useState('');
    const [pacienteFechaNacimiento, setPacienteFechaNacimiento] = useState('');
    const [parsedFechaNacimiento, setParsedFechaNacimiento] = useState('');
    const [pacienteGenero, setPacienteGenero] = useState('');
    const [pacienteDni, setPacienteDni] = useState('');
    const [pacienteTelefono, setPacienteTelefono] = useState('');
    const [pacienteObraSocial, setPacienteObraSocial] = useState('');
    const [pacienteNumeroObraSocial, setPacienteNumeroObraSocial] = useState('');
    const [pacienteAntecedentes, setPacienteAntecedentes] = useState('');
    const [pacienteAlergias, setPacienteAlergias] = useState('');

    // Invalid Messages.
    const [emailInvalidMessage, setEmailInvalidMessage] = useState('');
    const [dniInvalidMessage, setDniInvalidMessage] = useState('');


    useEffect(() => {
        // Get the 'Paciente' information.
        getPaciente();
    }, []);


    // Handle the change of 'pacienteFechaNacimiento' state.
    useEffect(() => {
        // Check that is not empty.
        if (pacienteFechaNacimiento !== '') {
            // If it is in the format 'dd-mm-yyyy', then parse it.
            if (pacienteFechaNacimiento.indexOf('-') === 2) {
                const fechaNacimiento = pacienteFechaNacimiento.split('-');
                setParsedFechaNacimiento(`${fechaNacimiento[2]}-${fechaNacimiento[1]}-${fechaNacimiento[0]}`);
            } else if (pacienteFechaNacimiento.indexOf('-') === 4) {
                setParsedFechaNacimiento(pacienteFechaNacimiento);
            }
        }
    }, [pacienteFechaNacimiento]);


    /**
     * Function formatDNI - Formats the DNI input and sets the value.
     *
     * @param  {string} value - The value of the input.
     *
     * @return {void}
     */
    const formatDNI = (value) => {
        let dni = value.replace(/\D/g, '');

        if (dni.length === 4) {
            dni = dni.replace(/(\d{1})/, '$1.');
        } else if (dni.length === 5) {
            dni = dni.replace(/(\d{2})/, '$1.');
        } else if (dni.length === 6) {
            dni = dni.replace(/(\d{3})/, '$1.');
        } else if (dni.length === 7) {
            dni = dni.replace(/(\d{1})(\d{3})/, '$1.$2.');
        } else if (dni.length === 8) {
            dni = dni.replace(/(\d{2})(\d{3})/, '$1.$2.');
        } else if (dni.length === 9) {
            dni = dni.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
        }

        if (dni.length > 10) {
            dni = dni.substring(0, 10);
        }

        setPacienteDni(dni);
    }


    /**
     * Function getCurrentPaciente - Makes the search of all active 'Pacientes'.
     *
     * @return {void}
     */
    const getPaciente = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'pacientes/' + idUser,
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                // Set the 'Paciente' information.
                setPacienteNombre(response.paciente.nombre);
                setPacienteApellido(response.paciente.apellido);
                setPacienteEmail(response.paciente.email);
                setPacienteFechaNacimiento(response.paciente.fecha_nacimiento);
                setPacienteGenero(response.paciente.genero);
                formatDNI(response.paciente.dni);
                setPacienteTelefono(response.paciente.telefono);
                setPacienteObraSocial(response.paciente.obra_social);
                setPacienteNumeroObraSocial(response.paciente.numero_obra_social);
                setPacienteAntecedentes(response.paciente.antecedentes);
                setPacienteAlergias(response.paciente.alergias);
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    /**
     * Function addPaciente - Add a new 'Paciente' to the database.
     *
     * @return {void}
     */
    const addPaciente = () => {
        const paciente = {
            id: idUser,
            nombre: pacienteNombre,
            apellido: pacienteApellido,
            email: pacienteEmail,
            fecha_nacimiento: pacienteFechaNacimiento,
            genero: pacienteGenero,
            dni: pacienteDni,
            telefono: pacienteTelefono,
            obra_social: pacienteObraSocial,
            numero_obra_social: pacienteNumeroObraSocial,
        }

        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'pacientes/' + idUser,
            type: 'PUT',
            dataType: 'json',
            data: paciente,
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Show success message.
                    setAlertType('success');
                    setAlertMessage(response.message);
                    setShowAlert(true);
                } else {
                    // Validar si existe el response.field
                    if (response.field === 'email') {
                        setEmailInvalidMessage(response.message);
                    } else if (response.field === 'dni') {
                        setDniInvalidMessage(response.message);
                    } else {
                        // Show error message.
                        setAlertType('danger');
                        setAlertMessage(response.message);
                        setShowAlert(true);
                    }
                }

                // Close alert message after 4 seconds.
                if (showAlert) {
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                }
            },
            error: function (error) {
                setShowSpinner(false);
            }
        });
    }


    // Render the 'DatosPersonales' page.
    return (
        <div id='datosPersonales'>
            <Navbar />

            <div className='d-flex bg-lightgray min-height'>
                <div className='container p-5 m-auto'>
                    <div className='position-relative'>
                        <Link
                            className='btn border border-primary text-primary text-uppercase box-shadow-dark-1 px-3 mt-1 cursor-pointer position-absolute top-0 left-0 z-index-1'
                            to='/panel-usuario/'
                        >
                            <FontAwesomeIcon
                                className='me-2'
                                icon={faArrowLeft}
                            />
                            Volver atrás
                        </Link>

                        <h1 className='text-center mt-2 mb-8 position-relative'>
                            Mis datos personales

                            <div className='position-absolute' style={{width: '40px', bottom: '-3rem', left: 'calc((100% - 40px) / 2)'}}>
                                {showSpinner && <img src={loadingGif} alt='Espera a que termine de cargar' height='20px'/>}
                            </div>
                        </h1>

                        {
                            showAlert
                            ? <Alert
                                type={alertType}
                                message={alertMessage}
                            />
                            : null
                        }

                        <div className='d-flex flex-column align-items-center'>
                            <div className='d-flex justify-content-center align-items-center row mt-3 mb-3'>
                                {/* Nombre */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='nombre'>Nombre</label>

                                    <input
                                        className='form-control'
                                        type='text'
                                        name='nombre'
                                        placeholder='Nombre'
                                        aria-label='Nombre'
                                        value={pacienteNombre}
                                        onChange={e => setPacienteNombre(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    />
                                </div>

                                {/* Apellido */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='apellido'>Apellido</label>
                                        
                                    <input
                                        className='form-control'
                                        type='text'
                                        name='apellido'
                                        placeholder='Apellido'
                                        aria-label='Apellido'
                                        value={pacienteApellido}
                                        onChange={e => setPacienteApellido(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    />
                                </div>

                                {/* Email */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='email'>Email</label>
                                        
                                    <input
                                        className='form-control'
                                        type='email'
                                        name='email'
                                        placeholder='Email'
                                        aria-label='Email'
                                        value={pacienteEmail}
                                        onChange={e => setPacienteEmail(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    />

                                    {
                                        emailInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {emailInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Fecha de Nacimiento */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='fecha_nacimiento'>Fecha de Nacimiento</label>
                                        
                                    <input
                                        className='form-control'
                                        type='date'
                                        name='fecha_nacimiento'
                                        placeholder='Fecha de Nacimiento'
                                        aria-label='Fecha de Nacimiento'
                                        value={parsedFechaNacimiento}
                                        onChange={e => setPacienteFechaNacimiento(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    />
                                </div>
                                
                                {/* Genero */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2 position-relative'>
                                    <label htmlFor='genero'>Genero</label>

                                    <select
                                        className='form-control'
                                        name='genero'
                                        value={pacienteGenero}
                                        onChange={e => setPacienteGenero(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
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
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='dni'>DNI</label>
                                        
                                    <input
                                        className='form-control'
                                        type='dni'
                                        name='dni'
                                        placeholder='DNI'
                                        aria-label='DNI'
                                        value={pacienteDni}
                                        onChange={(event) => formatDNI(event.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    />

                                    {
                                        dniInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {dniInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Telefono */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='telefono'>Telefono</label>
                                        
                                    <input
                                        className='form-control'
                                        type='telefono'
                                        name='telefono'
                                        placeholder='Telefono'
                                        aria-label='Telefono'
                                        value={pacienteTelefono}
                                        onChange={e => setPacienteTelefono(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    />
                                </div>

                                {/* Obra Social */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='obraSocial'>Obra Social</label>

                                    <select
                                        className='form-control'
                                        name='obraSocial'
                                        value={pacienteObraSocial}
                                        onChange={e => setPacienteObraSocial(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    >
                                        <option value='' disabled>Seleccione una opción</option>
                                        <option value='OSDE'>OSDE</option>
                                        <option value='Swiss Medical'>Swiss Medical</option>
                                        <option value='Medifé'>Medifé</option>
                                        <option value='Emerger'>Emerger</option>
                                        <option value='Particular'>Particular</option>
                                    </select>

                                    <span className='custom-arrow position-absolute h-100'></span>
                                </div>

                                {/* Numero de Obra Social */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='numero_obra_social'>Numero de Obra Social</label>
                                        
                                    <input
                                        className='form-control'
                                        type='text'
                                        name='numero_obra_social'
                                        placeholder='Numero de Obra Social'
                                        aria-label='Numero de Obra Social'
                                        value={pacienteNumeroObraSocial}
                                        onChange={e => setPacienteNumeroObraSocial(e.target.value)}
                                        disabled={showSpinner}
                                        autocomplete='off'
                                    />
                                </div>

                                {/* Antecedentes */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='antecedentes'>Antecedentes</label>
                                        
                                    <input
                                        className='form-control'
                                        type='text'
                                        name='antecedentes'
                                        placeholder='Antecedentes'
                                        aria-label='Antecedentes'
                                        value={pacienteAntecedentes}
                                        disabled
                                    />
                                </div>

                                {/* Alergias */}
                                <div className='col-lg-4 col-md-6 col-sm-12 mb-2'>
                                    <label htmlFor='alergias'>Alergias</label>
                                        
                                    <input
                                        className='form-control'
                                        type='text'
                                        name='alergias'
                                        placeholder='Alergias'
                                        aria-label='Alergias'
                                        value={pacienteAlergias}
                                        disabled
                                    />
                                </div>
                            </div>

                            <button
                                className='btn bg-primary text-white box-shadow-dark w-25 mb-3'
                                onClick={addPaciente}
                                disabled={(pacienteNombre === '' || pacienteApellido === '' || pacienteFechaNacimiento === '' || pacienteEmail === '' || pacienteDni === '' || pacienteTelefono === '' || pacienteGenero === '' || pacienteObraSocial === '') || showSpinner}
                            >
                                Actualizar información
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default DatosPersonales