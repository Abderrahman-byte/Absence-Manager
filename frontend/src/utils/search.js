import { searchAccounts } from '@Services/accounts.admin'
import { searchDepartement } from '@Services/departements.admin'
import { searchFaculty } from '@Services/faculty.admin'
import { searchModules } from '@Services/modules.admin'

export const getAccountSearchItems = async (query, setItems) => {
	if (!query || query.length <= 0) return setItems([])

	const data = await searchAccounts(query, 5)

	setItems(data.map(account => { 
		return {
			id: account.id,
			name: `${account.last_name} ${account.first_name}`
		}
	}))
}

export const getDepartementSearchItems = async (query, setItems) => {
	if (!query || query.length <= 0) return setItems([])

	const data = await searchDepartement(query)

	setItems(data.map(dep => { 
		return {
			id: dep.id,
			name: dep.name
		}
	}))
}

export const getFacultySearchItems = async (query, setItems) => {
	if (!query || query.length <= 0) return setItems([])

	const data = await searchFaculty(query)

	setItems(data.map(faculty => {
		return {
			id: faculty.id,
			name: faculty.name
		}
	}))
}

export const getModuleSearchItems = async (query, setItems) => {
	if (!query || query.length <= 0) return setItems([])

	const data = await searchModules(query)

	console.log('getModuleSearchItems', data)

	setItems(data.map(module => {
		return {
			id: module.id,
			name: `${module?.faculty?.short_name || module?.faculty?.name} : ${module?.name}`
		}
	}))
}