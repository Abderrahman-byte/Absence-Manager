export const parseJWT = (token) => {
    const parts = token.split('.')

    if (parts.length < 2) return

    return JSON.parse(atob(parts[1]))
}

export const apiErrorsToFromErrors = (fields, errors) => {
    const formatErrors = []

    fields.forEach(field => {
        if (!(field.name in errors)) return

        formatErrors.push(...errors[field.name].map(err => {
            return { field: field.name, message: err }
        }))
    })

    return formatErrors
}