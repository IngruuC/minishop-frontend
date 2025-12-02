import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { fetchCategories, fetchProductsByCategory } from '../store/slices/productSlice'

const CategorySidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { categories, categoriesLoading } = useSelector((state) => state.products)
  const { category: categoryParam } = useParams()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const handleClick = (categoryName) => {
    const encoded = encodeURIComponent(categoryName)
    navigate(`/category/${encoded}`)
    dispatch(fetchProductsByCategory(categoryName))
    if (location.pathname.startsWith('/category/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <aside className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Categorías</h3>
      {categoriesLoading ? (
        <div className="text-sm text-gray-500">Cargando categorías...</div>
      ) : (
        <ul className="space-y-2">
          {(!categories || categories.length === 0) && (
            <li className="text-sm text-gray-500">No hay categorías</li>
          )}
          {categories.map((catObj) => {
            const active = categoryParam ? decodeURIComponent(categoryParam) === catObj.category : false
            return (
              <li key={catObj.slug}>
                <button
                  onClick={() => handleClick(catObj.category)}
                  className={`w-full flex justify-between items-center text-left px-3 py-2 rounded transition text-sm ${active ? 'bg-blue-50 font-semibold text-blue-700' : 'hover:bg-gray-50 text-gray-700'}`}
                  aria-current={active ? 'true' : undefined}
                >
                  <span className="truncate">{catObj.category}</span>
                  <span className="ml-3 text-xs text-gray-600">{catObj.count ?? 0}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </aside>
  )
}

export default CategorySidebar
