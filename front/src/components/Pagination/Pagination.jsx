import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronsLeft ,faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import './style.css';

function Pagination({ totalUsers, showPerPage, page, setPage }) {
    // Get total pages.
    const pages = Math.ceil(totalUsers / showPerPage);

    // Disable left arrow if page is 1.
    let disabledLeft = '';
    if (page === 1) {
        disabledLeft = ' disabled';
    }

    // Disable right arrow if page is last.
    let disabledRight = '';
    if (page === pages) {
        disabledRight = ' disabled';
    }

    // Handle pagination click.
    const handlePaginationClick = (page, isDisabled) => {
        if (isDisabled !== '') {
            setPage(page);
        }
    }


    return (

        <div id='pagination' className='d-flex justify-content-end align-items-center mt-4'>
            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-secondary rounded me-2' + disabledLeft}
                // onClick={() => setPage(1)}
                onClick={() => handlePaginationClick(1, disabledLeft)}
            >
                <FontAwesomeIcon
                    className='text-secondary'
                    icon={faChevronLeft}
                />

                <FontAwesomeIcon
                    className='text-secondary'
                    icon={faChevronLeft}
                />
            </button>

            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-secondary rounded me-2' + disabledLeft}
                // onClick={() => setPage(page - 1)}
                onClick={() => handlePaginationClick(page - 1, disabledLeft)}
            >
                <FontAwesomeIcon
                    className='text-secondary'
                    icon={faChevronLeft}
                />
            </button>

            <span
                className='me-2'>
                {page} de {pages}
            </span>

            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-secondary rounded me-2' + disabledRight}
                // onClick={() => setPage(page + 1)}
                onClick={() => handlePaginationClick(page + 1, disabledRight)}
            >
                <FontAwesomeIcon
                    className='text-secondary'
                    icon={faChevronRight}
                />
            </button>

            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-secondary rounded' + disabledRight }
                // onClick={() => setPage(pages)}
                onClick={() => handlePaginationClick(pages, disabledRight)}
            >
                <FontAwesomeIcon
                    className='text-secondary'
                    icon={faChevronRight}
                />

                <FontAwesomeIcon
                    className='text-secondary'
                    icon={faChevronRight}
                />
            </button>
        </div>
    )
}

export default Pagination