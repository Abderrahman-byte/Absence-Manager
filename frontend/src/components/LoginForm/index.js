import React, { useState } from 'react'

import { login } from '@Services/authentication'
import { DEFAULT_ERROR_MSG, JWT_TOKEN_KEY } from '@Utils/env'

import './styles.css'

// ! add form validation

const LoginForm = () => {
    const [data, setData] = useState({email: '', password: ''})
    const [errors, setErrors] = useState([])

    const fieldChanged = (e) => {
        const {name, value} = e.target
        const newData = {...data}

        newData[name] = value

        setData(newData)
    }

    const submitForm = async (e) => {
        e.preventDefault()

        setErrors([])

        const [response, error] = await login(data.email, data.password)

        if (!response && !error) setErrors([DEFAULT_ERROR_MSG])
        else if (!response) setErrors([error?.detail || DEFAULT_ERROR_MSG])
        else {
            localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify(response))
        }
    }

    return (
        <form onSubmit={submitForm} className='LoginForm form card pb-4 mx-auto'>
            <div className='card-body'>
                <h2 className="card-title mb-4 text-center">Bienvenue!</h2>
                <div className='mb-4'>
                    <input 
                        type='email' 
                        name='email' 
                        id='email-input-elt' 
                        className='form-control' 
                        onChange={fieldChanged} 
                        value={data.email} 
                        placeholder='Address email'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <input 
                        type='password' 
                        name='password' 
                        className='form-control' 
                        id='password-input-elt' 
                        onChange={fieldChanged} 
                        value={data.password} 
                        placeholder='Mot de passe'
                        required
                    />
                </div>

                {errors.length > 0 ? (
                    <div className='errors'>
                        <div className='alert alert-danger'>
                            {errors.map(err => <p>{err}</p>)}
                        </div>
                    </div>
                ) : null}
                <button className='btn btn-success d-block submit-btn' type='submit'>Connexion</button>
            </div>
        </form>
    )
}

export default LoginForm