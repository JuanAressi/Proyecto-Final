import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Input({ id, type, name, placeholder, value, onChange, icon }) {
    return (
        <div className='icon-component form-floating position-relative col-lg-6 col-md-12 mx-auto w-100 box-shadow-dark'>
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

            <span className='input-icon'>
                <FontAwesomeIcon className='text-secondary' icon={icon}/>
            </span>
        </div>
    )
}

export default Input