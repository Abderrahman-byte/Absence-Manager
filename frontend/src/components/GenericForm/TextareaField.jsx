import React from 'react'

const TextareaField = ({label, placeholder, name, value, setValue, className='', required=false, errors }) => {
    return (
        <div className={`mb-3 ${className || ''}`}>
            {label ? (
                <label htmlFor={`${name}-input`} className="form-label">{label}</label>
            ) : null}

            <textarea 
                id={`${name}-input`} 
                className='form-control' 
                value={value} 
                onChange={e => setValue(name, e.target.value)} 
                placeholder={placeholder}
                required={required}
            />

            {errors.map((error, i) => <div key={i} id={`${name}Help`} className="form-text text-danger">{error.message}</div>)}
        </div>        
    )
}

export default TextareaField