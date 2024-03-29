import { Purchase } from '@/domain/models'
import { createSlice } from '@reduxjs/toolkit'

type PurchaseState = {
  purchases: Purchase[]
  error: {
    name: string
    message: string
  }
  loading: boolean
  success: boolean
}

const initialState: PurchaseState = {
  purchases: [],
  error: null,
  loading: false,
  success: false
}

const loadPurchasesReducers = {
  loadPurchaseRequest: (state) => {
    state.loading = true
    state.error = null
    state.success = false
  },
  loadPurchaseSuccess: (state, { payload }) => {
    state.loading = false
    state.purchases = payload
  },
  loadPurchaseFail: (state, { payload }) => {
    state.loading = false
    state.error = payload
  }
}

const deletePurchaseReducers = {
  deletePurchaseRequest: (state, { payload }) => {
    state.loading = true
    state.error = null
    state.success = false
  },
  deletePurchaseSuccess: (state, { payload }) => {
    state.loading = false
    state.purchases = state.purchases.filter(purchase => {
      return purchase.id !== payload
    })
  },
  deletePurchaseFail: (state, { payload }) => {
    state.loading = false
    state.error = payload
  }
}

const createPurchaseReducers = {
  createPurchaseRequest: (state, { payload }) => {
    state.loading = true
    state.error = null
    state.success = false
  },
  createPurchaseSuccess: (state, { payload }) => {
    state.loading = false
    state.success = true
    state.purchases = [...state.purchases, payload]
  },
  createPurchaseFail: (state, { payload }) => {
    state.loading = false
    state.error = payload
  }
}

const purchaseSlice = createSlice({
  name: 'purchase',
  initialState,
  reducers: {
    ...loadPurchasesReducers,
    ...deletePurchaseReducers,
    ...createPurchaseReducers
  }
})

export const {
  loadPurchaseRequest,
  loadPurchaseSuccess,
  loadPurchaseFail,
  deletePurchaseRequest,
  deletePurchaseSuccess,
  deletePurchaseFail,
  createPurchaseRequest,
  createPurchaseSuccess,
  createPurchaseFail
} = purchaseSlice.actions

export default purchaseSlice.reducer
