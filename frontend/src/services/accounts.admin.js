import { axiosApi } from '@Utils/axiosConf'


export const getAccountsList = async (page=1, size = 10) => {
    try {
        const response = await axiosApi.get(`/admin/accounts?page_size=${size}&page=${page}`)
        return response.data
    } catch {}

    return {results: []}
}

export const searchAccounts = async (query, size=10) => {
    try {
        const response = await axiosApi.get(`/admin/accounts/search?page_size=${size}&query=${query}`)
        return response.data
    } catch {}

    return null
}