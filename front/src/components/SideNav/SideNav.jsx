import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserDoctor, faFileMedical, faPlus } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import './style.css';

function SideNav() {
    return (
        <div id='sideNav' className='d-flex flex-column bg-secondary'>
            <Link to='/' className='mt-3' >
                <Logo style='primary' />
            </Link>

            <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
                <Link to='/' className='d-flex justify-content-start align-items-center text-white w-100 p-2 mt-4 ms-5'>
                    <FontAwesomeIcon
                        className='text-white me-3'
                        icon={faUser}
                    />
                    <h4 className='mb-0'>Pacientes</h4>
                </Link>
                
                <Link to='/' className='d-flex justify-content-start align-items-center text-white w-100 p-2 mt-4 ms-5'>
                    <FontAwesomeIcon
                        className='text-white me-3'
                        icon={faUserDoctor}
                    />
                    <h4 className='mb-0'>Medicos</h4>
                </Link>
                
                <Link to='/' className='d-flex justify-content-start align-items-center text-white w-100 p-2 mt-4 ms-5'>
                    <FontAwesomeIcon
                        className='text-white me-3'
                        icon={faFileMedical}
                    />
                    <h4 className='mb-0'>Turnos</h4>
                </Link>
            </div>
        </div>
    )
}

export default SideNav