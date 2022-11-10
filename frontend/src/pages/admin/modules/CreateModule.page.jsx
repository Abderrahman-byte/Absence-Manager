import React from 'react'

import GenericForm from '@Components/GenericForm'
import { moduleFields } from '@Utils/forms'
import { useNavigate } from 'react-router'
import { postModule } from '@Services/modules.admin'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const CreateModulePage = () => {
    const navigate = useNavigate()

    const createModule = async (formData, setMessages, setErrors) => {
        const data = Object.assign({}, {...formData})
        data.faculty_id = data?.faculty?.id || null
        
        const [response, errors] = await postModule(data)

        if (!response && !errors) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors(apiErrorsToFormErrors(moduleFields, errors))

        navigate(`/modules/edit/${response?.id}`)
    }

    return (
        <div className='CreateModulePage'>
            <h3 className='mb-3 text-center'>Créer un module</h3>
            <div className='card mx-auto' style={{ maxWidth: '700px'}}>
                <div className='card-body'>
                    <GenericForm
                        submitCallback={createModule}
                        btnLabel='Créer'
                        fields={moduleFields}
                    />
                </div>
            </div>
        </div>
    )
}

export default CreateModulePage