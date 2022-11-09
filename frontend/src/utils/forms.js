import validators from './validators'
import { searchAccounts } from '@Services/accounts.admin'

const getAccountSearchItems = async (query, setItems) => {
	if (!query || query.length <= 0) return setItems([])

	const data = await searchAccounts(query, 5)

	setItems(data.map(account => { 
		return {
			id: account.id,
			name: `${account.last_name} ${account.first_name}`
		}
	}))
}

export const editAccountFields = [
	{
		name: 'email',
		type: 'email',
		label: 'Adresse email',
		validators: [validators.required(), validators.isEmail()],
		required: true,
	},
	{
		name: 'last_name',
		type: 'text',
		label: 'Nom',
		validators: [validators.required(), validators.minLength(4)],
		required: true,
	},
	{
		name: 'first_name',
		type: 'text',
		label: 'Prenom',
		validators: [validators.required(), validators.minLength(4)],
		required: true,
	},
	{
		name: 'is_admin',
		type: 'checkbox',
		label: 'Administrateur',
	},
]

export const accountFields = [
	...editAccountFields,
	{
		name: 'password1',
		type: 'password',
		label: 'Mot de passe',
		validators: [validators.required()],
		required: true,
	},
	{
		name: 'password2',
		type: 'password',
		label: 'Confimation de Mot de passe',
		validators: [validators.required()],
		required: true,
	},
]

export const departementFields = [
	{
		name: 'name',
		type: 'text',
		label: 'Nom de departement',
		validators: [validators.required(), validators.minLength(4)],
		required: true,
	},
	{
		name: 'description',
		type: 'textarea',
		label: 'Description :',
	},
	{
		name: 'head_of_departement',
		type: 'search-input',
		label: 'Chef de departement',
		getItems: getAccountSearchItems
	},
]

export const validateForm = (fields, formData) => {
	const allFieldsErrors = []

	fields.forEach((field) => {
		const validators = field.validators || []

		const errors = validators
			.map((validator) =>
				validator(
					formData,
					field.label || field.name,
					formData[field.name]
				)
			)
			.filter(Boolean)
			.map((error) => {
				return { field: field.name, message: error }
			})

		if (errors.length > 0) allFieldsErrors.push(...errors)
	})

	return allFieldsErrors
}
