import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { getFacultyStats } from '@Services/teacher'

const TeacherFacultyPage = () => {
    const [faculty, setFaculty] = useState(undefined)

    const { id } = useParams()

    const initFaculty = async (id) => {
        const data = await getFacultyStats(id)
        setFaculty(data)
    }

    useEffect(() => {
        initFaculty(id)
    }, [id])

    if (faculty === undefined) return <></>

    return (
        <div className='TeacherFacultyPage'>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='card-title'>{faculty.name}</h3>
                    <h4 className=''>Département : {faculty.departement.name}</h4>
                </div>
            </div>
            
        </div>
    )
}

export default TeacherFacultyPage