// Utilities.
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

// Components.
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Table from '../../components/Table/Table';
import Alert from '../../components/Alert/Alert';
import loadingGif from '../../components/assets/img/loadingGif.gif';
import EditarTurno from './EditarTurno';

function MisTurnos() {
    // Pagination.
    const [lastShowPerPage, setLastShowPerPage] = useState(10);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [showPerPage, setShowPerPage] = useState(10);
    const [totalTurnos, setTotalTurnos] = useState(0);
    const [turnosPasados, setTurnosPasados] = useState([]);
    const [turnosFuturos, setTurnosFuturos] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);

    // Turnos.
    const [turnoToEdit, setTurnoToEdit] = useState(null);
    
    // Turno information.
    const [turnoMedico, setTurnoMedico] = useState('');
    const [turnoFecha, setTurnoFecha] = useState('');
    const [turnoHora, setTurnoHora] = useState('');
    const [turnoEstado, setTurnoEstado] = useState('');

    // User.
    const [idUser, setIdUser] = useState(null);

    // Alert. 
    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    
	useEffect(() => {
        // Get the user from LocalStorage.
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            // Get the user role.
            setIdUser(user.id);
        }
    }, []);


    // Search 'Turnos' when 'page' changes (delay 0s).
    useEffect(() => {
        if (idUser !== null) {
            searchTurnos();
        }
    }, [page, idUser]);


    // Search 'Turnos' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        if (idUser !== null) {
            searchTurnos();
        }
    }, [showPerPage, idUser]);


    // Get 'Turno' by ID and complete 'turnoToEdit' state.
    useEffect(() => {
        // If 'turnoToEdit' is null, do nothing.
        if (turnoToEdit !== null) {
            // Show spinner.
            setShowSpinner(true);

            // Loop trough 'turnos' state to find the 'turnoToEdit' ID.
            turnosFuturos.forEach(turno => {
                if (turno.id === turnoToEdit) {
                    // Hide spinner.
                    setShowSpinner(false);

                    // Complete 'turnoToEdit' state.
                    setTurnoFecha(turno.dia);
                    setTurnoHora(turno.hora);
                    setTurnoEstado(turno.estado);
                    setTurnoMedico(turno.medico_apellido + ', ' + turno.medico_nombre);
                }
            });
        }
    }, [turnoToEdit]);


    /**
     * Function searchTurnos - Makes the search of all active 'Turnos'.
     *
     * @return {void}
     */
    const searchTurnos = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'turnos/paciente/' + idUser,
            type: 'GET',
            dataType: 'json',
            data: {
                'page': page,
                'pagination': showPerPage,
                'search': searchInput,
            },
            success: function (response) {
                // Scroll to top.
                window.scrollTo(0, 0);

                // Hide spinner.
                setShowSpinner(false);

                setLastShowPerPage(showPerPage);
                setLastPage(page);
                setTotalTurnos(response.turnos_count);
                setTurnosPasados(response.turnos_pasados);
                setTurnosFuturos(response.turnos_futuros);
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    /**
     * Function updateTurno - Makes the update of a 'Turno'.
     *
     * @return {void}
     */
    const updateTurno = () => {
        // Show spinner.
        setShowSpinner(true);

        $.ajax({
            url: process.env.REACT_APP_API_ROOT + 'turnos/' + turnoToEdit,
            type: 'PUT',
            dataType: 'json',
            data: {
                'estado': turnoEstado,
            },
            success: function (response) {
                // Hide spinner.
                setShowSpinner(false);

                if (response.success) {
                    // Set Alert state.
                    setAlertType('success');
                } else {
                    // Set Alert state.
                    setAlertType('danger');
                }
                
                setAlertMessage(response.message);
                setShowAlert(true);

                // Close modal.
                $('#modalEdit #closeModalEdit').click();
            },
            error: function (error) {
                // Hide spinner.
                setShowSpinner(false);
            }
        });
    }


    // Render the 'MisTurnos' page.
    return (
        <div id='misTurnos'>
            <Navbar />

            <div className='d-flex bg-lightgray min-height'>
                <div className='container p-4'>
                    <div className='position-relative'>
                        <Link
                            className='btn border border-primary text-primary text-uppercase box-shadow-dark-1 px-3 mt-1 cursor-pointer position-absolute top-0 left-0'
                            to='/panel-usuario/'
                        >
                            <FontAwesomeIcon
                                className='me-2'
                                icon={faArrowLeft}
                            />
                            Volver atrás
                        </Link>

                        <h1 className='text-center mt-2 mb-8'>Mis Turnos reservados</h1>

                        <div className='position-absolute' style={{width: '40px', bottom: '-2rem', left: 'calc((100% - 40px) / 2)'}}>
                            {showSpinner && <img src={loadingGif} alt='Espera a que termine de cargar' height='20px'/>}
                        </div>
                    </div>

                    {showAlert ? 
                        <Alert
                            type={alertType}
                            message={alertMessage}
                        />
                            
                        : null
                    }

                    <h3 className='text-center mt-6'>Turnos Futuros</h3>

                    <div id='table'>
                        <table className='table table-striped bg-white border box-shadow-dark mt-3 mb-0'>
                            <thead>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>Fecha y Hora</th>
                                    <th scope='col'>Estado</th>
                                    <th scope='col'>Medico</th>
                                    <th scope='col'>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {turnosFuturos.map((turno, index) => (
                                    <tr key={index}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{turno.dia} {turno.hora}</td>
                                        <td>{turno.estado}</td>
                                        <td>{turno.medico_apellido}, {turno.medico_nombre}</td>
                                        <td>
                                            <FontAwesomeIcon
                                                className='edit-item me-3'
                                                icon={faPencil}
                                                data-bs-toggle='modal'
                                                data-bs-target={'#modalEdit'}
                                                onClick={() => setTurnoToEdit(turno.id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <h3 className='text-center mt-6'>Turnos Antiguos</h3>

                    <Table
                        lastShowPerPage={lastShowPerPage}
                        lastPage={lastPage}
                        page={page}
                        setPage={setPage}
                        setSearchInput={setSearchInput}
                        setShowPerPage={setShowPerPage}
                        setItemToEdit={setTurnoToEdit}
                        showPerPage={showPerPage}  
                        tableHeads={['#', 'Fecha y Hora', 'Estado', 'Medico']}
                        tableKeys={['dia+hora', 'estado', 'medico_apellido+medico_nombre']}
                        totalItems={totalTurnos}
                        items={turnosPasados}
                    />
                </div>
            </div>

            <Footer />

            <EditarTurno
                turnoFecha={turnoFecha}
                turnoHora={turnoHora}
                turnoEstado={turnoEstado}
                turnoMedico={turnoMedico}
                setTurnoEstado={setTurnoEstado}
                updateTurno={updateTurno}
            />
        </div>
    )
}

export default MisTurnos