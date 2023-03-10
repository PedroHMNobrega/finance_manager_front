import { combineReducers } from '@reduxjs/toolkit'
import { categoryReducer, userReducer } from '@/presentation/store/reducers/'

const rootReducer = combineReducers({
  user: userReducer,
  category: categoryReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
