import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import Logo from '../components/Logo';
import Input from '../components/Input';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);

    // Use effect.
    useEffect(() => {
        setBtnDisabled(false);

		// fetch('/database.php', {
        //     method: 'get',
        // })
		// .then(response => response.json)
		// .then((data) => {
		// 	debugger
		// 	console.log('data', data);
		// })
		// .catch()
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
        <div id='loginPage'>
            <div className='blue-overlay'>
                <div className='container mx-auto pt-5 px-3'>
                    <div className='mx-auto my-5'>
                        <Logo />
                    </div>

                    <form id='loginForm' className='rounded box-shadow-dark p-4'>
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

                        <div id="buttonsContainer" className='d-flex flex-column justify-content-center align-items-center mt-4'>
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
                                data-bs-toggle="modal"
                                data-bs-target="#registerModal"
                            >
                                Registrate
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login