import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCheck, faKey } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import './style.css';
import Navbar from '../../components/Navbar/Navbar';
import Input from '../../components/Input/Input';
import loadingGif from '../../components/assets/img/loadingGif.gif';

function Login() {
    const [email, setEmail] = useState('');
    const [emailInvalidMessage, setEmailInvalidMessage] = useState('');
    const [password, setPassword] = useState('');
    const [passwordInvalidMessage, setPasswordInvalidMessage] = useState('');
    const [loginIn, setLoginIn] = useState(false);

    // Utilities.
    const [showSpinner, setShowSpinner] = useState(false);
    const [btnSubmitDisabled, setBtnSubmitDisabled] = useState(true);

    // Enable submit button.
    useEffect(() => {
        if (email.length > 0 && password.length > 0) {
            setBtnSubmitDisabled(false);
        } else {
            setBtnSubmitDisabled(true);
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
        // Prevent default form submit.
        event.preventDefault();

        // Show spinner.
        setShowSpinner(true);

        // Disable submit button.
        setBtnSubmitDisabled(true);
        

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
                if (response.success) {
                    // Set loginIn to true.
                    setLoginIn(true);

                    // Hide spinner.
                    setShowSpinner(false);

                    // Wait 3 seconds to redirect.
                    setTimeout(() => {
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
                    }, 3000);
                } else {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Disable submit button.
                    setBtnSubmitDisabled(true);

                    if (response.field === 'email') {
                        setEmailInvalidMessage(response.message);
                    } else if (response.field === 'password') {
                        setPasswordInvalidMessage(response.message);
                    }
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

                            {loginIn &&
                                <div className='text-center'>
                                    <FontAwesomeIcon
                                        className='text-success fa-2x mb-1'
                                        icon={faCheck}
                                    />
                                    <h6 className='text-success text-shadow-dark fw-bold mb-3'>Iniciando sesión...</h6>
                                </div>
                            }
                            
                            {!loginIn &&
                                <h6 className='text-center mb-4 text-darker text-shadow-dark'>Ingresa a tu cuenta</h6>
                            }

                            {/* Email */}
                            <div className='mb-3'>
                                <Input
                                    id='email'
                                    classes={emailInvalidMessage !== '' ? 'border-danger' : loginIn ? 'border-success' : ''}
                                    type='email'
                                    name='email'
                                    placeholder='Correo electronico'
                                    value={email}
                                    onChange={handleEmailChange}
                                    onFocus={() => setEmailInvalidMessage('')}
                                    icon={faAt}
                                />

                                {emailInvalidMessage !== '' && 
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {emailInvalidMessage}
                                    </div>
                                }
                            </div>

                            {/* Password */}
                            <div className='mb-3' >
                                <Input
                                    id='password'
                                    classes={passwordInvalidMessage !== '' ? 'border-danger' : loginIn ? 'border-success' : ''}
                                    type='password'
                                    name='password'
                                    placeholder='Contraseña'
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onFocus={() => setPasswordInvalidMessage('')}
                                    icon={faKey}
                                />

                                {passwordInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {passwordInvalidMessage}
                                    </div>
                                }
                            </div>

                            <Link to='/recuperar-contraseña'
                                className='text-primary text-end w-100'
                                type='button'
                            >
                                Olvide mi contraseña
                            </Link>

                            <div id="buttonsContainer" className='d-flex flex-column justify-content-center align-items-center mt-3'>
                                <button 
                                    id='ingresar'
                                    className='d-flex justify-content-center align-items-center btn bg-primary text-white box-shadow-dark text-uppercase mb-3'
                                    type='submit'
                                    onClick={handleSubmitForm}
                                    disabled={btnSubmitDisabled}
                                >

                                {showSpinner && 
                                    <div style={{width: '40px', marginTop: '-5px'}}>
                                        <img src={loadingGif} alt="wait until the page loads" height='20px'/>
                                    </div>
                                }

                                    Ingresar
                                </button>

                                <Link to='/register'
                                    id='registrarse'
                                    className='btn bg-white text-primary border border-primary box-shadow-dark text-uppercase mb-2'
                                    type='button'
                                >
                                    Registrarse
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