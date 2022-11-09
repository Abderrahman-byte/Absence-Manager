import React from 'react'

import GenericForm from '@Components/GenericForm'
import { accountFields } from '@Utils/forms' 
import { useNavigate } from 'react-router'
import { postAccount } from '@Services/accounts.admin'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const CreateAccountPage = () => {
    const navigate = useNavigate()

    const createAccount = async (formData, setMessages, setErrors) => {
        const [response, errors] = await postAccount(formData) 

        if (!response && !errors) {
            setErrors([DEFAULT_ERROR_MSG])
        } else if (!response) {
            setErrors(apiErrorsToFormErrors(accountFields, errors))
        } else {
            navigate(`/accounts/edit/${response.id}`)
        }
    }

    return (
        <div className='CreateAccountPage'>
            <h3 className='text-center mb-4'>Créer Compte</h3>
            
            <div className='card mx-auto' style={{ width: '700px'}}>
                <div className='card-body'>
                    <GenericForm
                        fields={accountFields}
                        btnLabel='Créer'
                        submitCallback={createAccount}
                    />
                </div>
            </div>
        </div>
    )
}
export default CreateAccountPage