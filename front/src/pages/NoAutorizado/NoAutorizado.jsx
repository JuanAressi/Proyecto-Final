// Utilities.
import { React } from 'react';
import { Link } from 'react-router-dom';
// Components.
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function AccesoNoAutorizado() {
    return (
        <div id='accesoNoAutorizado'>
            <Navbar />

            <div className='d-flex bg-lightgray min-height'>
                <div className='container p-4'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <h1 className='text-primary mt-6 mb-2'>¡Uuuups!</h1>

                        <h3 className='text-secondary mb-4'>Parece que no tienes permiso para acceder a esta página.</h3>
                        
                        <div className=''>
                            <Link
                                className='btn border border-primary text-primary text-uppercase box-shadow-dark-1 px-3 mt-1 cursor-pointer'
                                to='/'
                            >
                                Volver a la pagina de inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default AccesoNoAutorizado