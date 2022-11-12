import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'

import ConfirmCard from '@Components/ConfirmCard'
import { deleteElement, getElement } from '@Services/elements.admin'

const DeleteElementPage  = () => {
    const [element, setElement] = useState(undefined)

    const { id } = useParams()
    const navigate = useNavigate()

    const fetchElement = async () => {
        const data = await getElement(id)
        setElement(data)
    }

    const goBack = () => navigate(-1)

    const deleteElementCallback = () => {
        deleteElement(id).then(() => {
            goBack()
        })
    }

    const elementName = useMemo(() => {
        return `${element?.module?.faculty?.short_name || element?.module?.faculty?.name} : ${element?.module?.name} - ${element?.name}`
    }, [element])

    useEffect(() => {
        fetchElement()
    }, [id])

    if (!element) return <></>

    return (
        <div className='DeleteElementPage py-3 px-5'>
            <h2 className='mb-3'>Supprimer élement de module</h2>

            <ConfirmCard 
                msg={<>Voulez-vous vraiment supprimer l'element <strong>{elementName}</strong> ?</>}
                confirmBtn='Confimer'
                returnBtn='Revenir'
                confirmCallback={deleteElementCallback}
            />
        </div>
    )
}

export default DeleteElementPage 