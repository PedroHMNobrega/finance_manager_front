import { combineReducers } from '@reduxjs/toolkit'
import { categoryReducer, installmentReducer, purchaseReducer, userReducer } from '@/presentation/store/reducers/'

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer,
  purchase: purchaseReducer,
  installment: installmentReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type ReduxAction = {
  type: string
  payload: any
}

export default rootReducer
