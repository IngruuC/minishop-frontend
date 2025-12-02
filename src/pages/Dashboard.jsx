import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductPermanent,
  togglePromotion
} from '../store/slices/productSlice'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'
import ConfirmModal from '../components/ConfirmModal'
import { useToast } from '../contexts/ToastContext'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)
  const { showToast } = useToast()

  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState(null)

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  const handleCreate = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleDelete = (product) => {
    setProductToDelete(product)
    setShowDeleteModal(true)
  }

  const handleTogglePromotion = async (productId) => {
    try {
      await dispatch(togglePromotion(productId)).unwrap()
      showToast('Estado de promoción actualizado', 'success')
      dispatch(fetchAllProducts())
    } catch (error) {
      showToast(error || 'Error al actualizar promoción', 'error')
    }
  }

  const confirmDelete = (isPermanent = false) => {
    if (productToDelete) {
      const thunk = isPermanent ? deleteProductPermanent : deleteProduct
      dispatch(thunk(productToDelete._id)).then(() => {
        setShowDeleteModal(false)
        setProductToDelete(null)
        showToast('Producto eliminado correctamente', 'success')
        dispatch(fetchAllProducts())
      })
    }
  }

  const handleSubmit = (data) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct._id, data })).then((result) => {
        if (result.type.includes('fulfilled')) {
          setShowForm(false)
          setEditingProduct(null)
          showToast('Producto actualizado correctamente', 'success')
          dispatch(fetchAllProducts())
        }
      })
    } else {
      dispatch(createProduct(data)).then((result) => {
        if (result.type.includes('fulfilled')) {
          setShowForm(false)
          showToast('Producto creado correctamente', 'success')
          dispatch(fetchAllProducts())
        }
      })
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  // Calcular estadísticas
  const productosConPromocion = products.filter(p => p.promocion?.activa && p.promocionVigente).length
  const productosActivos = products.filter(p => p.activo).length

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🎛️ Panel de Administración
        </h1>
        <p className="text-gray-600">
          Bienvenido, <span className="font-semibold">{user?.nombre}</span>
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Productos</p>
              <p className="text-3xl font-bold">{products.length}</p>
            </div>
            <div className="text-5xl opacity-50">📦</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Activos</p>
              <p className="text-3xl font-bold">{productosActivos}</p>
            </div>
            <div className="text-5xl opacity-50">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">En Promoción</p>
              <p className="text-3xl font-bold">{productosConPromocion}</p>
            </div>
            <div className="text-5xl opacity-50">🎉</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Inactivos</p>
              <p className="text-3xl font-bold">{products.length - productosActivos}</p>
            </div>
            <div className="text-5xl opacity-50">💤</div>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          ❌ {error}
        </div>
      )}

      {/* Botón Crear */}
      {!showForm && (
        <div className="mb-6">
          <button
            onClick={handleCreate}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold shadow-md"
          >
            ➕ Crear Nuevo Producto
          </button>
        </div>
      )}

      {/* Formulario */}
      {showForm && (
        <div className="mb-8">
          <ProductForm
            product={editingProduct}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Lista de Productos */}
      {loading && !showForm ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Cargando productos...</p>
        </div>
      ) : (
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onTogglePromotion={handleTogglePromotion}
        />
      )}

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        showPermanentOption={true}
        title="¿Eliminar producto?"
        message={`¿Estás seguro que deseas eliminar "${productToDelete?.nombre}"? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}

export default Dashboard