import { Installment } from '@/domain/models'
import { createSlice } from '@reduxjs/toolkit'

type InstallmentState = {
  installments: Installment[]
  error: {
    name: string
    message: string
  }
  loading: boolean
  loadingId: number
}

const initialState: InstallmentState = {
  installments: [],
  error: null,
  loading: false,
  loadingId: null
}

const loadInstallmentsReducers = {
  loadInstallmentsRequest: (state) => {
    state.loading = true
    state.error = null
  },
  loadInstallmentsSuccess: (state, { payload }) => {
    state.loading = false
    state.installments = payload
  },
  loadInstallmentsFail: (state, { payload }) => {
    state.loading = false
    state.error = payload
  }
}

const updateInstallmentReducers = {
  updateInstallmentRequest: (state, { payload }) => {
    state.loading = true
    state.loadingId = payload
    state.error = null
  },
  updateInstallmentSuccess: (state, { payload }) => {
    state.loading = false
    state.loadingId = null
    state.installments = state.installments.map(installment => {
      if (installment.id === payload.id) {
        return payload
      }
      return installment
    })
  },
  updateInstallmentFail: (state, { payload }) => {
    state.loading = false
    state.loadingId = null
    state.error = payload
  }
}

const installmentSlice = createSlice({
  name: 'installment',
  initialState,
  reducers: {
    ...loadInstallmentsReducers,
    ...updateInstallmentReducers
  }
})

export const {
  loadInstallmentsRequest,
  loadInstallmentsSuccess,
  loadInstallmentsFail,
  updateInstallmentSuccess,
  updateInstallmentFail,
  updateInstallmentRequest
} = installmentSlice.actions

export default installmentSlice.reducer
