import axios from 'axios'
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
const instance = axios.create({ baseURL: API })
instance.interceptors.request.use(cfg => {
  const token = (typeof window !== 'undefined') ? localStorage.getItem('token') : null
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})
export default instance
