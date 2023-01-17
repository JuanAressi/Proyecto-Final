import { React, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Input from '../Input/Input';
import './style.css';

function Contacto() {
    // State related to contact form.
    const [name, setName]       = useState('');
    const [email, setEmail]     = useState('');
    const [message, setMessage] = useState('');

    return (
        <div id='contacto' className='bg-light py-5'>
            <div className='container'>
                <h2 className='text-primary text-center text-uppercase font-size-5 mb-4'>Contacto</h2>

                <div className='row container px-4 mx-0'>
                    <div className='col-lg-6 col-md-12 d-flex flex-column justify-content-evenly first-element'>
                        {/* Teléfono */}
                        <div className='mb-5'>
                            <div className='d-flex align-items-center mb-1'>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    style={{ fontSize: '1.25rem' }}
                                />

                                <h3 className='mb-0 ms-2'>Teléfono</h3>
                            </div>

                            <div className='d-flex flex-column'>
                                <a
                                    className='text-dark mb-1'
                                    href='tel:+5493414551324'
                                >
                                    (0341) - 4551324
                                </a>

                                <a
                                    className='text-dark mb-0'
                                    href='tel:+5493415123456'
                                >
                                    (0341) - 155123456
                                </a>
                            </div>
                        </div>

                        {/* Correo Electrónico */}
                        <div className='mb-5'>
                            <div className='d-flex align-items-center mb-1'>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    style={{ fontSize: '1.25rem' }}
                                />

                                <h3 className='mb-0 ms-2'>Correo Electrónico</h3>
                            </div>

                            <a
                                className='text-dark'
                                href='mailto:contacto@misturnos.com'
                            >
                                contacto@misturnos.com
                            </a>
                        </div>

                        {/* Dirección */}
                        <div className=''>
                            <div className='d-flex align-items-center mb-1'>
                                <FontAwesomeIcon
                                    icon={faMapMarkerAlt}
                                    style={{ fontSize: '1.25rem' }}
                                />

                                <h3 className='mb-0 ms-2'>Dirección</h3>
                            </div>

                            <p className='mb-0'>Av. Siempre Viva 742</p>
                        </div>
                    </div>

                    {/* Consulta */}
                    <div className='col-lg-6 col-md-12'>
                        <h3 className='text-center'>¿Querés hacernos una consulta?</h3>

                        <div className='w-100 pt-2 px-5'>
                            <div className='mb-3'>
                                <Input
                                    id='nameAndLastname'
                                    type='text'
                                    name='nameAndLastname'
                                    placeholder='Nombre y Apellido'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className='mb-3'>
                                <Input
                                    id='email'
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className='form-floating'>
                                <textarea
                                    id='message'
                                    className='form-control w-100 mx-auto box-shadow-dark-1'
                                    name='message'
                                    placeholder='Mensaje'
                                    style={{ minHeight: '58px', height: '8rem' }}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <label htmlFor='message'>Mensaje</label>
                            </div>

                            <div className='text-center'>
                                <button className='btn bg-primary text-white box-shadow-dark w-100 mt-3'>Enviar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacto