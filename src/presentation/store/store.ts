import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import reducers from '@/presentation/store/reducers/root-reducer'
import { rootSaga } from '@/presentation/store/reducers/root-saga'
import { makeRemoteLoad } from '@/main/factories/usecases/remote-http-factory'
import { LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'

const loadCategories = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories/')

const sagaMiddleware = createSagaMiddleware({
  context: {
    loadCategories
  }
})
const middleware = [sagaMiddleware]

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
})

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
