import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import GenericForm from '@Components/GenericForm'
import { getAccount, updateAccount } from '@Services/accounts.admin'
import { editAccountFields } from '@Utils/forms'
import { apiErrorsToFromErrors } from '@Utils/generic'
import { DEFAULT_ERROR_MSG } from '@Utils/env'

const EditAccountPage = () => {
    const [account, setAccount] = useState(undefined)

    const { id } = useParams()

    const fetchAccount = async () => {
        const data = await getAccount(id)
        setAccount(data)
    }

    const saveAccount = async (data, setMessages, setErrors) => {
        const [response, errors] = await updateAccount(id, data) 

        if (!response && !errors) {
            setErrors([DEFAULT_ERROR_MSG])
        } else if (!response) {
            setErrors(apiErrorsToFromErrors(editAccountFields, errors))
        } else {
            setMessages(['Le compte a été enregistré avec succès.'])
            setTimeout(() => setMessages([]), 1000)
        }
    }

    useEffect(() => {
        fetchAccount()
    }, [id])

    if (!account) return <></>

    return (
        <div className='EditAccountPage'>
            <h3 className='text-center mb-4'>Modifier Compte</h3>

            <div className='card mx-auto' style={{ width: '700px'}}>
                <div className='card-body'>
                    <GenericForm 
                        fields={editAccountFields} 
                        initValues={{...account}} 
                        btnLabel='Enregistrer'
                        submitCallback={saveAccount}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditAccountPage