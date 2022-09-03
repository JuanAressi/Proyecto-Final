import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Card( {title, text, icon }) {
    return (
        <div className="custom-card col-lg-4 col-md-6 col-sm-12 bg-white text-center border-primary box-shadow-dark rounded overflow-hidden p-5 mx-4 mt-4">
            <div className="triangle position-absolute"></div>
            
            <div className="icon-container position-absolute">
                <FontAwesomeIcon className='text-white fa-2x' icon={icon} />
            </div>
            
            <h5 className="text-primary mb-3">{title}</h5>

            <p className="text-dark mb-0">{text}</p>
        </div>
    )
}

export default Card