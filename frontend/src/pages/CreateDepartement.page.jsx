import React from 'react'

import GenericForm from '@Components/GenericForm'
import { departementFields } from '@Utils/forms'
import { useNavigate } from 'react-router'
import { postDepartement } from '@Services/departements.admin'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const CreateDepartementPage = () => {
    const navigate = useNavigate()

    const createDepartement = async (formData, setMessages, setErrors) => {
        const depData = Object.assign({}, {...formData})
        depData.head_of_departement_id = formData?.head_of_departement?.id || null
        const [response, errors] = await postDepartement(depData) 

        if (!response && !errors) {
            setErrors([DEFAULT_ERROR_MSG])
        } else if (!response) {
            setErrors(apiErrorsToFormErrors(departementFields, errors))
        } else {
            navigate(`/departements/edit/${response.id}`)
        }
    }

    return (
        <div className='DepartementsPage'>
            <h3 className='mb-5 text-center'>Ajouter departement</h3>
            <div className='card mx-auto' style={{ width: '700px'}}>
                <div className='card-body'>
                    <GenericForm 
                        submitCallback={createDepartement}
                        fields={departementFields} 
                        btnLabel='Creer' />
                </div>
            </div>
        </div>
    )
}

export default CreateDepartementPage