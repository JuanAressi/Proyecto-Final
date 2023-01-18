import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css';

function Input( { id, classes, type, name, placeholder, value, onChange, onFocus, icon, options } ) {
    return (
        <div className='icon-component form-floating w-100 mx-auto position-relative overflow-hidden box-shadow-dark-1 border-1'>
            {
                options == null ?
                    <input
                        id={id}
                        className={'form-control border-1 ' + classes}
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onFocus={onFocus}
                        autoComplete='off'
                    />
                :
                    <select
                        id={id}
                        className={'form-select border-1 ' + classes}
                        name={name}
                        value={value}
                        onChange={onChange}
                    >
                        {options.map((option, index) => (
                            <option
                                key={index}
                                value={option.value}
                                selected={index === 0}
                                disabled={index === 0}
                            >
                                {option.text}
                            </option>
                        ))}
                    </select>
            }
            <label htmlFor={id} className='floatingInput'>{placeholder}</label>

            {icon &&
                <FontAwesomeIcon
                    className={classes === 'border-danger' ? 'bg-white text-danger' : classes === 'border-success' ? 'bg-white text-success' : 'bg-white text-primary'}
                    icon={icon}
                />
            }
        </div>
    )
}

export default Input