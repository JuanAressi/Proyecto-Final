import React from 'react';
import { faUserDoctor, faHeartCircleBolt, faPager } from '@fortawesome/free-solid-svg-icons';
import Waves from '../Waves/Waves';
import Card from '../Card/Card';
import './style.css';

function AboutUs() {
    return (
        <div id='aboutUs' className='bg-light pt-5'>
            <div className="container">
                <h2 className='text-primary text-center text-uppercase font-size-5'>Comprometidos con tu salud</h2>
    
                <div className="row d-flex justify-content-center p-5">
                    <Card 
                        title='Profesionales'
                        text='Contamos con profesionales capacitados en distintas áreas medicas, para que tengas la mejor atención.'
                        icon={faUserDoctor}
                    />

                    <Card 
                        title='Urgencias'
                        text='Tenemos servicio de urgencias 24/7, para que puedas atenderte en cualquier momento.'
                        icon={faHeartCircleBolt}
                    />

                    <Card 
                        title='Obras Sociales y Prepagas'
                        text='Contamos con un amplio listado de obras sociales y empresas de medicina prepaga con las que trabajamos.'
                        icon={faPager}
                    />
                </div>
            </div>

            <div className='waves-container'>
                <Waves />
            </div>

            <div className='bg-primary' style={{ height: '5rem' }}></div>
        </div>
    )
}

export default AboutUs