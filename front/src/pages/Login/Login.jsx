import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import './style.css';
import Navbar from '../../components/Navbar/Navbar';
import Input from '../../components/Input/Input';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Use effect.
    useEffect(() => {
		let isValid = true;

        if (email === '') { isValid = false; }

        if (password === '') { isValid = false; }

        if (isValid === true) {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true);
        }
    }, [email, password]);


    // Email change.
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }


    // Password change.
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    // Submit Login form.
    const handleSubmitForm = (event) => {
        event.preventDefault();

        // Disable button.
        setBtnDisabled(true);

        // Send request.
        $.ajax({
            url: 'http://local.misturnos/api/login',
            type: 'POST',
			dataType: 'json',
            data: {
                'email': email,
                'password': password
            },
			success: function (response) {
                debugger
                if (response.success) {
                    // Switch user role.

                    switch (response.role) {
                        case 'admin':
                            window.location.href = '/panel-admin';
                            break;

                        case 'administrador':
                            window.location.href = '/panel-administrador';
                            break;

                        case 'medico':
                            window.location.href = '/panel-medico';
                            break;
                        
                        case 'paciente':
                            window.location.href = '/';
                            break;
                    }
                } else {
                    // TODO: Show error messages.
                }
			},
			error: function (error) {
				console.log(error);
			}
        });
    }


    return (
        <div id='loginPage'>
			<Navbar />
			
            <div className='blue-overlay pt-5'>
                <div className='container p-0 pt-5'>
                    <div className="d-flex justify-content-center align-items-center">
                        <form id='loginForm' className='rounded box-shadow-dark p-5'>
                            <h1 className='text-center mb-3 text-darker text-shadow-dark'>¡Bienvenido!</h1>
                            <h6 className='text-center mb-4 text-darker text-shadow-dark'>Ingresa a tu cuenta</h6>

                            {/* Email */}
                            <Input
                                id='email'
                                type='email'
                                name='email'
                                placeholder='Correo electronico'
                                value={email}
                                onChange={handleEmailChange}
                                icon={faAt}
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
                            />

                            <Link to='/recuperar-contraseña'
                                className='text-primary text-end w-100'
                                type='button'
                            >
                                Olvide mi contraseña
                            </Link>

                            <div id="buttonsContainer" className='d-flex flex-column justify-content-center align-items-center mt-3'>
                                <button 
                                    id='ingresar'
                                    className='btn bg-primary text-white box-shadow-dark text-uppercase w-50 mb-3'
                                    type='submit'
                                    disabled={btnDisabled}
                                    onClick={handleSubmitForm}
                                >
                                    Ingresar
                                </button>

                                <Link to='/register'
                                    id='registrarse'
                                    className='btn bg-white text-primary border border-primary box-shadow-dark text-uppercase w-50 mb-2'
                                    type='button'
                                >
                                    Registrate
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login