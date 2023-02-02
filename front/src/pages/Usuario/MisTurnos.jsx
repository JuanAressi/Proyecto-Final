// Utilities.
import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

// Components.
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Table from '../../components/Table/Table';
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
    const [turnos, setTurnos] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);

    // Turnos.
    const [turnoToEdit, setTurnoToEdit] = useState(null);
    
    // Turno information.
    const [turnoMedico, setTurnoMedico] = useState('');
    const [turnoFecha, setTurnoFecha] = useState('');
    const [turnoHora, setTurnoHora] = useState('');
    const [turnoEstado, setTurnoEstado] = useState('');

    // User.
    const [idUser, setIdUser] = useState(0);

    
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
        searchTurnos();
    }, [page]);


    // Search 'Turnos' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        searchTurnos();
    }, [showPerPage]);


    // Get 'Turno' by ID and complete 'turnoToEdit' state.
    useEffect(() => {
        // If 'turnoToEdit' is null, do nothing.
        if (turnoToEdit !== null) {
            // Show spinner.
            setShowSpinner(true);

            // Loop trough 'turnos' state to find the 'turnoToEdit' ID.
            turnos.forEach(turno => {
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

        console.log('idUser: ', idUser);

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
                setTurnos(response.turnos);
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

                    <Table
                        lastShowPerPage={lastShowPerPage}
                        lastPage={lastPage}
                        page={page}
                        setPage={setPage}
                        setSearchInput={setSearchInput}
                        setShowPerPage={setShowPerPage}
                        setItemToEdit={setTurnoToEdit}
                        showPerPage={showPerPage}  
                        tableHeads={['#', 'Fecha y Hora', 'Estado', 'Medico', 'Acciones']}
                        tableKeys={['dia+hora', 'estado', 'medico_apellido+medico_nombre']}
                        totalItems={totalTurnos}
                        items={turnos}
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
                // updateTurno={updateTurno}
            />
        </div>
    )
}

export default MisTurnos