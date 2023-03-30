import { Category } from '@/domain/models'
import { createSlice } from '@reduxjs/toolkit'

type CategoryState = {
  categories: Category[]
  error: {
    name: string
    message: string
  }
  loading: boolean
  loadingId: number
  type: string
}

const initialState: CategoryState = {
  categories: [],
  error: null,
  loading: false,
  loadingId: null,
  type: ''
}

const loadCategoriesReducers = {
  loadCategoryRequest: (state) => {
    state.loading = true
    state.error = null
    state.type = 'load'
  },
  loadCategorySuccess: (state, { payload }) => {
    state.loading = false
    state.type = ''
    state.categories = payload
  },
  loadCategoryFail: (state, { payload }) => {
    state.loading = false
    state.error = payload
  }
}

const deleteCategoryReducers = {
  deleteCategoryRequest: (state, { payload }) => {
    state.loading = true
    state.loadingId = payload
    state.error = null
    state.type = 'delete'
  },
  deleteCategorySuccess: (state, { payload }) => {
    state.loading = false
    state.loadingData = null
    state.type = ''
    state.categories = state.categories.filter(category => {
      return category.id !== payload
    })
  },
  deleteCategoryFail: (state, { payload }) => {
    state.loading = false
    state.loadingData = null
    state.error = payload
  }
}

const createCategoryReducers = {
  createCategoryRequest: (state) => {
    state.loading = true
    state.error = null
    state.type = 'create'
  },
  createCategorySuccess: (state, { payload }) => {
    state.loading = false
    state.type = ''
    state.categories = state.categories.push(payload)
  },
  createCategoryFail: (state, { payload }) => {
    state.loading = false
    state.error = payload
  }
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    ...loadCategoriesReducers,
    ...deleteCategoryReducers,
    ...createCategoryReducers
  }
})

export const {
  loadCategoryRequest,
  loadCategorySuccess,
  loadCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail,
  createCategoryRequest,
  createCategorySuccess,
  createCategoryFail
} = categorySlice.actions

export default categorySlice.reducer
