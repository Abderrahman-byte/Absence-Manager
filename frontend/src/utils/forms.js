import { getAccountSearchItems, getDepartementSearchItems, getFacultySearchItems, getModuleSearchItems } from './search'
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
		label: 'Nom de filiére',
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

export const moduleFields = [
	{
		name: 'name',
		type: 'text',
		label: 'Nom de module',
		validators: [validators.required(), validators.minLength(4)],
		required: true
	},{
		name: 'faculty',
		type: 'search-input',
		label: 'Filiére',
		getItems: getFacultySearchItems,
		validators: [validators.required("Le champs de filiére est obligatoire.")]
	},{
		name: 'description',
		type: 'textarea',
		label: 'Description :'
	}
]

export const elementFields = [
	{
		name: 'name',
		type: 'text',
		label: 'Nom de module',
		validators: [validators.required(), validators.minLength(4)],
		required: true
	},{
		name: 'module',
		type: 'search-input',
		label: 'Module',
		getItems: getModuleSearchItems,
		validators: [validators.required("Le champs de module est obligatoire.")]
	},{
		name: 'professor',
		type: 'search-input',
		label: 'Enseignant',
		getItems: getAccountSearchItems,
		validators: [validators.required("Le champs d\'enseignant est obligatoire.")]
	},{
		name: 'description',
		type: 'textarea',
		label: 'Description :'
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
