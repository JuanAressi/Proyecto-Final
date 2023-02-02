// Utilities.
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCheck, faKey } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

// Components.
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Input from '../../components/Input/Input';
import loadingGif from '../../components/assets/img/loadingGif.gif';
import withAuth from '../../highOrderComponents/withAuth';
import './style.css';

function Login() {
    // Form data.
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


    /**
     * Function logIn - Sends a request to the server to log in the user.
     *
     * @return {void}
     */
    const logIn = () => {
        // Show spinner.
        setShowSpinner(true);

        // Disable submit button.
        setBtnSubmitDisabled(true);

        // Send request.
        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'login',
            type: 'POST',
			dataType: 'json',
            data: {
                'email': email,
                'password': password
            },
			success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Set loginIn to true.
                    setLoginIn(true);
                    
                    // Delete the previous user information in LocalStorage.
                    localStorage.removeItem('user');

                    // Set timestamp to the user information.
                    response.user.timestamp = Date.now();

                    // Save the new user information in LocalStorage.
                    localStorage.setItem('user', JSON.stringify(response.user));

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
                            default:
                                window.location.href = '/';
                                break;
                        }
                    }, 1500);
                } else {
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


    // Render the 'Login' page.
    return (
        <div id='loginPage'>
			<Navbar />

            <div className='blue-overlay min-height'>
                <div className='container p-8'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div id='loginForm' className='rounded box-shadow-dark p-5'>
                            <h1 className='text-center mb-3 text-primary text-shadow-dark'>¡Bienvenido!</h1>

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
                                <h6 className='text-center mb-4 text-primary text-shadow-dark'>Ingresa a tu cuenta</h6>
                            }

                            {/* Email */}
                            <div className='mb-3'>
                                <Input
                                    id='email'
                                    classes={emailInvalidMessage !== '' ? 'border-danger' : loginIn ? 'border-success' : ''}
                                    type='email'
                                    name='email'
                                    placeholder='Correo electrónico'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
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
                                    onChange={(event) => setPassword(event.target.value)}
                                    onFocus={() => setPasswordInvalidMessage('')}
                                    icon={faKey}
                                />

                                {passwordInvalidMessage !== '' &&
                                    <div className='invalid-feedback d-block fw-bold ps-1'>
                                        {passwordInvalidMessage}
                                    </div>
                                }
                            </div>

                            {/* Recuperar contraseña */}
                            <div className='d-flex justify-content-end'>
                                <span>
                                    <Link
                                        to='/recuperar-contraseña'
                                        id='forgotPassword'
                                        className='text-primary position-relative w-100'
                                    >
                                        Olvide mi contraseña
                                    </Link>
                                </span>
                            </div>

                            {/* Button container */}
                            <div id='buttonsContainer' className='d-flex flex-column justify-content-center align-items-center mt-3'>
                                <button 
                                    id='ingresar'
                                    className='d-flex justify-content-center align-items-center btn bg-primary text-white box-shadow-dark text-uppercase mb-3'
                                    type='submit'
                                    onClick={logIn}
                                    disabled={btnSubmitDisabled}
                                >
                                    {showSpinner && 
                                        <div style={{width: '40px', marginTop: '-5px'}}>
                                            <img src={loadingGif} alt='wait until the page loads' height='20px'/>
                                        </div>
                                    }

                                    Ingresar
                                </button>

                                <Link to='/register'
                                    id='registrarse'
                                    className='btn bg-white text-primary border border-primary box-shadow-dark text-uppercase mb-2'
                                    type='button'
                                >
                                    Registrarme
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default withAuth('')(Login)