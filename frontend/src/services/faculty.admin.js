import { axiosApi } from '@Utils/axiosConf'


export const getFaculty = async () => {
    try {
        const response = await axiosApi.get('/admin/faculty')
        return response.data || []
    } catch {}

    return []
}