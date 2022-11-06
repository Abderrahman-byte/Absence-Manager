import emailValidator from 'email-addresses'

const required = (message) => {
    return (formData, name, value) => {
        const msg = message || `le champ ${name} est obligatoire.`
        return value !== null && value !== undefined && value !== '' ? null : msg
    }
}

const isEmail = (message) => {
    const msg = message || 'S\'il vous plaît, saisissez une adresse email valide.'

    return (formData, name, value) => {
        const object = emailValidator.parseOneAddress(value)

        return object ? null : msg
    }
}

const minLength = (len, message) => {
    return (formData, name, value) => {
        const msg = message || `le ${name} doit comporter au moins ${len} caractères.`

        return value.length >= len ? null : msg
    }
}

export default {
    required,
    isEmail,
    minLength
}