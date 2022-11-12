import React from 'react'
import { useNavigate } from 'react-router'

import GenericForm from '@Components/GenericForm'
import { postElement } from '@Services/elements.admin'
import { elementFields } from '@Utils/forms'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const CreateElementPage = () => {
    const navigate = useNavigate()

    const createElement = async (formData, setMessages, setErrors) => {
        const data = Object.assign({}, {
            ...formData,
            professor_id: formData?.professor?.id,
            module_id: formData?.module?.id
        })

        const [response, errors] = await postElement(data)
        
        if (!response && !errors) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors(apiErrorsToFormErrors(elementFields, errors))

        navigate(`/elements/edit/${response?.id}`)
    }

	return (
		<div className='CreateElementPage'>
			<h3 className='mb-4 text-center'>Ajouter element</h3>

			<div className='card form-card mx-auto'>
				<div className='card-body'>
                    <GenericForm 
                        submitCallback={createElement}
                        fields={elementFields}
                        btnLabel='Créer'
                    />
                </div>
			</div>
		</div>
	)
}

export default CreateElementPage
