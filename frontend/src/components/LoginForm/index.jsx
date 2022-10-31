import React, { useContext, useState } from 'react'

import { login } from '@Services/authentication'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { useLocation, useNavigate } from 'react-router'
import { AuthContext } from '@Context/AuthContext'

import './styles.css'

// ! add form validation

const LoginForm = () => {
    const { authenticate } = useContext(AuthContext)
    const [data, setData] = useState({email: '', password: ''})
    const [errors, setErrors] = useState([])

    const location = useLocation()
    const navigate = useNavigate()

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

        if (!response && !error) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors([error?.detail || DEFAULT_ERROR_MSG])

        authenticate(response)
        navigate(location?.state?.next_url || '/')
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
                            {errors.map((err, i) => <p key={i}>{err}</p>)}
                        </div>
                    </div>
                ) : null}
                <button className='btn btn-success d-block submit-btn' type='submit'>Connexion</button>
            </div>
        </form>
    )
}

export default LoginForm