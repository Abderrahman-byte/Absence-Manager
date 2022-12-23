import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const FacultyCard = ({ id, name, short_name, departement }) => {
    return (
        <div className='FacultyCard card'>
            <div className='card-body'>
                <h4 className='card-title'>{short_name || name}</h4>
                <p className='card-subtitle mb-2 text-muted'>Département : {departement.name}</p>
                <Link className='btn btn-primary' to={`/faculty/${id}`}>Details</Link>
            </div>
        </div>
    )
}

export default FacultyCard