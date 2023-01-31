import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faUsers, faUserDoctor, faFileLines, faFileMedical, faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNav from '../../components/SideNav/SideNav';
import Card from '../../components/Card/Card';
import './style.css';

function Admin() {
    const [role, setRole] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    
	useEffect(() => {
        // Get the user from LocalStorage.
        const user = JSON.parse(localStorage.getItem('user'));

        // Set the user role.
        setRole(user.rol);
        setNombre(user.nombre);
        setApellido(user.apellido);
    }, []);


    // Render the 'Admin' page.
    return (
        <div id='adminPage' className='d-flex bg-lightgray'>
            <SideNav
                active='dashboard'
            />

            <div className='container p-5'>
                <h1 className='text-center mt-5'>¡Bienvenido {nombre} {apellido}!</h1>

                <div className='row d-flex justify-content-center mt-5'>
                    {/* Mi Agenda */}
                    {
                        role === 'medico'
                        && <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                            <Link
                                to='/panel-medico/agenda'
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
                            to={'/panel-' + role + '/pacientes'}
                        >
                            <Card 
                                title='Gestionar Pacientes'
                                text='Vea información detallada de cada uno de los pacientes'
                                icon={faUsers}
                            />
                        </Link>
                    </div>
                    
                    {/* Medicos */}
                    {
                        (role === 'administrativo' || role === 'admin' || role === 'soporte')
                        && <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                            <Link
                                to={'/panel-' + role + '/medicos'}
                            >
                                <Card 
                                    title='Gestionar Medicos'
                                    text='Vea información detallada de cada uno de los medicos'
                                    icon={faUserDoctor}
                                />
                            </Link>
                        </div>
                    }

                    {/* Turnos */}
                    <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                        <Link
                            to={'/panel-' + role + '/turnos'}
                        >
                            <Card 
                                title={role === 'medico' ? 'Gestionar mis Turnos' : 'Gestionar Turnos'}
                                text='Vea el registro de todos los turnos asignados'
                                icon={faFileLines}
                            />
                        </Link>
                    </div>

                    {/* Reportes */}
                    {
                        (role === 'administrativo' || role === 'admin' || role === 'soporte')
                        && <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                            <Link
                                to='/panel-admin/reportes'
                            >
                                <Card 
                                    title='Gestionar Reportes'
                                    text='Cree y administre los distintos reportes'
                                    icon={faFileMedical}
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