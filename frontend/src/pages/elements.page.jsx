import React, { useEffect, useState } from 'react'

import { getTeacherElements } from '@Services/teacher'
import ElementCard from '@Components/ElementCard'

const ElementsPage = () => {
    const [elements, setElements] = useState([])

    const initElements = async () => {
        const data = await getTeacherElements()

        setElements([...data])
    }

    useEffect(() => {
        initElements()
    }, [])

    return (
        <div className='ElementsPage'>
            <h1 className='mb-5'>Les elements que vous enseignez :</h1>
            <div className='elements-list d-flex flex-row flex-wrap align-items-stretch'>
                {elements.map(data => <ElementCard key={data.id} {...data} />)}
            </div>
        </div>
    )
}

export default ElementsPage