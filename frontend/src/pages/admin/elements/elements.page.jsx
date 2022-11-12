import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import TableGeneric from '@Components/TableGeneric'
import { getElementsList } from '@Services/elements.admin'
import { useMemo } from 'react'

// TODO : add search bar

const ElementsPage = () => {
    const [elements, setElements] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [hasPrevious, setHasPrevious] = useState(false)
    const [hasNext, setHasNext] = useState(false)

    const initElements = async () => {
        const data = await getElementsList(currentPage)
        setElements(data.results)
        setHasPrevious(data.previous ? true : false)
        setHasNext(data.next ? true : false)
    }

    const dataRows = useMemo(() => {
        return elements.map(element => {
            return [
                element.name,
                element?.module?.name,
                element?.module?.faculty?.short_name || element?.module?.faculty?.name,
                `${element?.professor?.last_name || ''} ${element?.professor?.first_name || ''}`,
                (<Link to={`/elements/edit/${element.id}`} className='btn btn-success'>modifier</Link>),
                (<Link to={`/elements/delete/${element.id}`} className='btn btn-danger'>supprimer</Link>),
            ]
        })
    }, [elements])

    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const nextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    useEffect(() => {
        initElements()
    }, [currentPage])

    return (
        <div className='ElementsPage'>
            <h3 className='mb-3'>Gestion d'elements des modules</h3>
            <div className='mb-3 text-end'>
                <Link to='/elements/add' className='btn btn-primary'>Creér un element de module</Link>
            </div>
            
            <TableGeneric
                colomns={['Element', 'Module', 'Filiére', 'Enseignant', '', '']}
                data={dataRows}
            />
            
            {hasNext || hasPrevious ? (
                <div className='controls d-flex justify-content-center'>
                    <button className='btn btn-success me-2' disabled={!hasPrevious} onClick={previousPage}>previous</button>
                    <button className='btn btn-success ms-2' disabled={!hasNext} onClick={nextPage}>next</button>
                </div>
            ): null}
        </div>
    )
}

export default ElementsPage