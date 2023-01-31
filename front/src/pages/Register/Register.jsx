// Utilities.
import { React, useState, useEffect } from 'react';
import { faUser, faKey, faAt, faCalendarAlt, faVenusMars, faPhone, faIdCard, faHospital } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

// Components.
import Alert from '../../components/Alert/Alert';
import Footer from '../../components/Footer/Footer';
import Input from '../../components/Input/Input';
import Navbar from '../../components/Navbar/Navbar';
import withAuth from '../../highOrderComponents/withAuth';
import './style.css';

function Register() {
    // Paciente.
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [contraseñaValidación, setContraseñaValidación] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [dni, setDni] = useState('');
    const [telefono, setTelefono] = useState('');
    const [obraSocial, setObraSocial] = useState('');
    const [numeroObraSocial, setNumeroObraSocial] = useState('');

    // Errors.
    const [nombreInvalidMessage, setNombreInvalidMessage] = useState('');
    const [apellidoInvalidMessage, setApellidoInvalidMessage] = useState('');
    const [emailInvalidMessage, setEmailInvalidMessage] = useState('');
    const [contraseñaInvalidMessage, setContraseñaInvalidMessage] = useState('');
    const [contraseñaValidaciónInvalidMessage, setContraseñaValidaciónInvalidMessage] = useState('');
    const [fechaNacimientoInvalidMessage, setFechaNacimientoInvalidMessage] = useState('');
    const [generoInvalidMessage, setGeneroInvalidMessage] = useState('');
    const [dniInvalidMessage, setDniInvalidMessage] = useState('');
    const [telefonoInvalidMessage, setTelefonoInvalidMessage] = useState('');
    const [obraSocialInvalidMessage, setObraSocialInvalidMessage] = useState('');
    const [numeroObraSocialInvalidMessage, setNumeroObraSocialInvalidMessage] = useState('');

    // Alert. 
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    // Various.
    const [userCreated, setUserCreated] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Handle every change in the form, to enable or disable the button.
    useEffect(() => {
        let isValid = true;

        if (nombre === '' || apellido === '' || email === '' || contraseña === '' || contraseñaValidación === '' || fechaNacimiento === '' || genero === '' || dni === '' || telefono === '' || obraSocial === '') {
            isValid = false;
        }
        
        if (isValid === true) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [nombre, apellido, email, contraseña, contraseñaValidación, fechaNacimiento, genero, dni, telefono, obraSocial]);


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

        setDni(dni);
    }


    /**
     * Function validateInputs - Validates the inputs before sending the request.
     *
     * @return {void}
     */
    const validateInputs = () => {
        let isValid = true;

        // Nombre.
        if (nombre === '') {
            setNombreInvalidMessage('El nombre es obligatorio.');
            isValid = false;
        } else {
            setNombreInvalidMessage('');
        }

        // Apellido.
        if (apellido === '') {
            setApellidoInvalidMessage('El apellido es obligatorio.');
            isValid = false;
        } else {
            setApellidoInvalidMessage('');
        }

        // Email.
        if (email === '') {
            setEmailInvalidMessage('El email es obligatorio.');
            isValid = false;
        } else {
            setEmailInvalidMessage('');
        }

        // Email valido (regex).
        if (email !== '' && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            setEmailInvalidMessage('El email no es válido.');
            isValid = false;
        }

        // Contraseña.
        if (contraseña === '') {
            setContraseñaInvalidMessage('La contraseña es obligatoria.');
            isValid = false;
        } else {
            setContraseñaInvalidMessage('');
        }

        // Contraseña validación.
        if (contraseñaValidación === '') {
            setContraseñaValidaciónInvalidMessage('La validación de la contraseña es obligatoria.');
            isValid = false;
        } else {
            setContraseñaValidaciónInvalidMessage('');
        }

        if (contraseña !== '' && contraseñaValidación !== '' && contraseña !== contraseñaValidación) {
            setContraseñaValidaciónInvalidMessage('Las contraseñas no coinciden.');
            setContraseñaInvalidMessage('Las contraseñas no coinciden.');
            isValid = false;
        }

        // Fecha de nacimiento.
        if (fechaNacimiento === '') {
            setFechaNacimientoInvalidMessage('La fecha de nacimiento es obligatoria.');
            isValid = false;
        } else {
            setFechaNacimientoInvalidMessage('');
        }

        // Género.
        if (genero === '') {
            setGeneroInvalidMessage('El género es obligatorio.');
            isValid = false;
        } else {
            setGeneroInvalidMessage('');
        }

        // DNI.
        if (dni === '') {
            setDniInvalidMessage('El DNI es obligatorio.');
            isValid = false;
        } else {
            setDniInvalidMessage('');
        }

        // Teléfono.
        if (telefono === '') {
            setTelefonoInvalidMessage('El teléfono es obligatorio.');
            isValid = false;
        } else {
            setTelefonoInvalidMessage('');
        }

        // Obra social.
        if (obraSocial === '') {
            setObraSocialInvalidMessage('La obra social es obligatoria.');
            isValid = false;
        } else {
            setObraSocialInvalidMessage('');
        }

        // Número de obra social.
        if (obraSocial !== 'Particular' && numeroObraSocial === '') {
            setNumeroObraSocialInvalidMessage('El número de obra social es obligatorio.');
            isValid = false;
        } else {
            setNumeroObraSocialInvalidMessage('');
        }

        return isValid;
    }


    /**
     * Function validateContraseña - Validates the contraseña input.
     *
     * @param  {string} value - The value of the input.
     *
     * @return {void}
     */
    const validateContraseña = (value) => {
        // The value must contain at least 8 characters, 1 uppercase letter and 1 number.
        let regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

        if (regex.test(value)) {
            setContraseñaInvalidMessage('');
        } else {
            setContraseñaInvalidMessage('La contraseña debe contener al menos 8 caracteres, 1 mayúscula y 1 número.');
        }

        // Set 'contraseña' state.
        setContraseña(value);
    }


    /**
     * Function createPaciente - Create a new 'Usuario' and 'Paciente' in the database.
     *
     * @return {void} 
     */
    const createPaciente = (event) => {
        // Prevent default behaviour.
        event.preventDefault();

        // Disable button.
        setBtnDisabled(true);

        // Validate the inputs.
        let isValid = validateInputs();

        if (isValid) {
            // Remove the dots from the 'dni' input.
            let dniValue = dni.replace(/\./g, '');

            // Send request.
            $.ajax({
                url: 'http://local.misturnos/api/usuarios',
                type: 'POST',
                dataType: 'json',
                data: {
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    contraseña: contraseña,
                    fecha_nacimiento: fechaNacimiento,
                    genero: genero,
                    dni: dniValue,
                    telefono: telefono,
                    obra_social: obraSocial,
                    numero_obra_social: numeroObraSocial,
                },
                success: function (response) {
                    if (response.success) {
                        // Show success message.
                        setAlertType('success');
                        setAlertMessage(response.message);
                        setShowAlert(true);

                        // Set 'userCreated' state.
                        setUserCreated(true);
                    } else {
                        if (response.field === '') {
                            // Show error message.
                            setAlertType('danger');
                            setAlertMessage(response.message);
                            setShowAlert(true);
                        } else {
                            if (response.field === 'email') {
                                setEmailInvalidMessage(response.message);
                            } else if (response.field === 'dni') {
                                setDniInvalidMessage(response.message);
                            }
                        }
                    }

                    if (showAlert) {
                        setTimeout(() => {
                            setAlertType('');
                            setAlertMessage('');
                            setShowAlert(false);
                        }, 5000);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        } else {

        }
    }


    // Render the component.
    return (
        <div id='register'>
            <Navbar />

            <div className='blue-overlay min-height'>
                <div className='container p-8'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <form id='registerForm' className='rounded box-shadow-dark p-5'>
                            <h2 className='text-center mb-3 text-primary text-shadow-dark'>¡Crear la cuenta es sencillo!</h2>
                            <h6 className='text-center mb-4 text-primary text-shadow-dark'>Completa el formulario</h6>

                            {
                                showAlert
                                ? <Alert
                                    type={alertType}
                                    message={alertMessage}
                                />
                                : null
                            }

                            <div className='row justify-content-center'>
                                {/* Nombre */}
                                <div className='col-lg-4 col-md-12 mb-2'>
                                    <Input
                                        id='nombre'
                                        classes={nombreInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='text'
                                        name='nombre'
                                        placeholder='Nombre'
                                        value={nombre}
                                        onChange={(event) => setNombre(event.target.value)}
                                        onFocus={() => setNombreInvalidMessage('')}
                                        icon={faUser}
                                    />

                                    {
                                        nombreInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {nombreInvalidMessage}
                                        </div>
                                    }
                                </div>
                                
                                {/* Apellido */}
                                <div className='col-lg-4 col-md-12 mb-2'>
                                    <Input
                                        id='apellido'
                                        classes={apellidoInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='text'
                                        name='apellido'
                                        placeholder='Apellido'
                                        value={apellido}
                                        onChange={(event) => setApellido(event.target.value)}
                                        onFocus={() => setApellidoInvalidMessage('')}
                                        icon={faUser}
                                    />

                                    {
                                        apellidoInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {apellidoInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Email */}
                                <div className='col-lg-4 col-md-12 mb-2'>
                                    <Input
                                        id='email'
                                        classes={emailInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='email'
                                        name='email'
                                        placeholder='Correo electronico'
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        onFocus={() => setEmailInvalidMessage('')}
                                        icon={faAt}
                                    />

                                    {
                                        emailInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {emailInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Contraseña */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='contraseña'
                                        classes={contraseñaInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='password'
                                        name='contraseña'
                                        placeholder='Contraseña'
                                        value={contraseña}
                                        onChange={(event) => validateContraseña(event.target.value)}
                                        onFocus={() => setContraseñaInvalidMessage('')}
                                        icon={faKey}
                                    />

                                    {
                                        contraseñaInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {contraseñaInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Repetir Contraseña */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='contraseñaValidación'
                                        classes={contraseñaValidaciónInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='password'
                                        name='contraseñaValidación'
                                        placeholder='Repetir la contraseña'
                                        value={contraseñaValidación}
                                        onChange={(event) => setContraseñaValidación(event.target.value)}
                                        onFocus={() => setContraseñaValidaciónInvalidMessage('')}
                                        icon={faKey}
                                    />

                                    {
                                        contraseñaValidaciónInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {contraseñaValidaciónInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Fecha de nacimiento */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='fechaNacimiento'
                                        classes={fechaNacimientoInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='date'
                                        name='fechaNacimiento'
                                        placeholder='Fecha de nacimiento'
                                        value={fechaNacimiento}
                                        onChange={(event) => setFechaNacimiento(event.target.value)}
                                        onFocus={() => setFechaNacimientoInvalidMessage('')}
                                        icon={faCalendarAlt}
                                    />

                                    {
                                        fechaNacimientoInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {fechaNacimientoInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Genero */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='genero'
                                        classes={generoInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='select'
                                        name='genero'
                                        placeholder='Genero'
                                        value={genero}
                                        onChange={(event) => {
                                            setGeneroInvalidMessage('');
                                            setGenero(event.target.value);
                                        }}
                                        icon={faVenusMars}
                                        options={[
                                            {value: '', text: 'Selecciona una opción'},
                                            {value: 'Masculino', text: 'Masculino'},
                                            {value: 'Femenino', text: 'Femenino'},
                                            {value: 'No binario', text: 'No binario'},
                                            {value: 'No especifica', text: 'No especifica'}
                                        ]}
                                    />

                                    {
                                        generoInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {generoInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* DNI */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='dni'
                                        classes={dniInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='text'
                                        name='dni'
                                        placeholder='DNI'
                                        value={dni}
                                        onChange={(event) => formatDNI(event.target.value)}
                                        onFocus={() => setDniInvalidMessage('')}
                                        icon={faIdCard}
                                    />

                                    {
                                        dniInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {dniInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Telefono */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='telefono'
                                        classes={telefonoInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='text'
                                        name='telefono'
                                        placeholder='Telefono'
                                        value={telefono}
                                        onChange={(event) => setTelefono(event.target.value)}
                                        onFocus={() => setTelefonoInvalidMessage('')}
                                        icon={faPhone}
                                    />

                                    {
                                        telefonoInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {telefonoInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Obra social */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='obraSocial'
                                        classes={obraSocialInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='select'
                                        name='obraSocial'
                                        placeholder='Obra social'
                                        value={obraSocial}
                                        onChange={(event) => {
                                            setObraSocialInvalidMessage('');
                                            setObraSocial(event.target.value);
                                        }}
                                        icon={faHospital}
                                        options={[
                                            {value: '', text: 'Selecciona una opción'},
                                            {value: 'OSDE', text: 'OSDE'},
                                            {value: 'Swiss Medical', text: 'Swiss Medical'},
                                            {value: 'Medifé', text: 'Medifé'},
                                            {value: 'Emerger', text: 'Emerger'},
                                            {value: 'Particular', text: 'Particular'}
                                        ]}
                                    />

                                    {
                                        obraSocialInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {obraSocialInvalidMessage}
                                        </div>
                                    }
                                </div>

                                {/* Numero obra social */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='numeroObraSocial'
                                        classes={numeroObraSocialInvalidMessage !== '' ? 'border-danger' : userCreated ? 'border-success' : ''}
                                        type='text'
                                        name='numeroObraSocial'
                                        placeholder='Numero de obra social'
                                        value={numeroObraSocial}
                                        onChange={(event) => setNumeroObraSocial(event.target.value)}
                                        onFocus={() => setNumeroObraSocialInvalidMessage('')}
                                        icon={faIdCard}
                                    />

                                    {
                                        numeroObraSocialInvalidMessage !== '' &&
                                        <div className='invalid-feedback d-block fw-bold ps-1'>
                                            {numeroObraSocialInvalidMessage}
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* Button container */}
                            <div id='buttonsContainer' className='d-flex flex-column justify-content-center align-items-center mt-4'>
                                <button
                                    id='crearCuenta'
                                    className='btn bg-primary text-white box-shadow-dark text-uppercase w-50'
                                    type='button'
                                    disabled={btnDisabled}
                                    onClick={createPaciente}
                                >
                                    Crear cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default withAuth('')(Register)