import { searchAccounts } from '@Services/accounts.admin'
import { searchDepartement } from '@Services/departements.admin'

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