import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productsAPI } from '../../services/api'

// Thunks existentes
export const fetchPublicProducts = createAsyncThunk(
  'products/fetchPublic',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getPublic()
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener productos')
    }
  }
)

export const fetchPromotionProducts = createAsyncThunk(
  'products/fetchPromotions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getPromotions()
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener productos en promoción')
    }
  }
)

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getAll()
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener productos')
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getCategories()
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener categorías')
    }
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      const response = await productsAPI.getByCategory(category)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al obtener productos por categoría')
    }
  }
)

export const createProduct = createAsyncThunk(
  'products/create',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await productsAPI.create(productData)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al crear producto')
    }
  }
)

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await productsAPI.update(id, data)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al actualizar producto')
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, { rejectWithValue }) => {
    try {
      await productsAPI.delete(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar producto')
    }
  }
)

export const deleteProductPermanent = createAsyncThunk(
  'products/deletePermanent',
  async (id, { rejectWithValue }) => {
    try {
      await productsAPI.deletePermanent(id)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al eliminar producto')
    }
  }
)

export const togglePromotion = createAsyncThunk(
  'products/togglePromotion',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productsAPI.togglePromotion(id)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error al cambiar estado de promoción')
    }
  }
)

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    categories: [],
    categoriesLoading: false,
    categoriesError: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Public
      .addCase(fetchPublicProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublicProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchPublicProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch Promotions
      .addCase(fetchPromotionProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPromotionProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchPromotionProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true
        state.categoriesError = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false
        state.categoriesError = action.payload
      })
      // Fetch All
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Fetch Products By Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Create
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.items.unshift(action.payload)
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const index = state.items.findIndex(item => item._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Toggle Promotion
      .addCase(togglePromotion.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      // Delete
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload)
      })
      .addCase(deleteProductPermanent.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload)
      })
  }
})

export const { clearError } = productSlice.actions
export default productSlice.reducer