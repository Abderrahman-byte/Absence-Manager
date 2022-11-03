import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

const ElementCard = ({ id, name, module }) => {
    return (
        <div className='ElementCard card'>
            <div className='card-body'>
                <h5 className='card-title'>{name}</h5>
                <p className='card-subtitle mb-2 text-muted'>Module : {module.name}</p>
                <p className='card-subtitle text-muted'>Filière : {module.faculty.short_name || module.faculty.name}</p>

                <Link className='btn btn-primary mt-3' to={`/element/${id}`}>Details</Link>
            </div>
        </div>
    )
}

export default ElementCard