import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function Filters( { setShowPerPage, setSearchInput } ) {
    return (
        <div id='filters'>
            <div className='d-flex justify-content-between'>
                <div className='d-flex w-100'>
                    <div
                        id='showPerPageContainer'
                        className='d-flex align-items-end'
                    >
                        <label htmlFor=''>Mostar</label>

                        <div className='custom-select position-relative mx-2'>
                            <select
                                className='bg-white text-dark'
                                onChange={(e) => setShowPerPage(e.target.value)}
                            >
                                <option value='10'>10</option>
                                <option value='25'>25</option>
                                <option value='50'>50</option>
                                <option value='100'>100</option>
                                <option value='250'>250</option>
                                <option value='500'>500</option>
                            </select>
                            <span className='custom-arrow position-absolute h-100'></span>
                        </div>

                        <label htmlFor=''> por pagina</label>
                    </div>

                    {/* Fecha de creacion */}
                    {/* Fecha desde hasta */}
                    {/* Obra social con la que trabaja */}
                    {/* Genero */}
                    {/* Edad */}
                </div>

                <div id='searchContainer' className='position-relative w-25'>
                    <input
                        className='bg-white box-shadow-dark-1 w-100'
                        type='text'
                        placeholder='Escribe para buscar...'
                        onChange={(e) => setSearchInput(e.target.value)}
                    />

                    <FontAwesomeIcon
                        className='position-absolute'
                        icon={faMagnifyingGlass}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filters