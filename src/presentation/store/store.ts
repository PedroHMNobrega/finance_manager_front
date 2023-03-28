import createSagaMiddleware from 'redux-saga'
import { configureStore, Dispatch, ThunkDispatch } from '@reduxjs/toolkit'
import reducers from '@/presentation/store/reducers/root-reducer'
import { rootSaga, SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export default class ReduxStore {
  constructor (
    private readonly sagaUseCases: SagaUseCases
  ) {}

  create (): ToolkitStore {
    const store = configureStore({
      reducer: reducers,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
    })
    sagaMiddleware.run(rootSaga, this.sagaUseCases)

    return store
  }
}

export type AppDispatch = ThunkDispatch<any, any, any> & Dispatch
