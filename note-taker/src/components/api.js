import axios  from "axios";

const api = axios.create({
    baseURL: 'https://notetaker-server.onrender.com',
    headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("accessToken"))
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`

        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api