import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../components/Navbar/Navbar';
import Input from '../../components/Input/Input';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Use effect.
    useEffect(() => {
        setBtnDisabled(false);
    }, []);


    // Username onchange.
    const handleUsernameChange = (event) => {
        if (password === '') {
            // Text is empty.
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);            
        }

        setUsername(event.target.value);
    }


    // Password onchange.
    const handlePasswordChange = (event) => {
        if (password === '') {
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);            
        }

        setPassword(event.target.value);
    }


    return (
        <div id='loginPage' style={{ marginTop: '102px' }}>
			<Navbar />
			
            <div className='blue-overlay'>
                <div className='container p-0'>
					<div className="row">
						<div className="col-lg-6 col-md-8 col-sm-10 mx-auto p-5">
							<form id='loginForm' className='rounded box-shadow-dark mt-5 p-4'>
								<h1 className='text-center mb-3 text-darker text-shadow-dark'>¡Bienvenido!</h1>
								<h6 className='text-center mb-4 text-darker text-shadow-dark'>Ingresa a tu cuenta</h6>

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
								z	onChange={handlePasswordChange}
									icon={faKey}
									margin='1rem'
								/>

								<Link to='/recuperar-contraseña'
									className='text-secondary text-end w-100'
									type='button'
								>
									Olvide mi contraseña
								</Link>

								<div id="buttonsContainer" className='d-flex flex-column justify-content-center align-items-center mt-3'>
									<button 
										id='ingresar'
										className='btn bg-secondary text-white box-shadow-dark text-uppercase w-50 mb-3'
										type='submit'
										disabled={btnDisabled}
									>
										Ingresar
									</button>

									<Link to='/register'
										id='registrarse'
										className='btn bg-white text-secondary border border-secondary box-shadow-dark text-uppercase w-50 mb-2'
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
        </div>
    )
}

export default Login