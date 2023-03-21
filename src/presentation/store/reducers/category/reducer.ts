import { Category } from '@/domain/models'
import { createSlice } from '@reduxjs/toolkit'

type CategoryState = {
  categories: Category[]
  errorMessage: string
  loading: boolean
}

const initialState: CategoryState = {
  categories: [],
  errorMessage: '',
  loading: false
}

const loadCategoriesReducers = {
  loadCategoryRequest: (state) => {
    state.loading = true
    state.errorMessage = ''
  },
  loadCategorySuccess: (state, { payload }) => {
    state.loading = false
    state.categories = payload
  },
  loadCategoryFail: (state, { payload }) => {
    state.loading = false
    state.errorMessage = payload
  }
}

const deleteCategoryReducers = {
  deleteCategoryRequest: (state) => {
    state.loading = true
    state.errorMessage = ''
  },
  deleteCategorySuccess: (state, { payload }) => {
    state.loading = false
    state.categories = state.categories.filter(category => {
      return category.id !== payload
    })
  },
  deleteCategoryFail: (state, { payload }) => {
    state.loading = false
    state.errorMessage = payload
  }
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    ...loadCategoriesReducers,
    ...deleteCategoryReducers
  }
})

export const {
  loadCategoryRequest,
  loadCategorySuccess,
  loadCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFail
} = categorySlice.actions

export default categorySlice.reducer
