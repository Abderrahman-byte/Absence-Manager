import { axiosApi } from '@Utils/axiosConf'

export const getElementsList = async (page = 1, size = 10) => {
	try {
		const response = await axiosApi.get(`/admin/elements?page=${page}&page_size=${size}`)

		return response?.data || { results: [] }
	} catch {}

	return { results: [] }
}

export const getElement = async (id) => {
	try {
		const response = await axiosApi.get(`/admin/elements/${id}`)

		return response?.data 
	} catch {}

	return null
}

export const updateElement = async (id, data) => {
	try {
		const response = await axiosApi.put(`/admin/elements/${id}`, data)

		return [response?.data, null]
	} catch (error) {
		return [null, error?.response?.data]
	}
}

export const postElement = async (data) => {
	try {
		const response = await axiosApi.post(`/admin/elements`, data)

		return [response?.data, null]
	} catch (error) {
		return [null, error?.response?.data]
	}
}

export const deleteElement = async (id) => {
	try {
		const response = await axiosApi.delete(`/admin/elements/${id}`)

		return response?.status >= 200 && response?.status < 300
	} catch {}

	return false
}