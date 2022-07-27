import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronsLeft ,faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import './style.css';

function Pagination({ totalUsers, showPerPage, page, setPage }) {
    // Get total pages.
    const pages = Math.ceil(totalUsers / showPerPage);

    // Show border 0.
    let borderEnd0 = '';
    if (page < pages - 1) {
        borderEnd0 = ' border-end-0';
    }

    return (
        <div id='pagination' className='d-flex justify-content-end mt-4'>
            {page > 1 && (
                <span
                    className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
                    onClick={() => setPage(page - 1)}
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                    />
                </span>
            )}

            {page > 2 && (
                <span
                className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
                onClick={() => setPage(1)}
            >
                1
            </span>
            )}

            {page > 3 && (
                <span
                className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
            >
                ...
            </span>
            )}

            {page > 1 && (
                <span
                    className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
                    onClick={() => setPage(page - 1)}
                >
                    {page - 1}
                </span>
            )}
            

            <span
                className='pagination-item active d-flex justify-content-center align-items-center bg-white border border-end-0'
                onClick={() => setPage(page)}
            >
                {page}
            </span>

            {page < pages -1&& (
                <span
                    className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
                    onClick={() => setPage(page + 1)}
                >
                    {page + 1}
                </span>
            )}

            {page < pages - 2 && (
                <span
                    className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
                >
                    ...
                </span>
            )}

            {page < pages && (
                <span
                    className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
                    onClick={() => setPage(pages)}
                >
                    {pages}
                </span>
            )}

            {page < pages && (
                <span
                    className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'
                    onClick={() => setPage(page + 1)}
                >
                    <FontAwesomeIcon
                        icon={faChevronRight}
                    />
                </span>
            )}
        </div>
    )
}

export default Pagination