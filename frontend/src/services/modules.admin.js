import { axiosApi } from '@Utils/axiosConf'

export const getModulesList = async () => {
    try {
        const response = await axiosApi.get('/admin/modules')
        return response.data
    } catch {}

    return []
}