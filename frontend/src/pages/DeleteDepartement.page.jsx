import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'

import ConfirmCard from '@Components/ConfirmCard'
import { deleteDepartement, getDepartement } from '@Services/departements.admin'

const DeleteDepartementPage  = () => {
    const [departement, setdepartement] = useState(undefined)

    const { id } = useParams()
    const navigate = useNavigate()

    const fetchDepartement = async () => {
        const data = await getDepartement(id)
        setdepartement(data)
    }

    const goBack = () => navigate(-1)

    const deleteDepartementCallback = () => {
        deleteDepartement(id).then(() => {
            goBack()
        })
    }

    useEffect(() => {
        fetchDepartement()
    }, [id])

    if (!departement) return <></>

    return (
        <div className='DeleteDepartementPage py-3 px-5'>
            <h2 className='mb-3'>Supprimer departement</h2>

            <ConfirmCard 
                msg={<>Voulez-vous vraiment supprimer la departement <strong>{departement?.name}</strong>?</>}
                confirmBtn='Confimer'
                returnBtn='Revenir'
                confirmCallback={deleteDepartementCallback}
            />
        </div>
    )
}

export default DeleteDepartementPage 