import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Input( { id, type, name, placeholder, value, onChange, icon } ) {
    return (
        <div className='icon-component form-floating w-100 mx-auto position-relative box-shadow-dark'>
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

            {icon && <FontAwesomeIcon className='text-primary' icon={icon} />}
        </div>
    )
}

export default Input