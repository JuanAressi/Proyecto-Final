import { React, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faPlus, faDownload, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import NuevaHistoriaClinica from './NuevaHistoriaClinica';

function EditarPaciente({pacienteNombre, pacienteApellido, pacienteEmail, pacienteFechaNacimiento, pacienteGenero, pacienteDni, pacienteTelefono, pacienteObraSocial, pacienteNumeroObraSocial, pacienteAntecedentes, pacienteAlergias, historiaClinica, setPacienteNombre, setPacienteApellido, setPacienteEmail, setPacienteFechaNacimiento, setPacienteGenero, setPacienteDni, setPacienteTelefono, setPacienteObraSocial, setPacienteNumeroObraSocial, setPacienteAntecedentes, setPacienteAlergias, setHistoriaClinica, updatePaciente}) {
    const obrasSociales = [
        {value: '', text: 'Selecciona una opción'},
        {value: 'OSDE', text: 'OSDE'},
        {value: 'Swiss Medical', text: 'Swiss Medical'},
        {value: 'Medifé', text: 'Medifé'},
        {value: 'Emerger', text: 'Emerger'},
        {value: 'Particular', text: 'Particular'}
    ];

    const [parsedFechaNacimiento, setParsedFechaNacimiento] = useState('');


    // Handle the change of 'pacienteFechaNacimiento' state.
    useEffect(() => {
        // Check that is not empty.
        if (pacienteFechaNacimiento !== '') {
            // If it is in the format 'dd-mm-yyyy', then parse it.
            if (pacienteFechaNacimiento.indexOf('-') === 2) {
                const fechaNacimiento = pacienteFechaNacimiento.split('-');
                setParsedFechaNacimiento(`${fechaNacimiento[2]}-${fechaNacimiento[1]}-${fechaNacimiento[0]}`);
            } else if (pacienteFechaNacimiento.indexOf('-') === 4) {
                setParsedFechaNacimiento(pacienteFechaNacimiento);
            }
        }
    }, [pacienteFechaNacimiento]);


    /**
     * Function toggleActive - Switch the active tab.
     *
     * @param object event - The event object.
     * @param int    tab   - The tab to switch to.
     *
     * @return void
     */
    function toggleActive(event, tab) {
        // Check if the clicked element is not the active one.
        if (!event.target.className.includes('active')) {
            // Obtain all the tabs.
            var tabsChild = document.getElementById('tabs').childNodes;

            tabsChild.forEach(element => {
                if (element.className.includes('active')) {
                    // Remove the active class from the active tab.
                    element.classList.remove('active');
                }
            });

            // Add the active class to the clicked tab.
            event.target.classList.add('active');

            // Get the 'tabs-container' div.
            const tabsContainer = document.querySelector('.tabs-container');
    
            // Calculate the transition.
            if (tab === 0) {
                tabsContainer.style.transform = 'translateX(0%)';
            } else if (tab === 1) {
                tabsContainer.style.transform = 'translateX(-100%)';
            }
        }
    }


    /**
     * Function openModalNewHistoriaClinica - Open the 'Nueva Historia Clinica' modal.
     *
     * @return void
     */
    function openModalNewHistoriaClinica() {
        // Get the 'Nueva Historia Clinica' modal.
        const modal = document.getElementById('modalHistoriaClinica');

        // Open the modal.
            modal.style.display = 'block';
        
        // Add the background color.
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

        // Set attribute.
        modal.setAttribute('aria-hidden', 'false');
        modal.setAttribute('role', 'dialog');

        setTimeout(() => {
            modal.classList.add('show');
        }, 75);
    }


    // Render the 'EditarPaciente' component.
    return (
        <div id='modalEdit' className='modal fade' tabIndex='-1' aria-hidden='true'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content position-relative'>
                    <div className='bg-primary box-shadow-dark-1 px-4 py-2'>
                        <h1 className='display-6 text-white text-shadow-dark me-4'>Editar Paciente</h1>
                    </div>

                    <div
                        className='d-flex justify-content-center align-items-center position-absolute bg-white rounded-circle box-shadow-dark'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                    >
                        <FontAwesomeIcon
                            className='text-primary'
                            icon={faX}
                        />
                    </div>

                    <div className='d-flex flex-column'>
                        {/* Tabs */}
                        <div id='tabs' className='d-flex bg-lightgray pt-1 z-index-0'>
                            <div 
                                className='border-top-1 py-2 px-4 ms-2 cursor-pointer active'
                                onClick={(event) => toggleActive(event, 0)}
                            >
                                Datos personales
                            </div>

                            <div 
                                className='border-top-1 py-2 px-4 cursor-pointer'
                                onClick={(event) => toggleActive(event, 1)}
                            >
                                Historia clinica
                            </div>
                        </div>


                        <div className='d-flex w-100 overflow-hidden'>
                            <div className='d-flex w-100 tabs-container'>
                                {/* Datos Personales */}
                                <div id='datosPersonales' className='d-flex flex-column align-items-center bg-white position-relative p-4 w-100 z-index-1'>
                                    <form id='formAdd' className='d-flex justify-content-center align-items-center row mb-3'>
                                        {/* Nombre */}
                                        <div className='col-lg-4 col-md-6 mb-2'>
                                            <label htmlFor='nombre'>Nombre</label>

                                            <input
                                                className='form-control'
                                                type='text'
                                                name='nombre'
                                                placeholder='Nombre'
                                                aria-label='Nombre'
                                                value={pacienteNombre}
                                                onChange={e => setPacienteNombre(e.target.value)}
                                            />
                                        </div>

                                        {/* Apellido */}
                                        <div className='col-lg-4 col-md-6 mb-2'>
                                            <label htmlFor='apellido'>Apellido</label>
                                                
                                            <input
                                                className='form-control'
                                                type='text'
                                                name='apellido'
                                                placeholder='Apellido'
                                                aria-label='Apellido'
                                                value={pacienteApellido}
                                                onChange={e => setPacienteApellido(e.target.value)}
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className='col-lg-4 col-md-6 mb-2'>
                                            <label htmlFor='email'>Email</label>
                                                
                                            <input
                                                className='form-control'
                                                type='email'
                                                name='email'
                                                placeholder='Email'
                                                aria-label='Email'
                                                value={pacienteEmail}
                                                onChange={e => setPacienteEmail(e.target.value)}
                                            />
                                        </div>

                                        {/* Fecha de Nacimiento */}
                                        <div className='col-lg-4 col-md-6 mb-2'>
                                            <label htmlFor='fecha_nacimiento'>Fecha de Nacimiento</label>
                                                
                                            <input
                                                className='form-control'
                                                type='date'
                                                name='fecha_nacimiento'
                                                placeholder='Fecha de Nacimiento'
                                                aria-label='Fecha de Nacimiento'
                                                value={parsedFechaNacimiento}
                                                onChange={(e) => setPacienteFechaNacimiento(e.target.value)}
                                            />
                                        </div>

                                        {/* Genero */}
                                        <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                            <label htmlFor='genero'>Genero</label>

                                            <select
                                                className='form-control'
                                                name='genero'
                                                value={pacienteGenero}
                                                onChange={e => setPacienteGenero(e.target.value)}
                                            >
                                                <option value='' disabled>Seleccione una opción</option>
                                                <option value='Femenino'>Femenino</option>
                                                <option value='Masculino'>Masculino</option>
                                                <option value='No Binario'>No Binario</option>
                                                <option value='No especifica'>No especifica</option>
                                            </select>

                                            <span className='custom-arrow position-absolute h-100'></span>
                                        </div>

                                        {/* DNI */}
                                        <div className='col-lg-4 col-md-6 mb-2'>
                                            <label htmlFor='dni'>DNI</label>
                                                
                                            <input
                                                className='form-control'
                                                type='dni'
                                                name='dni'
                                                placeholder='DNI'
                                                aria-label='DNI'
                                                value={pacienteDni}
                                                onChange={e => setPacienteDni(e.target.value)}
                                            />
                                        </div>

                                        {/* Telefono */}
                                        <div className='col-lg-4 col-md-6 mb-2'>
                                            <label htmlFor='telefono'>Telefono</label>
                                                
                                            <input
                                                className='form-control'
                                                type='telefono'
                                                name='telefono'
                                                placeholder='Telefono'
                                                aria-label='Telefono'
                                                value={pacienteTelefono}
                                                onChange={e => setPacienteTelefono(e.target.value)}
                                            />
                                        </div> 

                                        {/* Obra Social */}
                                        <div className='col-lg-4 col-md-6 mb-2 position-relative'>
                                            <label htmlFor='obraSocial'>Obra Social</label>

                                            <select
                                                className='form-control'
                                                name='obraSocial'
                                                value={pacienteObraSocial}
                                                onChange={e => setPacienteObraSocial(e.target.value)}
                                            >
                                                {obrasSociales && obrasSociales.map((obraSocial, index) => {
                                                    if (obraSocial.text === pacienteObraSocial) {
                                                        return <option value={obraSocial.value} selected key={index}>{obraSocial.text}</option>
                                                    } else {
                                                        return <option value={obraSocial.value} key={index}>{obraSocial.text}</option>
                                                    }
                                                })}
                                            </select>

                                            <span className='custom-arrow position-absolute h-100'></span>
                                        </div>

                                        {/* Numero Obra Social */}
                                        <div className='col-lg-4 col-md-6 mb-2'>
                                            <label htmlFor='numero_obra_social'>Numero de Obra Social</label>
                                                
                                            <input
                                                className='form-control'
                                                type='numero_obra_social'
                                                name='numero_obra_social'
                                                placeholder='Numero de Obra Social'
                                                aria-label='Numero de Obra Social'
                                                value={pacienteNumeroObraSocial}
                                                onChange={e => setPacienteNumeroObraSocial(e.target.value)}
                                            />
                                        </div>
                                    </form>

                                    <button
                                        className='btn bg-primary text-white box-shadow-dark w-50 mb-3'
                                        onClick={updatePaciente}
                                    >
                                        Guardar cambios
                                    </button>

                                    <button
                                        id='closeModalEdit'
                                        className='btn btn-secondary box-shadow-dark w-50'
                                        data-bs-dismiss='modal'
                                    >
                                        Cerrar
                                    </button>
                                </div>

                                {/* Historia Clinica */}
                                <div id='historiaClinica' className='d-flex flex-column bg-white position-relative p-4 w-100 z-index-1'>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        {/* Antecedentes & Alergias */}
                                        <div className='mb-2'>
                                            <div className='d-flex'>
                                                <h5 className='me-1'>Antecedentes: </h5>

                                                <span>{pacienteAntecedentes ? pacienteAntecedentes : 'Ninguno'}</span>
                                            </div>

                                            <div className='d-flex'>
                                                <h5 className='me-1'>Alergias: </h5>

                                                <span>{pacienteAlergias ? pacienteAlergias : 'Ninguna'}</span>
                                            </div>
                                        </div>

                                        {/* Botones */}
                                        <div className="d-flex justify-content-center">
                                            {/* Botón de nuevo registro */}
                                            <div className='mb-2'>
                                                <button
                                                    className='btn bg-white text-primary border-primary box-shadow-dark-1 px-3 me-2'
                                                    onClick={openModalNewHistoriaClinica}
                                                >
                                                    
                                                    <FontAwesomeIcon
                                                        className='text-primary me-2'
                                                        icon={faPlus}
                                                    />

                                                    Nuevo registro
                                                </button>
                                            </div>

                                            {/* Botón de descarga */}
                                            <div className='mb-2'>
                                                {/* <button className='btn bg-white text-primary border-primary box-shadow-dark-1 px-3' onClick={downloadHistoriaClinica}>   */}
                                                <button className='btn bg-white text-primary border-primary box-shadow-dark-1 px-3'>  
                                                    <FontAwesomeIcon
                                                        className='text-primary me-2'
                                                        icon={faDownload}
                                                    />
                                                    Descargar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Historia clínica */}
                                    {
                                        historiaClinica.length === 0 
                                        ? <div className='d-flex justify-content-center align-items-center mt-4'>
                                            <h5 className='text-center'>No hay datos cargados</h5>
                                        </div>
                                        : <div id='historiaClinicaContainer' className='d-flex flex-column height-100'>  
                                            {
                                                historiaClinica.map((historia, index) => {
                                                    return (
                                                        <div className='d-flex justify-content-between align-items-center item' key={index}>
                                                            <div className='py-2'>
                                                                <p className='text-left mb-0'><span className='fw-bold'>Fecha:</span> {historia.fecha}</p>
                                                                <p className='text-left mb-0'><span className='fw-bold'>Medico:</span> {historia.apellido}, {historia.nombre}</p>
                                                                <p className='text-left mb-0'><span className='fw-bold'>Motivo de consulta:</span> {historia.motivo_consulta}</p>
                                                                <p className='text-left mb-0'><span className='fw-bold'>Diagnóstico del profesional:</span> {historia.diagnostico}</p>
                                                            </div>

                                                            <div className='d-flex justify-content-center align-items-center'>
                                                                <FontAwesomeIcon
                                                                    className='text-secondary me-4'
                                                                    icon={faPencil}
                                                                />

                                                                <FontAwesomeIcon
                                                                    className='text-secondary me-2'
                                                                    icon={faTrash}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NuevaHistoriaClinica />
        </div>
    )
}

export default EditarPaciente