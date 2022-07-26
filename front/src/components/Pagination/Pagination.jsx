import React from 'react';
import './style.css';

function Pagination({ totalUsers, showPerPage, page, setPage }) {
    // Get total pages.
    const pages = Math.ceil(totalUsers / showPerPage);

    console.log('pages: ', pages);
    console.log('page: ', page);
    console.log('totalUsers: ', totalUsers);

    



    return (
        <div id='pagination' className='d-flex justify-content-end mt-4'>
            {page > 1 && (
                <>
                    <span className='pagination-item pagination-prev d-flex justify-content-center align-items-center bg-white border border-end-0'>&lt; Anterior</span>

                    <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0 active'>1</span>
                </>
            )}

            {page > 2 && (
                <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>...</span>
            )}

            
            <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>2</span>

            <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>3</span>

            <span className='pagination-item d-flex justify-content-center align-items-center bg-white border border-end-0'>...</span>

            {page < pages && (
                <span className='pagination-item pagination-next d-flex justify-content-center align-items-center bg-white border'>Siguiente &gt;</span>
            )}
        </div>
    )
}

export default Pagination