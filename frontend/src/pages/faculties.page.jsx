import React, { useEffect, useState } from 'react'

import FacultyCard from '@Components/FacultyCard'
import { getTeacherFaculties } from '@Services/teacher'

const FacultiesPage = () => {
    const [faculties, setFaculties] = useState([])

    const initFaculties = async () => {
        const data = await getTeacherFaculties()
        setFaculties([...data])
        console.log(data)
    }

    useEffect(() => {
        initFaculties()
    }, [])

    return (
        <div className='FacultiesPage'>
            <h2 className='mb-3'>Les filière que vous enseigner :</h2>
            <div className='elements-list d-flex flex-row flex-wrap align-items-stretch'>
                {faculties.map(data => <FacultyCard key={data.id} {...data} />)}
            </div>
        </div>
    )
}

export default FacultiesPage