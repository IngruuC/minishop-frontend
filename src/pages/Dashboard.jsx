import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../store/slices/productSlice'
import ProductList from '../components/ProductList'
import ProductForm from '../components/ProductForm'
import ConfirmModal from '../components/ConfirmModal'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { items: products, loading, error } = useSelector((state) => state.products)
  const { user } = useSelector((state) => state.auth)

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

  const confirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete._id)).then(() => {
        setShowDeleteModal(false)
        setProductToDelete(null)
        dispatch(fetchAllProducts())
      })
    }
  }

  const handleSubmit = (data) => {
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct._id, data })).then(() => {
        setShowForm(false)
        setEditingProduct(null)
        dispatch(fetchAllProducts())
      })
    } else {
      dispatch(createProduct(data)).then(() => {
        setShowForm(false)
        dispatch(fetchAllProducts())
      })
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

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
        />
      )}

      {/* Modal de Confirmación */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="¿Eliminar producto?"
        message={`¿Estás seguro que deseas eliminar "${productToDelete?.nombre}"? Esta acción no se puede deshacer.`}
      />
    </div>
  )
}

export default Dashboard