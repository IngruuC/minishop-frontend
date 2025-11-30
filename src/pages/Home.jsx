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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Bienvenido a MiniShop 🛒
        </h1>
        <p className="text-xl text-gray-600">
          Los mejores productos al mejor precio
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          ❌ {error}
        </div>
      )}

      {/* Products Grid */}
      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-2xl text-gray-500">No hay productos disponibles</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home