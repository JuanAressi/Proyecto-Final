import React from 'react';
import './style.css';

function Banner() {
    return (
        <section id='banner'>
            <div className='banner-overlay'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 col-sm-12'>
                            <div className='d-flex flex-column justify-content-center align-items-start'>
                                <h1 className='text-white display-2 ms-3'>Solicitar un turno nunca fue tan facil</h1>
                                <h2 className='text-white display-6 mt-4 ms-3'>¡Y al instante!</h2>

                                <div className='text-center w-100'>
                                    <button className='btn border border-light text-light text-uppercase px-3 mt-5 w-50'>Reservar Turno</button>
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