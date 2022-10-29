import React from 'react'

import './styles.css'

const LoginForm = () => {
    return (
        <form className='LoginForm form card pb-4 mx-auto'>
            <div className='card-body'>
                <h2 className="card-title mb-4 text-center">Bienvenue!</h2>
                <div className='mb-4'>
                    <input type='email' className='form-control' id='email-input-elt' placeholder='Address email'/>
                </div>
                <div className='mb-5'>
                    <input type='password' className='form-control' id='password-input-elt' placeholder='Mot de passe'/>
                </div>
                <button className='btn btn-success d-block submit-btn' type='submit'>Connexion</button>
            </div>
        </form>
    )
}

export default LoginForm