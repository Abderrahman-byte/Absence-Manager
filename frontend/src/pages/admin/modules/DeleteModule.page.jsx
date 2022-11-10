import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router'

import ConfirmCard from '@Components/ConfirmCard'
import { deleteModule, getModule} from '@Services/modules.admin'

const DeleteModulePage  = () => {
    const [module, setModule] = useState(undefined)
    const { id } = useParams()

    const navigate = useNavigate()

    const initModule = async () => {
        const data = await getModule(id)
        setModule(data)
    }

    const goBack = () => navigate(-1)

    const deleteModuleCallback = () => {
        deleteModule(id).then(() => {
            goBack()
        })
    }

    useEffect(() => {
        initModule()
    }, [id])

    if (!module) return <></>

    return (
        <div className='DeleteModulePage py-3 px-5'>
            <h2 className='mb-3'>Supprimer Module</h2>

            <ConfirmCard 
                msg={<>Voulez-vous vraiment supprimer le module <strong>{module?.name}</strong>?</>}
                confirmBtn='Confimer'
                returnBtn='Revenir'
                confirmCallback={deleteModuleCallback}
            />
        </div>
    )
}

export default DeleteModulePage 