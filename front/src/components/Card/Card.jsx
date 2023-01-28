import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Card({ title, text, icon }) {
    // Render the 'Card' component
    return (
        <div className='custom-card bg-white text-center border-primary box-shadow-dark rounded overflow-hidden p-5 mt-4 w-100'>
            <div className='triangle position-absolute'></div>
            
            <div className='icon-container position-absolute'>
                <FontAwesomeIcon className='text-white fa-2x' icon={icon} />
            </div>
            
            <h5 className='text-primary mb-3'>{title}</h5>

            <p className='text-dark mb-0'>{text}</p>
        </div>
    )
}

export default Card