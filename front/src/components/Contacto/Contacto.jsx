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
                <h2 className='text-primary text-center text-uppercase font-size-5'>Contacto</h2>

                <div className='d-flex justify-content-around p-5'>
                    <div className='d-flex flex-column'>
                        <div className='mb-5'>
                            <div className='d-flex align-items-center mb-1'>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    style={{ fontSize: '1.25rem' }}
                                />

                                <h3 className='mb-0 ms-2'>Telefono</h3>
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


                        <div className='mb-5'>
                            <div className='d-flex align-items-center mb-1'>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    style={{ fontSize: '1.25rem' }}
                                />

                                <h3 className='mb-0 ms-2'>Correo Electronico</h3>
                            </div>

                            <a
                                className='text-dark'
                                href='mailto:contacto@misturnos.com'
                            >
                                contacto@misturnos.com
                            </a>
                        </div>


                        <div className='mb-5'>
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


                    <div className='d-flex flex-column align-items-center'>
                        <h3>¿Querés hacernos una consulta?</h3>

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