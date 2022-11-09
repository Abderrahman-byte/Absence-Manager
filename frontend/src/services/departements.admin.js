import { axiosApi } from '@Utils/axiosConf'

export const getDepartements = async () => {
    try {
        const response = await axiosApi.get('/admin/departements')

        return response.data
    } catch {}

    return []
}

export const getDepartement = async (id) => {
    try {
        const response = await axiosApi.get(`/admin/departements/${id}`)

        return response.data
    } catch {}

    return null
}

export const updateDepartement = async (id, data) => {
    try {
        const response = await axiosApi.put(`/admin/departements/${id}`, data)

        return [response.data, null]
    } catch (error) {
        return [null, error?.response?.data]
    }
}