import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Input( { id, classes, type, name, placeholder, value, onChange, onFocus, icon } ) {
    return (
        <div className='icon-component form-floating w-100 mx-auto position-relative overflow-hidden box-shadow-dark-1'>
            <input
                id={id}
                className={'form-control ' + classes}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
            />

            <label htmlFor='username' className='floatingInput'>{placeholder}</label>

            {icon &&
                <FontAwesomeIcon
                    className={classes === 'border-danger' ? 'text-danger' : classes === 'border-success' ? 'text-success' : 'text-primary'}
                    icon={icon}
                />
            }
        </div>
    )
}

export default Input