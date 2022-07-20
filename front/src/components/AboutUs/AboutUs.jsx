import React from 'react';
import Waves from '../Waves/Waves';
import './style.css';

function AboutUs() {
    return (
        <div id='aboutUs' className='bg-white mt-5'>
            <div className="container">
                <h2 className='text-secondary text-center text-uppercase mb-4'>Comprometidos con tu salud</h2>

                <div className="d-flex justify-content-space-between">
                    <div className="card mx-4 mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Profesionales</h5>

                            <p className="card-text">
                                Contamos con profesionales capacitados en distintas áreas medicas, para que tengas la mejor atención.
                            </p>
                        </div>
                    </div>

                    <div className="card mx-4 mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Urgencias</h5>

                            <p className="card-text">
                                Contamos con una urgencia 24/7, para que puedas atenderte en cualquier momento.
                            </p>
                        </div>
                    </div>

                    <div className="card mx-4 mt-4">
                        <div className="card-body">
                            <h5 className="card-title">Obras Sociales y Prepagas</h5>

                            <p className="card-text">
                                Contamos con un amplio listado de obras sociales y empresas de medicina prepaga con las que trabajamos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='waves-container'>
                <Waves />
            </div>

            <div className='bg-secondary' style={{ height: '5rem' }}></div>
        </div>
    )
}

export default AboutUs