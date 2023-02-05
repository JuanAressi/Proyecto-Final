// Utilities.
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faFileMedical, faUser } from '@fortawesome/free-solid-svg-icons';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

// Components.
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import ReporteHistoriaClinica from '../../components/Reportes/ReporteHistoriaClinica';

function Usuario() {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Get the user data from the local storage.
        const user = JSON.parse(localStorage.getItem('user'));

        // Set the user data.
        setUser(user);
    }, []);

    // Render the 'Usuario' page.
    return (
        <div id='panelUsuarios'>
            <Navbar />

            <div className='d-flex bg-lightgray min-height'>
                <div className='container p-4'>
                    <h1 className='text-center mt-2'>¡Bienvenido, {user.nombre} {user.apellido}!</h1>
                    
                    <PDFViewer style={{ width: '100%', height: '90vh'}}>
                        <ReporteHistoriaClinica />
                    </PDFViewer>

                    <PDFDownloadLink document={<ReporteHistoriaClinica />} filename='historia-clinica.pdf'>
                        <button className='btn btn-primary mt-4'>Descargar PDF</button>
                    </PDFDownloadLink>

                    <div className='row mt-4'>
                        {/* Mis turnos */}
                        <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                            <Link
                                to='/panel-usuario/mis-turnos'
                            >
                                <Card 
                                    title='Gestionar mis turnos'
                                    text='Ver información sobre todos mis turnos'
                                    icon={faFileMedical}
                                />
                            </Link>
                        </div>

                        {/* Datos personales */}
                        <div className='col-md-6 col-sm-12 d-flex justify-content-center mb-2'>
                            <Link
                                to='/panel-usuario/datos-personales'
                            >
                                <Card
                                    title='Mis datos personales'
                                    text='Ver y modificar mis datos personales'
                                    icon={faUser}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Usuario