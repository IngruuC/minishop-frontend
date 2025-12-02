import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/slices/authSlice'

const OAuthCallback = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    const error = searchParams.get('error')

    if (error) {
      // Manejar error de autenticación
      console.error('Error OAuth:', error)
      navigate('/login?error=' + error)
      return
    }

    if (token) {
      // Guardar token y obtener datos del usuario
      localStorage.setItem('token', token)
      
      // Decodificar el token para obtener la información del usuario
      try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        )
        const decoded = JSON.parse(jsonPayload)
        
        // Crear objeto de usuario
        const user = {
          id: decoded.id,
          email: decoded.email,
          rol: decoded.rol
        }
        
        localStorage.setItem('user', JSON.stringify(user))
        
        // Actualizar el estado de Redux
        dispatch({
          type: 'auth/login/fulfilled',
          payload: { token, user }
        })

        // Redirigir al dashboard
        navigate('/dashboard')
      } catch (error) {
        console.error('Error al procesar token:', error)
        navigate('/login?error=invalid_token')
      }
    } else {
      navigate('/login')
    }
  }, [searchParams, navigate, dispatch])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Procesando autenticación...</h2>
        <p className="text-gray-600">Serás redirigido en un momento</p>
      </div>
    </div>
  )
}

export default OAuthCallback