import { React, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import './style.css';


function Navbar() {
    const [role, setRole] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

	useEffect(() => {
        // Get the user from LocalStorage.
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // Get the user role.
            setRole(user.rol);
        }
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


    /**
     * Function cerrarSesión - Closes the session of the current user.
     *
     * @return {void}
     */
    const cerrarSesión = () => {
        // Delete the previous user information in LocalStorage.
        localStorage.removeItem('user');

        // Reload to the home page.
        window.location.href = '/';
    }


    // Render the 'Navbar' component.
    return (
        <div id='navbar' className='navbar bg-light box-shadow-dark'>
            <div className='container'>
                <div className='d-flex justify-content-between w-100'>
                        <div id='brandAndMenu' className='d-flex flex-row justify-content-between align-items-center'>
                            <Link to='/' >
                                <Logo type='secondary' />
                            </Link>

                            <span id='hamburgerMenuContainer' className='p-4 d-none' onClick={handleHamburgerMenuContainer}>
                                <FontAwesomeIcon
                                    id='hamburgerMenu'
                                    className='text-primary fa-2x'
                                    icon={faBars}
                                />
                            </span>
                        </div>
                        
                        <div id='links' className='d-flex justify-content-end align-items-center text-uppercase text-center w-100' data-collapse={isCollapsed}>
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
                                to='/turnos'
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

                            {
                                role === 'paciente'
                                ? (
                                    <div className='nav-item dropdown'>
                                        <span
                                            id='miCuenta'
                                            className='nav-link dropdown-toggle text-dark'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            Mi cuenta
                                        </span>

                                        <ul className='dropdown-menu' aria-labelledby='miCuenta' style={{left: 'calc((100% - 186px) / 2)'}}>
                                            <li>
                                                <Link
                                                    className='dropdown-item'
                                                    to='/panel-usuario'
                                                >
                                                    Panel de usuario
                                                </Link>
                                            </li>

                                            <li>
                                                <span
                                                    className='dropdown-item'
                                                    onClick={() => cerrarSesión()}
                                                >
                                                    Cerrar Sesión
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                : role === 'medico' 
                                ? (
                                    <div className='nav-item dropdown'>
                                        <span
                                            id='miCuenta'
                                            className='nav-link dropdown-toggle text-dark'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            Mi cuenta
                                        </span>

                                        <ul className='dropdown-menu' aria-labelledby='miCuenta' style={{left: 'calc((100% - 174px) / 2)'}}>
                                            <li>
                                                <Link
                                                    className='dropdown-item'
                                                    to='/panel-medico'
                                                >
                                                    Panel de medico
                                                </Link>
                                            </li>

                                            <li>
                                                <span
                                                    className='dropdown-item'
                                                    onClick={() => cerrarSesión()}
                                                >
                                                    Cerrar Sesión
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                : role === 'recepcionista'
                                ? (
                                    <div className='nav-item dropdown'>
                                        <span
                                            id='miCuenta'
                                            className='nav-link dropdown-toggle text-dark'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            Mi cuenta
                                        </span>

                                        <ul className='dropdown-menu' aria-labelledby='miCuenta' style={{left: 'calc((100% - 235px) / 2)'}}>
                                            <li>
                                                <Link
                                                    className='dropdown-item'
                                                    to='/panel-recepcionista'
                                                >
                                                    Panel de recepcionista
                                                </Link>
                                            </li>

                                            <li>
                                                <span
                                                    className='dropdown-item'
                                                    onClick={() => cerrarSesión()}
                                                >
                                                    Cerrar Sesión
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                : role === 'admin'
                                ? (
                                    <div className='nav-item dropdown'>
                                        <span
                                            id='miCuenta'
                                            className='nav-link dropdown-toggle text-dark'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            Mi cuenta
                                        </span>

                                        <ul className='dropdown-menu' aria-labelledby='miCuenta' style={{left: 'calc((100% - 165px) / 2)'}}>
                                            <li>
                                                <Link
                                                    className='dropdown-item'
                                                    to='/panel-admin'
                                                >
                                                    Panel de admin
                                                </Link>
                                            </li>

                                            <li>
                                                <span
                                                    className='dropdown-item'
                                                    onClick={() => cerrarSesión()}
                                                >
                                                    Cerrar Sesión
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                : role === 'soporte'
                                ? (
                                    <div className='nav-item dropdown'>
                                        <span
                                            id='miCuenta'
                                            className='nav-link dropdown-toggle text-dark'
                                            role='button'
                                            data-bs-toggle='dropdown'
                                            aria-expanded='false'
                                        >
                                            Mi cuenta
                                        </span>

                                        <ul className='dropdown-menu' aria-labelledby='miCuenta' style={{left: 'calc((100% - 186px) / 2)'}}>
                                            <li>
                                                <Link
                                                    className='dropdown-item'
                                                    to='/panel-soporte'
                                                >
                                                    Panel de soporte
                                                </Link>
                                            </li>

                                            <li>
                                                <span
                                                    className='dropdown-item'
                                                    onClick={() => cerrarSesión()}
                                                >
                                                    Cerrar Sesión
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                : role === null
                                ? (
                                    <Link
                                        to='/login'
                                        className='nav-link position-relative p-3 mb-0 text-dark'
                                    >
                                        Ingresar
                                    </Link>
                                )
                                : null
                            }
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar