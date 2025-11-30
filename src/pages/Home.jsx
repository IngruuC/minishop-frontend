import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPublicProducts } from '../store/slices/productSlice'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error } = useSelector((state) => state.products)
  const { isAuthenticated } = useSelector((state) => state.auth)

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
            <button 
              onClick={() => {
                const productSection = document.getElementById('productos-section')
                if (productSection) {
                  productSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transform hover:scale-105 transition shadow-2xl"
            >
              Ver Productos
            </button>
            <button 
              onClick={() => {
                const productSection = document.getElementById('productos-section')
                if (productSection) {
                  productSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-blue-700 transform hover:scale-105 transition shadow-2xl border-2 border-white"
            >
              Ofertas Especiales
            </button>
          </div>
        </div>
      </div>

      {/* Sección de productos */}
      <div id="productos-section" className="container mx-auto px-4 py-16">
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

                {/* Call to Action - Solo si NO está autenticado */}
                {!isAuthenticated && (
                  <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center shadow-2xl">
                    <h3 className="text-4xl font-bold text-white mb-4">
                      ¿Buscás algo en especial?
                    </h3>
                    <p className="text-xl text-white mb-8 opacity-90">
                      Registrate y accedé a ofertas exclusivas
                    </p>
                    <Link to="/register">
                      <button className="bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold hover:bg-blue-50 transform hover:scale-105 transition shadow-xl">
                        Registrarse Ahora
                      </button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* Features Section - IMPORTANTE: Esta sección debe estar FUERA del container de productos */}
      <div style={{ 
        background: 'linear-gradient(135deg, #EBF4FF 0%, #F3E7FF 50%, #FFE7F3 100%)',
        padding: '80px 0',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ 
            fontSize: '48px', 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#1F2937',
            marginBottom: '16px'
          }}>
            ¿Por qué elegir MiniShop?
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '20px', 
            color: '#6B7280',
            marginBottom: '60px'
          }}>
            La mejor experiencia de compra online
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px'
          }}>
            {/* Card 1 - Envío Rápido */}
            <div style={{ 
              background: 'white',
              textAlign: 'center',
              padding: '40px',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.3)'
              }}>
                <span style={{ fontSize: '48px' }}>🚚</span>
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                Envío Rápido
              </h3>
              <p style={{ 
                color: '#6B7280', 
                fontSize: '18px',
                lineHeight: '1.6'
              }}>
                Recibí tus productos en tiempo récord. Envíos a todo el país en 24-48hs
              </p>
            </div>
            
            {/* Card 2 - Pago Seguro */}
            <div style={{ 
              background: 'white',
              textAlign: 'center',
              padding: '40px',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #34D399 0%, #059669 100%)',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
              }}>
                <span style={{ fontSize: '48px' }}>💳</span>
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                Pago Seguro
              </h3>
              <p style={{ 
                color: '#6B7280', 
                fontSize: '18px',
                lineHeight: '1.6'
              }}>
                Múltiples métodos de pago disponibles. Compra segura y protegida
              </p>
            </div>
            
            {/* Card 3 - Calidad Garantizada */}
            <div style={{ 
              background: 'white',
              textAlign: 'center',
              padding: '40px',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #FBBF24 0%, #D97706 100%)',
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)'
              }}>
                <span style={{ fontSize: '48px' }}>⭐</span>
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: '#1F2937',
                marginBottom: '16px'
              }}>
                Calidad Garantizada
              </h3>
              <p style={{ 
                color: '#6B7280', 
                fontSize: '18px',
                lineHeight: '1.6'
              }}>
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