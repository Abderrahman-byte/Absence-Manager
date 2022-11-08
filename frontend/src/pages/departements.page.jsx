import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import TableGeneric from '@Components/TableGeneric'
import { getDepartements } from '@Services/departements.admin'

const DepartementsPage = () => {
    const [departements, setDepartements] = useState([])

    const initDepartements = async () => {
        const data = await getDepartements()
        setDepartements(data)
        console.log(data)
    }

    useEffect(() => {
        initDepartements()
    }, [])

    const departementsRows = useMemo(() => {
        return departements.map(dep => {
            const hod = dep?.head_of_departement

            return [
                dep.name,
                `${hod?.last_name || ''} ${hod?.first_name || ''}`,
                (<Link to='#' className='btn btn-primary'>Modifier</Link>),
                (<Link to='#' className='btn btn-danger'>Supprimer</Link>)
            ]
        })
    }, [departements])

    return (
        <div className='DepartementsPage'>
            <h3 className='mb-3'>Gestion des departements</h3>
            <div className='text-end mb-3'>
                <Link to='#' className='btn btn-primary'>Creer une departement</Link>
            </div>

            <TableGeneric colomns={['name', 'Chef de departement', '', '']} data={departementsRows} />
        </div>
    )
}

export default DepartementsPage