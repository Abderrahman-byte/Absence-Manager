import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import GenericForm from '@Components/GenericForm'
import { moduleFields } from '@Utils/forms'
import { getModule, updateModule } from '@Services/modules.admin'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const EditModulePage = () => {
    const [module, setModule] = useState(undefined)
    const { id } = useParams()

    const initModule = async () => {
        const data = await getModule(id)
        setModule(data)
    }

    const saveModule = async (formData, setMessages, setErrors) => {
        const data = Object.assign({}, {...formData})
        data.faculty_id = data?.faculty?.id || null
        
        const [response, errors] = await updateModule(id, data)

        if (!response && !errors) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors(apiErrorsToFormErrors(moduleFields, errors))

        setMessages(['Le module a été enregistré avec succès.'])
        setTimeout(() => setMessages([]), 1500)
    }

    useEffect(() => {
        initModule()
    }, [id])

    if (!module) return <></>

    return (
        <div className='EditModulePage'>
            <h3 className='mb-3 text-center'>Modifier Module</h3>

            <div className='card mx-auto' style={{ maxWidth: '700px', width: '90%'}}>
                <div className='card-body'>
                    <GenericForm
                        submitCallback={saveModule}
                        fields={moduleFields}
                        btnLabel='Enregistrer'
                        initValues={module}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditModulePage