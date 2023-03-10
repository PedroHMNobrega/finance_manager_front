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

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
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
})

export const { loadCategoryRequest, loadCategorySuccess, loadCategoryFail } = categorySlice.actions

export default categorySlice.reducer
