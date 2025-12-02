import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Helper para normalizar payloads de producto
const normalizeProductUpdate = (data) => {
  const normalized = {}

  if (data.nombre !== undefined && data.nombre !== null) {
    normalized.nombre = String(data.nombre).trim()
  }
  if (data.descripcion !== undefined && data.descripcion !== null) {
    normalized.descripcion = String(data.descripcion).trim()
  }
  if (data.precio !== undefined && data.precio !== null && data.precio !== '') {
    const precioNum = Number(data.precio)
    if (!Number.isNaN(precioNum)) normalized.precio = precioNum
  }
  if (data.stock !== undefined && data.stock !== null && data.stock !== '') {
    const stockNum = Number(data.stock)
    if (!Number.isNaN(stockNum)) normalized.stock = stockNum
  }
  if (data.imagen !== undefined && data.imagen !== null) {
    normalized.imagen = data.imagen === '' ? '' : String(data.imagen).trim()
  }
  if (data.categoria !== undefined && data.categoria !== null) {
    normalized.categoria = String(data.categoria).trim()
  }
  if (data.activo !== undefined && data.activo !== null) {
    normalized.activo = Boolean(data.activo)
  }
  
  // Agregar promoción al payload normalizado
  if (data.promocion !== undefined && data.promocion !== null) {
    normalized.promocion = {
      activa: Boolean(data.promocion.activa),
      tipo: data.promocion.tipo || 'porcentaje',
      valor: Number(data.promocion.valor) || 0,
      fechaInicio: data.promocion.fechaInicio || null,
      fechaFin: data.promocion.fechaFin || null
    }
  }

  return normalized
}

// AUTH
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  verify: () => api.get('/auth/verify'),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  resetPassword: (token, data) => api.post(`/auth/reset-password/${token}`, data)
}

// PRODUCTS
export const productsAPI = {
  // Público
  getPublic: () => api.get('/products/public'),
  getPromotions: () => api.get('/products/public/promotions'),
  getCategories: () => api.get('/products/public/categories'),
  getByCategory: (category) => api.get(`/products/public/category/${encodeURIComponent(category)}`),

  // Protegido
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),

  // Usa normalizeProductUpdate
  update: (id, data) => api.put(`/products/${id}`, normalizeProductUpdate(data)),

  // Baja lógica y baja física
  delete: (id) => api.delete(`/products/${id}`),
  deletePermanent: (id) => api.delete(`/products/${id}/permanent`),

  // Toggle estado y promoción
  toggleStatus: (id) => api.patch(`/products/${id}/toggle-status`),
  togglePromotion: (id) => api.patch(`/products/${id}/toggle-promotion`)
}

export default api