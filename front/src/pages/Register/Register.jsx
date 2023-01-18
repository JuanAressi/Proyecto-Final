import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faAt, faCalendarAlt, faVenusMars, faPhone, faIdCard, faHospital } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import './style.css';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Input from '../../components/Input/Input';


function Register() {
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

    const [btnDisabled, setBtnDisabled] = useState(true);

    // Handle every change in the form, to enable or disable the button.
    useEffect(() => {
        let isValid = true;

        if (nombre === '' || apellido === '' || email === '' || contraseña === '' || contraseñaValidación === '' || fechaNacimiento === '' || genero === '' || dni === '' || telefono === '' || obraSocial === '' || numeroObraSocial === '') {
            isValid = false;
        }
        
        if (isValid === true) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [nombre, apellido, email, contraseña, contraseñaValidación, fechaNacimiento, genero, dni, telefono, obraSocial, numeroObraSocial]);


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
     * Function createPaciente - Create a new 'Usuario' and 'Paciente' in the database.
     *
     * @return {void} 
     */
    const createPaciente = (event) => {
        event.preventDefault();

        // Disable button.
        setBtnDisabled(true);

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
                dni: dni,
                telefono: telefono,
                obra_social: obraSocial,
                numero_obra_social: numeroObraSocial,
            },
            success: function (response) {
                console.log('response: ', response);
            },
            error: function (error) {
                console.log(error);
            }
        });
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

                            <div className='row justify-content-center'>
                                {/* Nombre */}
                                <div className='col-lg-4 col-md-12 mb-2'>
                                    <Input
                                        id='nombre'
                                        type='text'
                                        name='nombre'
                                        placeholder='Nombre'
                                        value={nombre}
                                        onChange={(event) => setNombre(event.target.value)}
                                        icon={faUser}
                                    />
                                </div>
                                
                                {/* Apellido */}
                                <div className='col-lg-4 col-md-12 mb-2'>
                                    <Input
                                        id='apellido'
                                        type='text'
                                        name='apellido'
                                        placeholder='Apellido'
                                        value={apellido}
                                        onChange={(event) => setApellido(event.target.value)}
                                        icon={faUser}
                                    />
                                </div>

                                {/* Email */}
                                <div className='col-lg-4 col-md-12 mb-2'>
                                    <Input
                                        id='email'
                                        type='email'
                                        name='email'
                                        placeholder='Correo electronico'
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        icon={faAt}
                                    />
                                </div>

                                {/* Contraseña */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='contraseña'
                                        type='password'
                                        name='contraseña'
                                        placeholder='Contraseña'
                                        value={contraseña}
                                        onChange={(event) => setContraseña(event.target.value)}
                                        icon={faKey}
                                    />
                                </div>

                                {/* Repetir Contraseña */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='contraseñaValidación'
                                        type='password'
                                        name='contraseñaValidación'
                                        placeholder='Repetir la contraseña'
                                        value={contraseñaValidación}
                                        onChange={(event) => setContraseñaValidación(event.target.value)}
                                        icon={faKey}
                                    />
                                </div>

                                {/* Fecha de nacimiento */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='fechaNacimiento'
                                        type='date'
                                        name='fechaNacimiento'
                                        placeholder='Fecha de nacimiento'
                                        value={fechaNacimiento}
                                        onChange={(event) => setFechaNacimiento(event.target.value)}
                                        icon={faCalendarAlt}
                                    />
                                </div>

                                {/* Genero */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='genero'
                                        type='select'
                                        name='genero'
                                        placeholder='Genero'
                                        value={genero}
                                        onChange={(event) => setGenero(event.target.value)}
                                        icon={faVenusMars}
                                        options={[
                                            {value: '', text: 'Selecciona una opción'},
                                            {value: 'Masculino', text: 'Masculino'},
                                            {value: 'Femenino', text: 'Femenino'},
                                            {value: 'No binario', text: 'No binario'},
                                            {value: 'No especifica', text: 'No especifica'}
                                        ]}
                                    />
                                </div>

                                {/* DNI */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='dni'
                                        type='text'
                                        name='dni'
                                        placeholder='DNI'
                                        value={dni}
                                        onChange={(event) => formatDNI(event.target.value)}
                                        icon={faIdCard}
                                    />
                                </div>

                                {/* Telefono */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='telefono'
                                        type='text'
                                        name='telefono'
                                        placeholder='Telefono'
                                        value={telefono}
                                        onChange={(event) => setTelefono(event.target.value)}
                                        icon={faPhone}
                                    />
                                </div>

                                {/* Obra social */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='obraSocial'
                                        type='select'
                                        name='obraSocial'
                                        placeholder='Obra social'
                                        value={obraSocial}
                                        onChange={(event) => setObraSocial(event.target.value)}
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
                                </div>

                                {/* Numero obra social */}
                                <div className='col-lg-6 col-md-12 mb-2'>
                                    <Input
                                        id='numeroObraSocial'
                                        type='text'
                                        name='numeroObraSocial'
                                        placeholder='Numero de obra social'
                                        value={numeroObraSocial}
                                        onChange={(event) => setNumeroObraSocial(event.target.value)}
                                        icon={faIdCard}
                                    />
                                </div>

                            </div>

                            {/* Button container */}
                            <div id='buttonsContainer' className='d-flex flex-column justify-content-center align-items-center mt-4'>
                                <button
                                    id='crearCuenta'
                                    className='btn bg-primary text-white box-shadow-dark text-uppercase w-50'
                                    type='submit'
                                    disabled={btnDisabled}
                                    onClick={createPaciente}
                                >
                                    Crear cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                    <>
                        
                        {/* First Name */}
                        {/* <Input
                            id='nombre'
                            type='text'
                            name='nombre'
                            placeholder='Nombre'
                            value={nombre}
                            onChange={handleNombreChange}
                            icon={faUser}
                            margin='1.5rem'
                        /> */}

                        {/* First Name */}
                        {/* <Input
                            id='apellido'
                            type='text'
                            name='apellido'
                            placeholder='Apellido'
                            value={apellido}
                            onChange={handleApellidoChange}
                            icon={faUser}
                            margin='1.5rem'
                        /> */}

                        {/* Phone */}
                        {/* <Input
                            id='phone'
                            type='phone'
                            name='phone'
                            placeholder='Numero de telefono'
                            value={phone}
                            onChange={handlePhoneChange}
                            icon={faPhone}
                            margin='1.5rem'
                        /> */}
                    </>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default Register