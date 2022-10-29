import React from 'react'

import SimpleHeader from '@Components/SimpleHeader'
import LoginForm from '@Components/LoginForm'

const LoginPage = () => {
    return (
        <div className='LoginPage'>
            <SimpleHeader />
            <div className='container py-5'>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginPage