import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'

import ConfirmCard from '@Components/ConfirmCard'
import { deleteFaculty, getFaculty } from '@Services/faculty.admin'

const DeleteFacultyPage  = () => {
    const [faculty, setFaculty] = useState(undefined)
    const { id } = useParams()

    const navigate = useNavigate()

    const initFaculty = async () => {
        const data = await getFaculty(id)
        setFaculty(data)
    }

    const goBack = () => navigate(-1)

    const deleteFacultyCallback = () => {
        deleteFaculty(id).then(() => {
            goBack()
        })
    }

    useEffect(() => {
        initFaculty()
    }, [id])

    if (!faculty) return <></>

    return (
        <div className='DeleteFacultyPage py-3 px-5'>
            <h2 className='mb-3'>Supprimer filière</h2>

            <div className='card mb-4'>
                <div className='card-body'>
                    <p>Nom : <strong>{faculty.name}</strong></p>
                    <p>Departement : <strong>{faculty.departement?.name}</strong></p>
                </div>
            </div>

            <ConfirmCard 
                msg={<>Voulez-vous vraiment supprimer la filière <strong>{faculty?.name}</strong>?</>}
                confirmBtn='Confimer'
                returnBtn='Revenir'
                confirmCallback={deleteFacultyCallback}
            />
        </div>
    )
}

export default DeleteFacultyPage 