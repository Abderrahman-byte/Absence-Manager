import { axiosApi } from '@Utils/axiosConf'

export const getModulesList = async (page=1, size=10) => {
    try {
        const response = await axiosApi.get(`/admin/modules?page=${page}&page_size=${size}`)
        return response.data
    } catch {}

    return []
}

export const getModule = async (id) => {
    try {
        const response = await axiosApi.get(`/admin/modules/${id}`)
        return response?.data
    } catch {}

    return null
}

export const updateModule = async (id, data) => {
    try {
        const response = await axiosApi.put(`/admin/modules/${id}`, data)

        return [response?.data, null]
    } catch (error) {
        return [null, error?.response?.data]
    }
}

export const deleteModule = async (id) => {
    try {
        const response = await axiosApi.delete(`/admin/modules/${id}`)

        return response?.status > 200 && response?.status < 300
    } catch {}

    return false
}

export const postModule = async (data) => {
    try {
        const response = await axiosApi.post('/admin/modules', data)

        return [response?.data, null]
    } catch (error) {
        return [null, error?.response?.data]
    }
}