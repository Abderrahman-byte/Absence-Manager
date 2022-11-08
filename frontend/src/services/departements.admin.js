import { axiosApi } from '@Utils/axiosConf'

export const getDepartements = async () => {
    try {
        const response = await axiosApi.get('/admin/departements')

        return response.data
    } catch {}

    return []
}