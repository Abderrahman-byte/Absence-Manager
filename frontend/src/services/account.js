import { axiosApi } from '@Utils/axiosConf'

export const getAccountInfo = async () => {
    try {
        const response = await axiosApi.get('/auth/account')

        return response.data
    } catch {}
}