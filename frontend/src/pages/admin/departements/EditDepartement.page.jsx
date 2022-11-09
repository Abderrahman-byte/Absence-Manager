import React, { useEffect, useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'

import GenericForm from '@Components/GenericForm'
import { getDepartement, updateDepartement } from '@Services/departements.admin'
import { departementFields } from '@Utils/forms'
import { DEFAULT_ERROR_MSG } from '@Utils/env'
import { apiErrorsToFormErrors } from '@Utils/generic'

const EditDepartementPage = () => {
    const [departement, setDepartement] = useState(undefined)
    const { id } = useParams()

    const initDepartements = async (id) => {
        const data = await getDepartement(id)
        setDepartement(data)
    }

    const saveDepartement = async (data, setMessages, setErrors) => {
        const depData = Object.assign({}, {...data})
        depData.head_of_departement_id = data?.head_of_departement?.id || null
        const [response, errors] = await updateDepartement(id, depData)

        if (!response && !errors) return setErrors([DEFAULT_ERROR_MSG])
        else if (!response) return setErrors(apiErrorsToFormErrors(departementFields, errors))

        setMessages(['Departement a été enregistré avec succès.'])
        setTimeout(() => setMessages([]), 1500)
    }

    const departementData = useMemo(() => {
        return Object.assign({}, {
            ...departement,
            head_of_departement: {
                id: departement?.head_of_departement?.id,
                name: `${departement?.head_of_departement?.last_name || ''} ${departement?.head_of_departement?.first_name || ''}`
            }
        })
    }, [departement])

    useEffect(() => {
        initDepartements(id)
    }, [id])

    if (!departement) return (<></>)

    return (
        <div className='DepartementsPage'>
            <h3 className='mb-5 text-center'>Modifier departement</h3>
            <div className='card mx-auto' style={{ width: '700px'}}>
                <div className='card-body'>
                    <GenericForm 
                        submitCallback={saveDepartement}
                        initValues={departementData} 
                        fields={departementFields} 
                        btnLabel='Enregistrer' />
                </div>
            </div>
        </div>
    )
}

export default EditDepartementPage