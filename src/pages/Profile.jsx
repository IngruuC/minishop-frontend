import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-gray-700">No hay información de perfil.</p>
        <Link to="/" className="text-blue-600 underline">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mi perfil</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <p className="mb-2"><strong>Nombre:</strong> {user.nombre}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        {user.role && <p className="mb-2"><strong>Rol:</strong> {user.role}</p>}
        <div className="mt-4">
          <Link to="/dashboard" className="text-blue-600 underline">
            Volver al dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
