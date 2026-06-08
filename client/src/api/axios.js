import axios from 'axios'

const api = axios.create({
    baseURL: (import.meta.VITE_BASEURL || "http://localhost:8000") + "/api"
})

// Attach Auth token to all API request 
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

export default api