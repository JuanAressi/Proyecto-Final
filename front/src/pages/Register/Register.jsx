import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faAt, faPhone, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
import './style.css';
import Navbar from '../../components/Navbar/Navbar';
import Input from '../../components/Input/Input';


function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRep, setPasswordRep] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [btnDisabled, setBtnDisabled] = useState(true);

	// Use effect.
	useEffect(() => {
		let isValid = true;

		if (firstName === '') { isValid = false; }

		if (lastName === '') { isValid = false; }

		if (password === '') { isValid = false; }

		if (passwordRep === '') { isValid = false; }

		if (email === '') { isValid = false; }

		if (phone === '') { isValid = false; }

		
		if (isValid === true) {
			setBtnDisabled(false);
		} else {
			setBtnDisabled(true);
		}
	}, [firstName, lastName, email, phone, password, passwordRep]);


	// First Name onchange.
	const handleFirstNameChange = (event) => {
		setFirstName(event.target.value);
	}

	// Last Name onchange.
	const handleLastNameChange = (event) => {
		setLastName(event.target.value);
	}


	// Email onchange.
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	}


	// Phone number onchange.
	const handlePhoneChange = (event) => {
		setPhone(event.target.value);
	}


	// Password onchange.
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}


	// Password onchange.
	const handlePasswordRepChange = (event) => {
		setPasswordRep(event.target.value);
	}


	// Submit Register Form.
	const handleSubmitForm = (event) => {
        event.preventDefault();

		$.ajax({
			type: 'POST',
			url: 'http://local.misturnos/api/users',
			dataType: 'json',
			data: {
				'email': email,
				'password': password,
                'rol': '1',
			},
			success: function (response) {
				console.log('response: ', response);
			},
			error: function (error) {
				console.log(error);
			}
		});
	}


	return (
		<div id='registerPage'>
			<Navbar />

			<div className='blue-overlay pt-5'>
				<div className='container p-0 pt-5'>
                    <div className="d-flex justify-content-center align-items-center">
                        <form id='registerForm' className='rounded box-shadow-dark p-5'>
                            <h2 className='text-center mb-3 text-darker text-shadow-dark'>¡Crear la cuenta es sencillo!</h2>
                            <h6 className='text-center mb-4 text-darker text-shadow-dark'>Completa el formulario</h6>

                            <div className='p-4'>
                                {/* Email */}
                                <Input
                                    id='email'
                                    type='email'
                                    name='email'
                                    placeholder='Correo electronico'
                                    value={email}
                                    onChange={handleEmailChange}
                                    icon={faAt}
                                    margin='1.5rem'
                                />

                                {/* Password */}
                                <Input
                                    id='password'
                                    type='password'
                                    name='password'
                                    placeholder='Contraseña'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    icon={faKey}
                                    margin='1.5rem'
                                />

                                {/* Repetir Password */}
                                <Input
                                    id='passwordRep'
                                    type='password'
                                    name='passwordRep'
                                    placeholder='Repetir la contraseña'
                                    value={passwordRep}
                                    onChange={handlePasswordRepChange}
                                    icon={faKey}
                                    margin='1.5rem'
                                />

                                <div id="buttonsContainer" className='d-flex flex-column justify-content-center align-items-center mt-4'>
                                    <button
                                        id='crearCuenta'
                                        className='btn bg-secondary text-white box-shadow-dark text-uppercase w-50'
                                        type='submit'
                                        disabled={btnDisabled}
                                        onClick={handleSubmitForm}
                                    >
                                        Crear cuenta
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <>
                        
                        {/* First Name */}
                        {/* <Input
                            id='firstName'
                            type='text'
                            name='firstName'
                            placeholder='Nombre'
                            value={firstName}
                            onChange={handleFirstNameChange}
                            icon={faUser}
                            margin='1.5rem'
                        /> */}

                        {/* First Name */}
                        {/* <Input
                            id='lastName'
                            type='text'
                            name='lastName'
                            placeholder='Apellido'
                            value={lastName}
                            onChange={handleLastNameChange}
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
		</div>
	)
}

export default Register