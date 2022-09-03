import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button( { type, text, icon } ) {
	let classes = '';

	if (type === 'primary') {
		classes = 'bg-primary text-white';
	} else if (type === 'secondary') {
		classes = 'bg-white text-primary border-primary';
	}

    return (
        <button className={'btn ' + classes}>
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