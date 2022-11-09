import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import TableGeneric from '@Components/TableGeneric'
import { getModulesList } from '@Services/modules.admin'

const ModulesPage = () => {
    const [modules, setModules] = useState([])

    const initModules = async () => {
        const data = await getModulesList()
        setModules([...data.results])
    }

    const modulesRows = useMemo(() => {
        return modules.map(module => {
            return [
                module.name,
                module?.faculty?.short_name || module?.faculty?.name,
                module?.faculty?.departement?.name,
                (<Link to={`/modules/edit/${module.id}`} className='btn btn-primary'>Modifier</Link>),
                (<Link to={`/modules/delete/${module.id}`} className='btn btn-danger'>Supprimer</Link>),
            ]
        })
    }, [modules]) 

    useEffect(() => {
        initModules()
    }, [])

    return (
        <div className='ModulesPage'>
            <h3 className='mb-3'>Gestion des modules</h3>
            <div className='mb-3 text-end'>
                <Link to='/modules/add' className='btn btn-primary'>Créer un modules</Link>
            </div>
            <div className=''>
                <TableGeneric 
                    colomns={['Module', 'Filiére', 'Département', '', '']}
                    data={modulesRows}
                />
            </div>
        </div>
    )
}

export default ModulesPage