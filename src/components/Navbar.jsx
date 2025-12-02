import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { useToast } from '../contexts/ToastContext'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleLogout = () => {
    // Primero navegar al inicio público para evitar que PrivateRoute redirija a /login
    navigate('/')
    dispatch(logout())
    try {
      // Mostrar toast con estética del sitio
      showToast && showToast('Ha cerrado sesión correctamente', 'success')
    } catch (e) {}
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
            🛒 MiniShop
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Inicio
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="text-sm hover:text-blue-200 transition flex items-center gap-2">
                    <span>👤</span>
                    <span>{user?.nombre}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition font-semibold"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar