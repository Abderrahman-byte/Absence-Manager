import axios from 'axios'

import { API_BASE_URL, JWT_TOKEN_KEY } from './env'
import { memorizedRefreshToken } from '@Services/authentication'

export const axiosApi = axios.create({
    baseURL: API_BASE_URL
})

axiosApi.interceptors.request.use(
    async (config) => {
        config.headers = {...config.headers}

        const authTokenStr = localStorage.getItem(JWT_TOKEN_KEY)
        
        if (!authTokenStr) return config

        const authToken = JSON.parse(authTokenStr)

        if (authToken?.access) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${authToken?.access}`
            }
        }

        return config
    }, (error) => {
        return Promise.reject(error)
    }
)

axiosApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config

        if (error?.response?.status === 401 && !config.sent) {
            config.sent = true

            const access = await memorizedRefreshToken()
            
            if (access) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${access}`,
                }
            }

            return axios(config)
        }

        return Promise.reject(error)
    }
)