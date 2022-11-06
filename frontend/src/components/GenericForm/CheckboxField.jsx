import React from 'react'

const CheckboxField = ({ label, name, value, setValue, classname='', disabled=false }) => {
    return (
        <div className={`mb-3 ${classname || ''}`}>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    checked={value} onChange={e => setValue(name, e.target.checked)} 
                    type="checkbox" 
                    id={`${name}-checkbox`} 
                    disabled={disabled} />
                <label className="form-check-label" htmlFor={`${name}-checkbox`}>{label}</label>
            </div>
        </div>      
    )
}

export default CheckboxField