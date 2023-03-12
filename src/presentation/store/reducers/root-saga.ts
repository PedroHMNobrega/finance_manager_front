import { fork } from 'redux-saga/effects'
import { CategorySaga } from '@/presentation/store/reducers/'
import { makeRemoteLoad } from '@/main/factories/usecases/remote-http-factory'
import { LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import SagaContainer from '@/presentation/store/reducers/saga-container'
import { makeLocalStorageJwt } from '@/main/factories/usecases/local-storage-jwt-factory'

export function * rootSaga (): Generator<any> {
  const sagaContainer = new SagaContainer()

  const jwtUsecase = makeLocalStorageJwt()

  const loadCategoriesUsecase = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories/')
  sagaContainer.addSaga(
    new CategorySaga(loadCategoriesUsecase, jwtUsecase)
  )

  return yield fork(sagaContainer.register())
}
