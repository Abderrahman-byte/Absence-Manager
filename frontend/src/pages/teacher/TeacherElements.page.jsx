import React, { useEffect, useState } from 'react'

import { getTeacherElements } from '@Services/teacher'
import ElementCard from '@Components/ElementCard'

const TeacherElementsPage = () => {
    const [elements, setElements] = useState([])

    const initElements = async () => {
        const data = await getTeacherElements()

        setElements([...data])
    }

    useEffect(() => {
        initElements()
    }, [])

    return (
        <div className='TeacherElementsPage'>
            <h3 className='mb-5'>Les elements que vous enseignez :</h3>
            <div className='elements-list d-flex flex-row flex-wrap align-items-stretch'>
                {elements.map(data => <ElementCard key={data.id} {...data} />)}
            </div>
        </div>
    )
}

export default TeacherElementsPage