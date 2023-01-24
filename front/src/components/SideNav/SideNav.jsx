import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faUserDoctor, faFileMedical, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import './style.css';

function SideNav( { active } ) {
    const [rolUser, setRolUser] = React.useState('medico');

    // Check which screen is the active one.
    let dashboard = '';
    let agenda    = '';
    let pacientes = '';
    let medicos   = '';
    let turnos    = '';

    if (active === 'dashboard') {
        dashboard = 'active';
    } else if (active === 'agenda') {
        agenda = 'active';
    } else if (active === 'pacientes') {
        pacientes = 'active';
    } else if (active === 'medicos') {
        medicos = 'active';
    } else if (active === 'turnos') {
        turnos = 'active';
    }


    return (
        <div id='sideNav' className='d-flex flex-column bg-primary'>
            <Link to='/panel-admin' className='mt-3' >
                <Logo type='primary' />
            </Link>

            <div className='nav-container d-flex flex-column justify-content-between mt-5'>
                <div className='d-flex flex-column justify-content-start align-items-center h-100'>
                    <Link to='/panel-admin' className={'nav-item d-flex justify-content-start align-items-center text-white w-100 p-2 px-4 mt-4 ' + dashboard}>
                        <FontAwesomeIcon
                            className='text-white me-3'
                            icon={faBars}
                        />

                        <h5 className='text-uppercase mb-0'>Panel</h5>
                    </Link>

                    {/* Mi Agenda */}
                    {
                        rolUser === 'medico'
                        && <Link
                            to='/panel-admin/agenda'
                            className={'nav-item d-flex justify-content-start align-items-center text-white w-100 p-2 px-4 mt-4 ' + agenda}
                        >
                            <FontAwesomeIcon
                                className='text-white me-3'
                                icon={faFileMedical}
                            />
    
                            <h5 className='text-uppercase mb-0'>Mi Agenda</h5>
                        </Link>
                    }

                    <Link to='/panel-admin/pacientes' className={'nav-item d-flex justify-content-start align-items-center text-white w-100 p-2 px-4 mt-4 ' + pacientes}>
                        <FontAwesomeIcon
                            className='text-white me-3'
                            icon={faUser}
                        />

                        <h5 className='text-uppercase mb-0'>Pacientes</h5>
                    </Link>
                    
                    <Link to='/panel-admin/medicos' className={'nav-item d-flex justify-content-start align-items-center text-white w-100 p-2 px-4 mt-4 ' + medicos}>
                        <FontAwesomeIcon
                            className='text-white me-3'
                            icon={faUserDoctor}
                        />

                        <h5 className='text-uppercase mb-0'>Medicos</h5>
                    </Link>
                    
                    <Link to='/panel-admin/turnos' className={'nav-item d-flex justify-content-start align-items-center text-white w-100 p-2 px-4 mt-4 ' + turnos}>
                        <FontAwesomeIcon
                            className='text-white me-3'
                            icon={faFileMedical}
                        />

                        <h5 className='text-uppercase mb-0'>Turnos</h5>
                    </Link>
                </div>
                
                <Link to='/' className='nav-item d-flex justify-content-start align-items-center text-white w-100 p-2 px-4 mt-4'>
                    <FontAwesomeIcon
                        className='text-white me-3'
                        icon={faArrowLeft}
                    />

                    <h5 className='text-uppercase mb-0'>Volver al sitio</h5>
                </Link>
            </div>
        </div>
    )
}

export default SideNav