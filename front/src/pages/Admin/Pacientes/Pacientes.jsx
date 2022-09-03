import { React, useEffect, useState } from 'react';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Alert from '../../../components/Alert/Alert';
import Button from '../../../components/Buttons/Button';
import Modal from '../../../components/Modal/Modal';
import SideNav from '../../../components/SideNav/SideNav';
import Filters from '../../../components/Table/Filters/Filters';
import Pagination from '../../../components/Table/Pagination/Pagination';
import loadingGif from '../../../components/assets/img/loadingGif.gif';
import './style.css';
import Table from '../../../components/Table/Table';

function Pacientes() {
    const [lastShowPerPage, setLastShowPerPage] = useState(10);
    const [lastPage, setLastPage] = useState(1);
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showPerPage, setShowPerPage] = useState(10);
    const [showSpinner, setShowSpinner] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [users, setUsers] = useState([]);
    const [userToDelete, setUserToDelete] = useState(null);

    // Search 'Pacientes' when 'page' changes (delay 0s).
    useEffect(() => {
        doSearch();
    }, [page]);

    // Search 'Pacientes' when 'showPerPage' changes (delay 0s).
    useEffect(() => {
        setPage(1);
        
        doSearch();
    }, [showPerPage]);

    // Search 'Pacientes' when 'searchInput' changes (delay 1s).
    useEffect(() => {
        setPage(1);

        const delayDebounce = setTimeout(() => {
            doSearch();
        }, 750);

        return () => clearTimeout(delayDebounce)
    } , [searchInput]);


    // Function search.
    const doSearch = () => {
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/pacientes',
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

                setLastShowPerPage(showPerPage);
                setLastPage(page);
                setShowSpinner(false);
                setTotalUsers(response.pacientes_count);
                setUsers(response.pacientes);
            },
            error: function (error) {
                setShowSpinner(false);
            }
        });
    }


    // Delete a user.
    const deleteUser = () => {
        setShowSpinner(true);

        $.ajax({
            url: 'http://local.misturnos/api/usuarios/' + userToDelete,
            type: 'DELETE',
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    setShowSpinner(false);

                    // Show success message.
                    setShowAlert(true);

                    // Reload the 'Pacientes' table.
                    doSearch();

                    // Empty #alert message after 3 seconds.
                    setTimeout(function () {
                        setShowAlert(false);
                    }, 4000);
                }
            }
        });
    }

    return (
        <div id='pageAdminPacientes' className='d-flex bg-lightgray'>
            <SideNav />

            <div className='container p-5'>
                <div className='d-flex align-items-center mb-4'>
                    <h1 id='pageTitle' className='display-3 text-primary me-4'>Pacientes</h1>

                    <div style={{width: '40px'}}>
                        {showSpinner && <img src={loadingGif} alt="wait until the page loads" height='20px'/>}
                    </div>

                    <Button
                        type='secondary'
                        text='Agregar Paciente'
                        icon={faPlus}
                    />
                </div>

                {showAlert ? 
                    <Alert
                        type='success'
                        message='Se ha eliminado el usuario correctamente.'
                    />
                        
                    : null
                }

                <Table
                    lastShowPerPage={lastShowPerPage}
                    lastPage={lastPage}
                    page={page}
                    setPage={setPage}
                    setSearchInput={setSearchInput}
                    setShowPerPage={setShowPerPage}
                    setUserToDelete={setUserToDelete}
                    showPerPage={showPerPage}  
                    tableHeads={['#', 'Nombre y Apellido', 'Email', 'DNI', 'Acciones']}
                    totalUsers={totalUsers}
                    users={users}
                />
            </div>

            <Modal
                id='modalDelete'
                text='¿Está seguro que desea eliminar este paciente?'
                handleDelete={() => {
                    // Close modal.
                    $('#closeModal').click();

                    // Delete the user.
                    deleteUser();
                }}
            />
        </div>
    )
}

export default Pacientes