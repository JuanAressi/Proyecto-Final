import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Input({ id, type, name, placeholder, value, onChange, icon, margin }) {
    // Styles.
    const containerStyle = {
        borderRadius: '0.5rem',
        overflow: 'hidden',
		marginBottom: margin,
		maxWidth: '48%',
		width: '48%',
    }

    const iconStyle = {
        position: 'absolute',
        top: 'calc((100% - 20px) / 2)',
        right: '1rem',
        maxHeight: '20px',
        textShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.25)',
    }

    return (
        <div className='icon-component form-floating position-relative col-lg-6 col-md-12 mx-auto box-shadow-dark' style={containerStyle}>
            <input
                id={id}
                className='form-control'
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />

            <label htmlFor='username' className='floatingInput'>{placeholder}</label>

            <FontAwesomeIcon className='text-secondary' icon={icon} style={iconStyle}/>
        </div>
    )
}

export default Input