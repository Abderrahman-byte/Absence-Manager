import React, { memo, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { getElementStats } from '@Services/teacher'
import GenericTable from '@Components/TableGeneric'

const ElementStatPage = () => {
	const [element, setElement] = useState(undefined)

	const { id } = useParams()

	const initElement = async (id) => {
		const data = await getElementStats(id)
		setElement(data)
        console.log(data)
	}

	const studentsData = useMemo(() => {
		return element?.students?.map(student => {
			return [
				student.cin, 
				`${student.last_name} ${student.first_name}`, 
				student.email,
				student.absence_hours, 
				student.justified_absence
			]
		}) || []
	}, [element])

	useEffect(() => {
		initElement(id)
	}, [id])

	if (!element) return <></>

	return (
		<div className='ElementStatPage'>
			<div className='card mb-4'>
				<div className='card-body'>
					<h3>{element.module.faculty.name}</h3>
					<h4>{element.module.name} : {element.name}</h4>
				</div>
			</div>

            <GenericTable colomns={['CIN', 'Nom', 'Email', 'heures d\'absence', 'heures justifiée']} data={studentsData} />
		</div>
	)
}

export default ElementStatPage
