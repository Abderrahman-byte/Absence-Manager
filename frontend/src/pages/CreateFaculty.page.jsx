import React from 'react'

import GenericForm from '@Components/GenericForm'
import { facultyFields } from '@Utils/forms'
import { apiErrorsToFormErrors } from '@Utils/generic'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { useNavigate } from 'react-router'
import { postFaculty } from '@Services/faculty.admin'

const CreateFacultyPage = () => {
    const navigate = useNavigate()

    const createFaculty = async (formData, setMessages, setErrors) => {
        const data = Object.assign({}, {...formData})
        data.departement_id = formData?.departement?.id || null

        const [response, errors] = await postFaculty(data)

        if (!response && !errors) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors(apiErrorsToFormErrors(facultyFields, errors))

        navigate(`/faculty/edit/${response?.id}`)
    }

    return (
        <div className='DepartementsPage'>
            <h3 className='mb-5 text-center'>Ajouter filière</h3>
            <div className='card mx-auto' style={{ width: '700px'}}>
                <div className='card-body'>
                    <GenericForm 
                        fields={facultyFields} 
                        submitCallback={createFaculty}
                        btnLabel='Creer' />
                </div>
            </div>
        </div>
    )
}
export default CreateFacultyPage