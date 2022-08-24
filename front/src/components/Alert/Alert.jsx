import React from 'react';
import './style.css';

function Alert( { type, message } ) {
    return (
        <div className={`alert bg-light border p-1 px-3 mb-2 border-left-` + type }>
            <p className='mb-0'>{message}</p>
        </div>
    )
}

export default Alert