import { React } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Filters from './Filters/Filters';
import Pagination from './Pagination/Pagination';
import './style.css';

function Table({ lastShowPerPage, lastPage, page, setPage, setSearchInput, setShowPerPage, setItemToEdit, setItemToDelete, showPerPage, tableHeads, tableKeys, totalItems, items }) {
    // Parse the DNI.
    const parseDni = (dni) => {
        if (dni > 999999) {
            return dni.substring(0, dni.length - 6) + '.' + dni.substring(dni.length - 6, dni.length - 3) + '.' + dni.substring(dni.length - 3, dni.length); 
        }
    }
    
    return (
        <div id='table'>
            <Filters 
                setShowPerPage={setShowPerPage}
                setSearchInput={setSearchInput}
            />

            <table className='table table-striped bg-white border box-shadow-dark mt-3 mb-0'>
                <thead>
                    <tr>
                        {tableHeads && tableHeads.map((tableHead, index) => {
                            return (
                                <th key={index}>
                                    <span>{tableHead}</span>
                                </th>
                            )
                        })}
                    </tr>
                </thead>

                <tbody>
                    {items && items.map((item, index) => {
                        if (index < lastShowPerPage) {
                            return (
                                <tr key={index}>
                                    <td>{(index + 1) + ((lastPage - 1) * showPerPage)}</td>
                                    {tableKeys && tableKeys.map((tableKey, index) => {
                                        return (
                                            <td key={index}>
                                                {tableKey.includes('+') ?
                                                    item[tableKey.split('+')[0]] + ', ' + item[tableKey.split('+')[1]] :
                                                    tableKey === 'dni' ? parseDni(item[tableKey]) : item[tableKey]
                                                }
                                            </td>
                                        )
                                    })}
                                    
                                    {
                                        tableHeads[tableHeads.length - 1] === 'Acciones'
                                        ? <td>
                                            <FontAwesomeIcon
                                                className='edit-item me-3'
                                                icon={faPencil}
                                                data-bs-toggle='modal'
                                                data-bs-target={'#modalEdit'}
                                                onClick={() => setItemToEdit(item.id)}
                                            />
    
                                        {
                                            setItemToDelete &&
                                            <FontAwesomeIcon
                                                className='delete-item'
                                                icon={faTrashAlt}
                                                data-bs-toggle='modal'
                                                data-bs-target={'#modalDelete'}
                                                onClick={() => setItemToDelete(item.id)}
                                            />
                                        }
                                        </td>
                                        : <></>
                                    }
                                </tr>
                            )
                        } else {
                            return null;
                        }
                    })}
                </tbody>
            </table>

            {items === undefined && 
                <div className='d-flex flex-column bg-white border box-shadow-dark text-center p-2'>
                    <FontAwesomeIcon
                        className='text-warning mb-2 fa-2x'
                        icon={faCircleExclamation}
                    />

                    <h6 className='mb-0'>No hay usuarios que coincidan con la búsqueda</h6>
                </div>
            }

            {totalItems > showPerPage ? 
                (    
                    <Pagination
                        totalItems={totalItems}
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