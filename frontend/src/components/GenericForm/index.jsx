import React, { useMemo, useState } from 'react'

import { validateForm } from '@Utils/forms'
import GenericField from './GenericField'

const GenericForm = ( { fields, initValues = {}, btnLabel, submitCallback } ) => {
    const [formData, setFormData] = useState(() => {
        if (initValues) return Object.assign({}, {...initValues})
        return {}
    })

    const [errors, setErrors] = useState([])
    const [messages, setMessages] = useState([])

    const setInputValue = (name, value) => {
        const data = {...formData}
        data[name] = value
        setFormData(data)
    }

    const onSubmitCallback = (e) => {
        e.preventDefault()

        setErrors([])
        setMessages([])

        const formErrors = validateForm(fields,formData)
        
        if (formErrors.length > 0) return setErrors([...formErrors])

        if (typeof submitCallback !== 'function') return

        submitCallback(formData, setMessages, setErrors)
    }

    const globalErrors = useMemo(() => {
        return errors.filter(err => typeof err === 'string' || !err.field)
    }, [errors])

    return (
        <form onSubmit={onSubmitCallback} className='GenericForm form'>
            {fields.map((field, i) => <GenericField 
                key={i} 
                errors={errors.filter(err => err.field === field.name)}
                value={formData[field.name]} 
                setValue={setInputValue} 
                {...field} 
            />)}

            {globalErrors.map((error, i) => <div key={i} className='alert alert-danger'>
                <p className='m-0'>{typeof error === 'string' ? error : error.message} </p>
            </div>)}

            {messages.map((msg, i) => <div key={i} className='alert alert-success'>
                <p className='m-0'>{msg}</p>
            </div>)}

            <button type='submit' className='btn btn-primary'>
                {btnLabel || 'Submit'}
            </button>
        </form>
    )
}

export default GenericForm 