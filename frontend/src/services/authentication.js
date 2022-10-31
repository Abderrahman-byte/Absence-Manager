import mem from 'mem'

import { JWT_TOKEN_KEY, JWT_TTL } from '@Utils/env'
import { axiosDefaultApi } from '@Utils/axiosDefault'
import { parseJWT } from '@Utils/generic'

export const verifyAuth = async () => {
    const authTokenStr = localStorage.getItem(JWT_TOKEN_KEY)

    if (!authTokenStr) return

    const authToken = JSON.parse(authTokenStr)

    if (!authToken?.refresh) return

    try {
        const response = await axiosDefaultApi.post('auth/token/verify', { token: authToken?.refresh })

        if (response.status === 200) return parseJWT(authToken.refresh)
    } catch {}
}

export const login = async (email, password) => {
    try {
        const response = await axiosDefaultApi.post('auth/token', { email, password})
        return [response?.data, null]
    } catch (err) {
        return [null, err?.response?.data]
    }
}

const refreshToken = async () => {
    const authTokenStr = localStorage.getItem(JWT_TOKEN_KEY)

    if (!authTokenStr) return

    const authToken = JSON.parse(authTokenStr)

    try {
        const response = await axiosDefaultApi.post('auth/token/refresh', {
            refresh: authToken?.refresh
        })

        const data = response.data

        localStorage.setItem(JWT_TOKEN_KEY, JSON.stringify({...authToken, ...data}))

        return data?.access
    } catch {
        localStorage.removeItem(JWT_TOKEN_KEY)
    }
}

export const memorizedRefreshToken = mem(refreshToken, {
    maxAge: JWT_TTL
})