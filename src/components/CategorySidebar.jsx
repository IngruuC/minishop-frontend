import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchCategories, fetchProductsByCategory } from '../store/slices/productSlice'
import { productsAPI } from '../services/api'

const CategorySidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { categories, categoriesLoading } = useSelector((state) => state.products)
  const [counts, setCounts] = useState({})
  const [loadingCounts, setLoadingCounts] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  useEffect(() => {
    let mounted = true
    const loadCounts = async () => {
      if (!categories || categories.length === 0) return
      setLoadingCounts(true)
      try {
        const promises = categories.map((cat) => productsAPI.getByCategory(cat).then(res => ({ cat, count: (res.data.data || []).length })).catch(() => ({ cat, count: 0 })))
        const results = await Promise.all(promises)
        if (!mounted) return
        const map = {}
        results.forEach(r => { map[r.cat] = r.count })
        setCounts(map)
      } finally {
        if (mounted) setLoadingCounts(false)
      }
    }
    loadCounts()
    return () => { mounted = false }
  }, [categories])

  const handleClick = (cat) => {
    // Navigate and dispatch thunk to load products for the category
    const encoded = encodeURIComponent(cat)
    navigate(`/category/${encoded}`)
    dispatch(fetchProductsByCategory(cat))
    // If current location already is category route, force scroll
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
          {categories.length === 0 && (
            <li className="text-sm text-gray-500">No hay categorías</li>
          )}
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => handleClick(cat)}
                className="w-full flex justify-between items-center text-left px-3 py-2 rounded hover:bg-gray-50 transition text-sm"
              >
                <span className="truncate">{cat}</span>
                <span className="ml-3 text-xs text-gray-600">{loadingCounts ? '...' : (counts[cat] ?? 0)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default CategorySidebar
