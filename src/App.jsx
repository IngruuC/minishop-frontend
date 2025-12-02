import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { verifyToken } from './store/slices/authSlice'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import OAuthCallback from './components/0authcallback'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Verificar token al cargar la app
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(verifyToken())
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  )
}

export default App