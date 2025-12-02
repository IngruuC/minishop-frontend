const ProductList = ({ products, onEdit, onDelete, onTogglePromotion }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Producto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Promoción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No hay productos para mostrar
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const tienePromocion = product.promocion?.activa
                const precioConDescuento = product.precioConDescuento || product.precio
                const ahorro = product.precio - precioConDescuento

                return (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={product.imagen || 'https://via.placeholder.com/50'}
                          alt={product.nombre}
                          className="w-12 h-12 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{product.nombre}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.descripcion}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tienePromocion ? (
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 line-through">
                            ${product.precio.toLocaleString('es-AR')}
                          </span>
                          <span className="text-gray-900 font-semibold text-red-600">
                            ${precioConDescuento.toLocaleString('es-AR')}
                          </span>
                          <span className="text-xs text-green-600">
                            -{ahorro.toLocaleString('es-AR')}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-900 font-semibold">
                          ${product.precio.toLocaleString('es-AR')}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`${product.stock > 10 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {product.categoria || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tienePromocion ? (
                        <div className="flex flex-col">
                          <span className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-red-100 to-pink-100 text-red-800 font-semibold mb-1 text-center">
                            🎉 Activa
                          </span>
                          <span className="text-xs text-gray-600">
                            {product.promocion.tipo === 'porcentaje' 
                              ? `-${product.promocion.valor}%`
                              : `-$${product.promocion.valor}`
                            }
                          </span>
                        </div>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          Sin promoción
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.activo ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Activo
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => onEdit(product)}
                          className="text-blue-600 hover:text-blue-900 transition text-left"
                        >
                          ✏️ Editar
                        </button>
                        {onTogglePromotion && (
                          <button
                            onClick={() => onTogglePromotion(product._id)}
                            className={`${
                              tienePromocion 
                                ? 'text-orange-600 hover:text-orange-900' 
                                : 'text-green-600 hover:text-green-900'
                            } transition text-left`}
                          >
                            {tienePromocion ? '🔕 Desactivar promo' : '🎉 Activar promo'}
                          </button>
                        )}
                        <button
                          onClick={() => onDelete(product)}
                          className="text-red-600 hover:text-red-900 transition text-left"
                        >
                          🗑️ Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductList