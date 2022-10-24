import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
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
        } else {
            links.classList.remove('showLinks');
        }
    }

    
    // Scroll with offset.
    const scrollWithOffset = (element, offset) => {
        const elementPosition = element.offsetTop - offset;

        window.scroll({
            top: elementPosition,
            left: 0,
            behavior: 'smooth'
        });
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
                                <FontAwesomeIcon id='hamburgerMenu' className='text-primary fa-2x' icon={faBars} />
                            </span>
                        </div>
                        
                        <div id='links' className="d-flex justify-content-end align-items-center text-uppercase text-center w-100 overflow-hidden" data-collapse={isCollapsed}>
                            <NavHashLink
                                to='/#banner'
                                scroll={element => scrollWithOffset(element, 118)}
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Inicio
                            </NavHashLink>

                            <NavHashLink
                                to='/#aboutUs'
                                scroll={element => scrollWithOffset(element, 118)}
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Sobre nosotros
                            </NavHashLink>

                            <Link
                                to='/#turnos'
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Turnos
                            </Link>

                            <NavHashLink
                                to='/#contacto'
                                scroll={element => scrollWithOffset(element, 118)}
                                className='nav-link position-relative p-3 me-3 mb-0 text-dark'
                            >
                                Contacto
                            </NavHashLink>

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