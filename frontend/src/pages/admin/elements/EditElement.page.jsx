import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router'

import GenericForm from '@Components/GenericForm'
import { getElement, updateElement } from '@Services/elements.admin'
import { elementFields } from '@Utils/forms'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const EditElementPage = () => {
	const { id } = useParams()
	const [element, setElement] = useState(undefined)

	const initElement = async () => {
        const data = await getElement(id)
        setElement(data)
    }

    const saveElement = async (formData, setMessages, setErrors) => {
        const data = Object.assign({}, {
            ...formData,
            professor_id: formData?.professor?.id,
            module_id: formData?.module?.id
        })

        const [response, errors] = await updateElement(id, data)
        
        if (!response && !errors) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors(apiErrorsToFormErrors(elementFields, errors))

        setMessages(['Element a été enregistré avec succès.'])
        setTimeout(() => setMessages([]), 1500)
    }

    const elementData = useMemo(() => {
        return Object.assign({}, {
            name: element?.name,
            description: element?.description,
            professor: {
                id: element?.professor?.id,
                name: `${element?.professor?.last_name || ''} ${element?.professor?.first_name || ''}`
            }, module: {
                id: element?.module?.id,
                name: `${element?.module?.faculty?.short_name || element?.module?.faculty?.name} : ${element?.module?.name}`
            }
        })
    }, [element])

	useEffect(() => {
		initElement()
	}, [id])

	if (!element) return <></>

	return (
		<div className='EditElementPage'>
			<h3 className='mb-4 text-center'>Modifier un element</h3>

			<div className='card form-card mx-auto'>
				<div className='card-body'>
                    <GenericForm 
                        submitCallback={saveElement}
                        initValues={elementData}
                        fields={elementFields}
                        btnLabel='Enregister'
                    />
                </div>
			</div>
		</div>
	)
}

export default EditElementPage
