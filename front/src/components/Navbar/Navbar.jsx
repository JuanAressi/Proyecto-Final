import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import './style.css';

function Navbar() {
    const [isCollapsed, setIsCollapsed] = useState(true);

    
	useEffect(() => {
        handleHamburgerMenuContainer();
    }, []);


    // Handle hamburger menu container click.
    const handleHamburgerMenuContainer = () => {
        setIsCollapsed(!isCollapsed);

        let links = document.getElementById('links');

        if (isCollapsed) {
            links.classList.add('showLinks');
            // links.style.height = '0px';
        } else {
            links.classList.remove('showLinks');

            for (let i = 280; i > 0; i++) {
                console.log('i: ', i);
                links.style.height = i + 'px';
            }
            // links.style.height = 'auto';
        }
    }


    return (
        <div id="navbar" className='navbar bg-light box-shadow-dark'>
            <div className="container">
                <div className="d-flex justify-content-between w-100">
                        <div id='brandAndMenu' className="d-flex flex-row justify-content-between align-items-center">
                            <Link to='/' >
                                <Logo style='secondary' />
                            </Link>

                            <span id='hamburgerMenuContainer' className='p-4 d-none' onClick={handleHamburgerMenuContainer}>
                                <FontAwesomeIcon id='hamburgerMenu' className='text-secondary fa-2x' icon={faBars} />
                            </span>
                        </div>
                        
                        <div id='links' className="d-flex justify-content-end align-items-center text-uppercase text-center w-100 overflow-hidden" data-collapse={isCollapsed}>
                            <Link
                                to='/#banner'
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Inicio
                            </Link>

                            <Link
                                to='/#sobre-nosotros'
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Sobre nosotros
                            </Link>

                            <Link
                                to='/#turnos'
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Turnos
                            </Link>

                            <Link
                                to='/#contacto'
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Contacto
                            </Link>

                            <Link
                                to='/login'
                                className='nav-link position-relative p-3 mb-0 ms-5 text-dark'
                            >
                                Ingresar
                            </Link>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar