import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import TableGeneric from '@Components/TableGeneric'
import { getModulesList } from '@Services/modules.admin'

// TODO : Add search filter

const ModulesPage = () => {
    const [modules, setModules] = useState([])
    const [hasNext, setHasNext] = useState(false)
    const [hasPrevious, setHasPreviou] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const initModules = async () => {
        const data = await getModulesList(currentPage, itemsPerPage)
        setModules([...data.results])
        setHasNext(data?.next ? true : false)
        setHasPreviou(data?.previous ? true : false)
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

    const nextPage = () => setCurrentPage(currentPage + 1)

    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        initModules()
    }, [currentPage])

    return (
        <div className='ModulesPage'>
            <h3 className='mb-3'>Gestion des modules</h3>
            <div className='mb-3 text-end'>
                <Link to='/modules/add' className='btn btn-primary'>Créer un modules</Link>
            </div>
            <div className='mb-3'>
                <TableGeneric 
                    colomns={['Module', 'Filiére', 'Département', '', '']}
                    data={modulesRows}
                />
            </div>

            {hasNext || hasPrevious ? (
                <div className='d-flex justify-content-center'>
                    <button onClick={previousPage} disabled={!hasPrevious} className='btn btn-success me-2'>previous</button>
                    <button onClick={nextPage} disabled={!hasNext} className='btn btn-success ms-2'>next</button>
                </div>
            ) : null}
        </div>
    )
}

export default ModulesPage