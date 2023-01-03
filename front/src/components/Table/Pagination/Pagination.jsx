import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './style.css';

function Pagination({ totalItems, showPerPage, page, setPage }) {
    // Get total pages.
    const pages = Math.ceil(totalItems / showPerPage);

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
        if (isDisabled === '') {
            setPage(page);
        }
    }


    return (
        <div id='pagination' className='d-flex justify-content-end align-items-center mt-4'>
            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-primary rounded me-1' + disabledLeft}
                onClick={() => {
                    if (page > 1) {
                        handlePaginationClick(1, disabledLeft)
                    }
                }}
            >
                <FontAwesomeIcon
                    className='text-primary'
                    icon={faChevronLeft}
                />

                <FontAwesomeIcon
                    className='text-primary'
                    icon={faChevronLeft}
                />
            </button>

            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-primary rounded me-1' + disabledLeft}
                onClick={() => {
                    if (page > 1) {
                        handlePaginationClick(page - 1, disabledLeft)
                    }
                }}
            >
                <FontAwesomeIcon
                    className='text-primary'
                    icon={faChevronLeft}
                />
            </button>

            <span
                className='me-2'>
                {page} de {pages}
            </span>

            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-primary rounded me-1' + disabledRight}
                onClick={() => {
                    if (page < pages) {
                        handlePaginationClick(page + 1, disabledRight)
                    }
                }}
            >
                <FontAwesomeIcon
                    className='text-primary'
                    icon={faChevronRight}
                />
            </button>

            <button
                className={'pagination-item d-flex justify-content-center align-items-center bg-white border border-primary rounded' + disabledRight }
                onClick={() => {
                    if (page < pages) {
                        handlePaginationClick(pages, disabledRight)
                    }
                }}
            >
                <FontAwesomeIcon
                    className='text-primary'
                    icon={faChevronRight}
                />

                <FontAwesomeIcon
                    className='text-primary'
                    icon={faChevronRight}
                />
            </button>
        </div>
    )
}

export default Pagination