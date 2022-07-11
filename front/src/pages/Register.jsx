import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey, faAt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../components/Navbar';
import Input from '../components/Input';


function Register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordRep, setPasswordRep] = useState('');
	const [email, setEmail] = useState('');
	const [btnDisabled, setBtnDisabled] = useState(true);

	// Use effect.
	useEffect(() => {
		let isValid = true;

		if (username === '') { isValid = false; }

		if (password === '') { isValid = false; }

		if (passwordRep === '') { isValid = false; }

		if (email === '') { isValid = false; }

		
		if (isValid === true) {
			setBtnDisabled(false);
		} else {
			setBtnDisabled(true);
		}
	}, [username, password, passwordRep, email]);


	// Username onchange.
	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	}


	// Password onchange.
	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	}


	// Password onchange.
	const handlePasswordRepChange = (event) => {
		setPasswordRep(event.target.value);
	}


	// Email onchange.
	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	}


	// Validate inputs.
	const validateInputs = () => {
	}


	return (
		<div id='registerPage'>
			<Navbar />

			<div className='blue-overlay'>
				<div className='container p-0'>					
					<div className="row">
						<div className="col-lg-6 col-md-8 col-sm-10 mx-auto p-5">
							{/* <div>
								<Link to='/'>
									<FontAwesomeIcon className='icon text-white' icon={faArrowLeft} />
								</Link>
							</div> */}

							<form id='registerForm' className='rounded box-shadow-dark mt-5 pt-4'>
								<h2 className='text-center mb-3 text-darker text-shadow-dark'>¡Crear la cuenta es sencillo!</h2>
								<h6 className='text-center mb-4 text-darker text-shadow-dark'>Completa el formulario</h6>

								<div className='p-4'>
									{/* Username */}
									<Input
										id='username'
										type='text'
										name='username'
										placeholder='Nombre de usuario'
										value={username}
										onChange={handleUsernameChange}
										icon={faUser}
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
										type='passwordRep'
										name='passwordRep'
										placeholder='Vuelva a ingresar la contraseña'
										value={passwordRep}
										onChange={handlePasswordRepChange}
										icon={faKey}
										margin='1.5rem'
									/>

									{/* Repetir Password */}
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

									<div id="buttonsContainer" className='d-flex flex-column justify-content-center align-items-center mt-4'>
										<button
											id='crearCuenta'
											className='btn bg-secondary text-white box-shadow-dark text-uppercase w-50 mb-3'
											type='submit'
											disabled={btnDisabled}
										>
											Crear cuenta
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Register