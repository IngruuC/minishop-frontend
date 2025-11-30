import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPublicProducts } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(fetchPublicProducts())
  }, [dispatch])

  return (
    <div className="min-h-screen">
      {/* Hero Section con imagen de fondo */}
      <div 
        className="hero-section relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0 0 50px 50px'
        }}
      >
        <div className="text-center z-10 px-4 animate-fadeIn">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            🛒 Bienvenido a MiniShop
          </h1>
          <p className="text-2xl md:text-3xl text-white mb-8 drop-shadow-lg">
            Los mejores productos al mejor precio
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transform hover:scale-105 transition shadow-2xl">
              Ver Productos
            </button>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-700 transform hover:scale-105 transition shadow-2xl border-2 border-white">
              Ofertas Especiales
            </button>
          </div>
        </div>
      </div>

      {/* Sección de productos */}
      <div className="container mx-auto px-4 py-16">
        {/* Loading */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            <p className="mt-6 text-xl text-gray-600 font-semibold">Cargando productos increíbles...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-lg">
            <div className="flex items-center">
              <span className="text-2xl mr-3">❌</span>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="text-8xl mb-6">🛍️</div>
                <p className="text-3xl text-gray-500 font-bold">No hay productos disponibles</p>
                <p className="text-xl text-gray-400 mt-4">Vuelve pronto para ver nuestras ofertas</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    🌟 Nuestros Productos Destacados
                  </h2>
                  <p className="text-xl text-gray-600">
                    Encuentra lo que necesitas al mejor precio
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product) => (
                    <div key={product._id} className="product-card">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
                  <h3 className="text-4xl font-bold text-white mb-4">
                    ¿Buscás algo en especial?
                  </h3>
                  <p className="text-xl text-white mb-8 opacity-90">
                    Registrate y accedé a ofertas exclusivas
                  </p>
                  <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transform hover:scale-105 transition shadow-xl">
                    Registrarse Ahora
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">🚚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Envío Rápido</h3>
              <p className="text-gray-600">Recibí tus productos en tiempo récord</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">💳</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Pago Seguro</h3>
              <p className="text-gray-600">Múltiples métodos de pago disponibles</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition transform hover:-translate-y-2">
              <div className="text-6xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Calidad Garantizada</h3>
              <p className="text-gray-600">Los mejores productos del mercado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home