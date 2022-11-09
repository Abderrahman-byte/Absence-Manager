import React, { useEffect, useMemo, useState } from 'react'

import { getFacultyList } from '@Services/faculty.admin'
import { Link } from 'react-router-dom'
import TableGeneric from '@Components/TableGeneric'

const FacultiesPage = () => {
    const [list, setList] = useState([])

    const fetchFaculties = async () => {
        const data = await getFacultyList()
        setList([...data])
    }

    const dataRows = useMemo(() => {
        return list.map(faculty => {
            return [
                faculty.short_name || faculty.name,
                faculty.departement?.name,
                (<Link to={`/faculty/edit/${faculty.id}`} className='btn btn-primary'>Modifier</Link>),
                (<Link to={`/faculty/delete/${faculty.id}`} className='btn btn-danger'>Supprimer</Link>),
            ]
        })
    }, [list])

    useEffect(() => {
        fetchFaculties()
    }, [])
    
    return (
        <div className='FacultiesPage'>
            <h3 className='mb-3'>Gestion des filières</h3>

            <div className='mb-3 text-end'>
                <Link to='/faculty/add' className='btn btn-primary'>Ajouter Filières</Link>
            </div>

            <TableGeneric colomns={['Filière', 'Departement', '', '']} data={dataRows} />
        </div>
    )
}

export default FacultiesPage