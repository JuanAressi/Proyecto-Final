import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function Filters( { showPerPage, setShowPerPage } ) {
    return (
        <div id='filters'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex w-100'>
                    <div
                        id='showPerPageContainer'
                        className='d-flex align-items-end'
                    >
                        <label htmlFor=''>Mostar</label>
                        
                        <input
                            className='filter ps-1 mx-2 w-15'
                            type='number'
                            value={showPerPage}
                            min='1'
                            onChange={(e) => setShowPerPage(e.target.value)}
                        />

                        <label htmlFor=''> por pagina</label>
                    </div>

                    {/* Fecha de creacion */}
                    {/* Fecha desde hasta */}
                    {/* Obra social con la que trabaja */}
                    {/* Genero */}
                    {/* Edad */}
                </div>

                <div id='searchContainer' class='input-group w-25'>
                    <input class='form-control' type='search' placeholder='Escribe para buscar...' />

                    <div class='input-group-append'>
                        <span class='input-group-text h-100'>
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filters