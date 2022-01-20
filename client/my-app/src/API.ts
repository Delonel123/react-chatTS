import axios from "axios";

const API_URL = 'http://localhost:3001/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    if (config.headers) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    }
    return config
})
$api.interceptors.response.use((config) => {
    return config
}, async (error) => {
    const originRequest = error.config
    if (error.response.status === 403) {
        const responce = await axios.get('http://localhost:3001/api/refresh',{withCredentials:true})
        localStorage.setItem('accessToken', responce.data.accessToken)
        return $api.request(originRequest)
    }

})
export default $api