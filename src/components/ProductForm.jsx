import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: product || {
      nombre: '',
      descripcion: '',
      precio: '',
      imagen: '',
      stock: '',
      categoria: '',
      activo: true
    }
  })

  useEffect(() => {
    if (product) {
      reset(product)
    }
  }, [product, reset])

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      precio: parseFloat(data.precio),
      stock: parseInt(data.stock)
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {product ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nombre */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Producto *
          </label>
          <input
            type="text"
            {...register('nombre', {
              required: 'El nombre es obligatorio',
              minLength: { value: 3, message: 'Mínimo 3 caracteres' },
              maxLength: { value: 100, message: 'Máximo 100 caracteres' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Notebook Lenovo IdeaPad"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
          )}
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción *
          </label>
          <textarea
            {...register('descripcion', {
              required: 'La descripción es obligatoria',
              minLength: { value: 10, message: 'Mínimo 10 caracteres' },
              maxLength: { value: 500, message: 'Máximo 500 caracteres' }
            })}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Describe las características del producto..."
          />
          {errors.descripcion && (
            <p className="text-red-500 text-sm mt-1">{errors.descripcion.message}</p>
          )}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precio ($) *
          </label>
          <input
            type="number"
            step="0.01"
            {...register('precio', {
              required: 'El precio es obligatorio',
              min: { value: 0, message: 'El precio no puede ser negativo' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0.00"
          />
          {errors.precio && (
            <p className="text-red-500 text-sm mt-1">{errors.precio.message}</p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stock *
          </label>
          <input
            type="number"
            {...register('stock', {
              required: 'El stock es obligatorio',
              min: { value: 0, message: 'El stock no puede ser negativo' }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="0"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <input
            type="text"
            {...register('categoria')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: Electrónica"
          />
        </div>

        {/* Imagen URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL de Imagen
          </label>
          <input
            type="url"
            {...register('imagen')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {/* Activo */}
        <div className="md:col-span-2 flex items-center">
          <input
            type="checkbox"
            {...register('activo')}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm font-medium text-gray-700">
            Producto activo (visible en la tienda)
          </label>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {product ? 'Actualizar' : 'Crear Producto'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm