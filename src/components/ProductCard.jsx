const ProductCard = ({ product }) => {
  const tienePromocion = product.promocionVigente && product.promocion?.activa
  const precioOriginal = product.precio
  const precioConDescuento = product.precioConDescuento
  const porcentajeDescuento = product.promocion?.tipo === 'porcentaje' ? product.promocion.valor : null

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-fadeIn relative">
      {/* Badge de promoción */}
      {tienePromocion && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            {porcentajeDescuento ? `-${porcentajeDescuento}%` : '¡OFERTA!'}
          </div>
        </div>
      )}

      <img
        src={product.imagen || 'https://via.placeholder.com/300'}
        alt={product.nombre}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.nombre}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.descripcion}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            {tienePromocion ? (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ${precioOriginal.toLocaleString('es-AR')}
                </span>
                <span className="text-2xl font-bold text-red-600">
                  ${precioConDescuento.toLocaleString('es-AR')}
                </span>
                <span className="text-xs text-green-600 font-semibold">
                  Ahorrás ${(precioOriginal - precioConDescuento).toLocaleString('es-AR')}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-blue-600">
                ${precioOriginal.toLocaleString('es-AR')}
              </span>
            )}
          </div>
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