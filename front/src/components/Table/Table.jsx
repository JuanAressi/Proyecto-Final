import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Filters from './Filters/Filters';
import Pagination from './Pagination/Pagination';
import './style.css';

function Table( { lastShowPerPage, lastPage, page, setPage, setSearchInput, setShowPerPage, setUserToDelete, showPerPage, tableHeads, totalUsers, users } ) {
    return (
        <div id='table'>
            <Filters 
                setShowPerPage={setShowPerPage}
                setSearchInput={setSearchInput}
            />

            <table className='table table-striped bg-white border box-shadow-dark mt-3 mb-0'>
                <thead>
                    <tr>
                        {tableHeads && tableHeads.map( ( tableHead, index ) => {
                            return (
                                <th key={index}>
                                    <span>{tableHead}</span>
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {users !== undefined && users.map((user, index) => {
                        if (index < lastShowPerPage) {
                            return (
                                <tr key={index}>
                                    <td>{(index + 1) + ((lastPage - 1) * showPerPage)}</td>
                                    <td>{user.nombre} {user.apellido}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dni}</td>
                                    <td>
                                        <FontAwesomeIcon
                                            className='text-warning me-3'
                                            icon={faPencil}
                                        />

                                        <FontAwesomeIcon
                                            className='text-danger'
                                            icon={faTrashAlt}
                                            data-bs-toggle='modal'
                                            data-bs-target={'#modalDelete'}
                                            onClick={() => setUserToDelete(user.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
            {users === undefined && 
                <div className='d-flex flex-column bg-white border box-shadow-dark text-center p-2'>
                    <FontAwesomeIcon
                        className='text-warning mb-2 fa-2x'
                        icon={faCircleExclamation}
                    />

                    <h6 className='mb-0'>No hay usuarios que coincidan con la busqueda</h6>
                </div>
            }

            {totalUsers > showPerPage ? 
                (    
                    <Pagination
                        totalUsers={totalUsers}
                        showPerPage={showPerPage}
                        page={page}
                        setPage={setPage}
                    />
                ) : null
            }
        </div>
    )
}

export default Table