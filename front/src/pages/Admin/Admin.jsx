import React from 'react';
import { Link } from 'react-router-dom';
import { faUsers, faUserDoctor, faFileMedical, faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNav from '../../components/SideNav/SideNav';
import Card from '../../components/Card/Card';
import './style.css';

function Admin() {
    return (
        <div id='adminPage' className='d-flex bg-lightgray'>
            <SideNav />

            <div className='container p-5'>
                <h1 className='text-center mt-5'>Bienvenido Admin</h1>


                <div className='row d-flex justify-content-around mt-5'>
                    <Link
                        to='/panel-admin/pacientes'
                    >
                        <Card 
                            title='Gestionar Pacientes'
                            text='Vea información detallada de cada uno de los pacientes'
                            icon={faUsers}
                        />
                    </Link>
                    
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
                
                <div className='row d-flex justify-content-around mt-5'>
                    <Link
                        to='/panel-admin/turnos'
                    >
                        <Card 
                            title='Gestionar Turnos'
                            text='Vea el registro de todos los turnos asignados'
                            icon={faFileMedical}
                        />
                    </Link>
                    
                    <Link
                        to='/panel-admin/...'
                    >
                        <Card 
                            title='Gestionar Reportes'
                            text='Cree y administre los distintos reportes'
                            icon={faPlus}
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Admin