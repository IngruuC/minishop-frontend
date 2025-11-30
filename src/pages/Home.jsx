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
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-6"></div>
            <p className="text-2xl text-gray-600 font-semibold">Cargando productos increíbles...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-700 px-8 py-6 rounded-2xl mb-6 shadow-xl">
            <div className="flex items-center">
              <span className="text-3xl mr-4">❌</span>
              <p className="text-lg font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-24 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-100">
                <div className="text-9xl mb-8 animate-pulse">🛍️</div>
                <p className="text-4xl text-gray-700 font-bold mb-4">No hay productos disponibles</p>
                <p className="text-xl text-gray-500 mb-8">Vuelve pronto para ver nuestras ofertas especiales</p>
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transform hover:scale-105 transition shadow-lg">
                  Notificarme cuando haya productos
                </button>
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
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-4">
            ¿Por qué elegir MiniShop?
          </h2>
          <p className="text-center text-xl text-gray-600 mb-16">
            La mejor experiencia de compra online
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white text-center p-10 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-3 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl">🚚</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Envío Rápido</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Recibí tus productos en tiempo récord. Envíos a todo el país en 24-48hs
              </p>
            </div>
            
            <div className="bg-white text-center p-10 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-3 border border-gray-100">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl">💳</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Pago Seguro</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Múltiples métodos de pago disponibles. Compra segura y protegida
              </p>
            </div>
            
            <div className="bg-white text-center p-10 rounded-3xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-3 border border-gray-100">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-5xl">⭐</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Calidad Garantizada</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Los mejores productos del mercado. Garantía de satisfacción total
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home