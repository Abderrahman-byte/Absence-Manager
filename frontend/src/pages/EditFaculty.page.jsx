import React, { useEffect, useState, useMemo} from 'react'
import { useParams } from 'react-router'

import { getFaculty, updateFaculty } from '@Services/faculty.admin'
import GenericForm from '@Components/GenericForm'
import { facultyFields } from '@Utils/forms'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const EditFacultyPage = () => {
    const [faculty, setFaculty] = useState(undefined)
    const { id } = useParams()

    const initFaculty = async () => {
        const data = await getFaculty(id)
        setFaculty(data)
    }

    const saveFaculty = async (formData, setMessages, setErrors) => {
        const data = Object.assign({}, {...formData})
        data.departement_id = formData?.departement?.id || null

        const [response, errors] = await updateFaculty(id, data)

        if (!response && !errors) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors(apiErrorsToFormErrors(facultyFields, errors))

        setMessages(['Departement a été enregistré avec succès.'])
        setTimeout(() => setMessages([]), 1500)
    }

    useEffect(() => {
        initFaculty()
    }, [id])

    if (!faculty) return <></>

    return (
        <div className='EditFacultyPage'>
            <h3 className='mb-5 text-center'>Modifier Filière</h3>
            <div className='card mx-auto' style={{ width: '700px'}}>
                <div className='card-body'>
                    <GenericForm
                        fields={facultyFields}
                        initValues={faculty}
                        submitCallback={saveFaculty}
                    />
                </div>
            </div>
        </div>
    )
}

export default EditFacultyPage