export const parseJWT = (token) => {
    const parts = token.split('.')

    if (parts.length < 2) return

    return JSON.parse(atob(parts[1]))
}