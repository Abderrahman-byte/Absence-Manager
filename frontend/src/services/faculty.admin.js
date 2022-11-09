import { axiosApi } from '@Utils/axiosConf'


export const getFacultyList = async () => {
    try {
        const response = await axiosApi.get('/admin/faculty')
        return response.data || []
    } catch {}

    return []
}

export const getFaculty = async (id) => {
    try {
        const response = await axiosApi.get(`/admin/faculty/${id}`)
        return response.data
    } catch {}

    return null
}

export const deleteFaculty = async (id) => {
    try {
        const response = await axiosApi.delete(`/admin/faculty/${id}`)
        return response.data
    } catch {}

    return null
}

export const updateFaculty = async (id, data) => {
    try {
        const response = await axiosApi.put(`/admin/faculty/${id}`, data)
        return [response.data, null]
    } catch (error) {
        return [null, error?.response?.data]
    }
}

export const postFaculty = async (data) => {
    try {
        const response = await axiosApi.post(`/admin/faculty`, data)
        return [response.data, null]
    } catch (error) {
        return [null, error?.response?.data]
    }
}