import axios from 'axios'


const api = axios.create({
  baseURL: import.meta.env.VITE_NODE_BACKEND_URL + "/api",
});



// Attach token automatically if present
api.interceptors.request.use((config) => {
const token = localStorage.getItem('token')
if (token) config.headers.Authorization = `Bearer ${token}`
return config
})


export default api