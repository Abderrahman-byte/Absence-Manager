import React from 'react'

const InputField = ({type = 'text', label, placeholder, name, value, setValue, classname='', required=false, errors }) => {
    return (
        <div className={`mb-3 ${classname || ''}`}>
            {label ? (
                <label htmlFor={`${name}-input`} className="form-label">{label}</label>
            ) : null}
            
            <input 
                type={type} 
                className="form-control" 
                id={`${name}-input`} 
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={e => setValue(name, e.target.value)}
            />

            {errors.map((error, i) => <div key={i} id={`${name}Help`} className="form-text text-danger">{error.message}</div>)}
        </div>        
    )
}

export default InputField