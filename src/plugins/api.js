import axios from 'axios'

const apiToken = import.meta.env.VITE_API_ACCESS_TOKEN
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        accept: 'application/json',
        Authorization: apiToken,
    },
    timeout: 10000,
})

export default api