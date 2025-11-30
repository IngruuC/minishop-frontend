const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
      <img
        src={product.imagen || 'https://via.placeholder.com/300'}
        alt={product.nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.nombre}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.descripcion}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            ${product.precio.toLocaleString('es-AR')}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        {product.categoria && (
          <span className="inline-block mt-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {product.categoria}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductCard