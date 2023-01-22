import React from 'react';
import { Link } from 'react-router-dom';
import { faUsers, faUserDoctor, faFileMedical, faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNav from '../../components/SideNav/SideNav';
import Card from '../../components/Card/Card';
import './style.css';

function Admin() {
    const [rolUser, setRolUser] = React.useState('medico');

    return (
        <div id='adminPage' className='d-flex bg-lightgray'>
            <SideNav
                active='dashboard'
            />

            <div className='container p-5'>
                <h1 className='text-center mt-5'>Bienvenido Admin</h1>

                <div className='row mt-5'>
                    {/* Mi Agenda */}
                    {
                        rolUser === 'medico'
                        && <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                            <Link
                                to='/panel-admin/agenda'
                            >
                                <Card 
                                    title='Mi Agenda'
                                    text='Administre sus días y horarios de atención'
                                    icon={faPlus}
                                />
                            </Link>
                        </div>
                    }

                    {/* Pacientes */}
                    <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                        <Link
                            to='/panel-admin/pacientes'
                        >
                            <Card 
                                title='Gestionar Pacientes'
                                text='Vea información detallada de cada uno de los pacientes'
                                icon={faUsers}
                            />
                        </Link>
                    </div>
                    
                    {/* Medicos */}
                    <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                        <Link
                            to='/panel-admin/medicos'
                        >
                            <Card 
                                title='Gestionar Medicos'
                                text='Vea información detallada de cada uno de los medicos'
                                icon={faUserDoctor}
                            />
                        </Link>
                    </div>

                    {/* Turnos */}
                    <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                        <Link
                            to='/panel-admin/turnos'
                        >
                            <Card 
                                title='Gestionar Turnos'
                                text='Vea el registro de todos los turnos asignados'
                                icon={faFileMedical}
                            />
                        </Link>
                    </div>

                    {/* Reportes */}
                    {
                        rolUser !== 'medico'
                        && <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                            <Link
                                to='/panel-admin/reportes'
                            >
                                <Card 
                                    title='Gestionar Reportes'
                                    text='Cree y administre los distintos reportes'
                                    icon={faPlus}
                                />
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Admin