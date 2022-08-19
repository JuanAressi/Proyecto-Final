import React from 'react';
import './style.css';

function Alert( { type, text } ) {
    return (
        <div className={`alert bg-light border p-1 px-3 mb-2 border-left-` + type }>
            <p className='mb-0'>{text}</p>
        </div>
    )
}

export default Alert