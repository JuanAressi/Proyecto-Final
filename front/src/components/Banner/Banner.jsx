import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Banner() {
    return (
        <section id='banner'>
            <div className='banner-overlay p-8'>
                <div className='container'>
                    <div className='row h-100'>
                        <div className='col-lg-8 col-md-10 col-sm-12 my-auto'>
                            <div className='d-flex flex-column justify-content-center align-items-start'>
                                <h1 className='text-white display-2 mb-0'>Solicitar un turno nunca fue tan fácil</h1>
                                <h3 className='text-white display-6 mt-4'>¡Y al instante!</h3>

                                <div className='text-center w-100'>
                                    <Link
                                        to='/turnos'
                                        className='btn border border-light text-light text-uppercase px-3 mt-5 w-50'
                                    >
                                        Reservar Turno
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner