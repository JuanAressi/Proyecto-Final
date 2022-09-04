import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button( { id, type, text, icon } ) {
	let classes = '';

	if (type === 'primary') {
		classes = 'bg-primary text-white';
	} else if (type === 'secondary') {
		classes = 'bg-white text-primary border-primary';
	}

    return (
        <button
            id={id}
            className={'btn box-shadow-dark-1 ' + classes}
        >
            {icon && 
                <FontAwesomeIcon
                    className='text-primary me-1'
                    icon={icon}
                />
            }
            {text}
        </button>
    )
}

export default Button