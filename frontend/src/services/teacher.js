import { axiosApi } from '@Utils/axiosConf'

export const getTeacherElements = async () => {
    try {
        const response = await axiosApi.get('/teacher/elements')
        return response.data
    }  catch {}

    return []
}

export const getElementStats = async (id) => {
    try {
        const response = await axiosApi.get('/teacher/elements/' + id)
        return response.data
    }  catch {}

    return null
}

export const getTeacherFaculties = async () => {
    try {
        const response = await axiosApi.get('/teacher/faculty')
        return response.data
    } catch {}

    return []
}

export const getFacultyStats = async (id) => {
    try {
        const response = await axiosApi.get('/teacher/faculty/' + id)
        return response.data
    }  catch {}

    return null
}