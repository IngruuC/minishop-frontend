import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { productsAPI } from '../../services/api'

// Thunks
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

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
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