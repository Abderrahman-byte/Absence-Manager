import { getAccountSearchItems, getDepartementSearchItems } from './search'
import validators from './validators'

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

export const facultyFields = [
	{
		name: 'name',
		type: 'text',
		label: 'Nom de filiere',
		validators: [validators.required(), validators.minLength(4)],
	}, {
		name: 'short_name',
		type: 'text',
		label: 'Abréviation',
		validators: [validators.minLength(3)],
	}, {
		name: 'departement',
		type: 'search-input',
		label: 'Departement',
		getItems: getDepartementSearchItems,
		validators: [validators.required("Le champs de departement est obligatoire.")]
	}, {
		name: 'description',
		type: 'textarea',
		label: 'Description :',
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
