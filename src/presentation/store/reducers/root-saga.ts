import { fork } from 'redux-saga/effects'
import { CategorySaga, UserSaga } from '@/presentation/store/reducers/'
import { makeRemoteCreate, makeRemoteDelete, makeRemoteLoad } from '@/main/factories/usecases/remote-http-factory'
import { CreateCategoryParams, DeleteCategoryParams, LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import SagaContainer from '@/presentation/store/reducers/saga-container'
import { makeLocalStorageJwt } from '@/main/factories/usecases/local-storage-jwt-factory'

export function * rootSaga (): Generator<any> {
  const sagaContainer = new SagaContainer()

  const jwtUsecase = makeLocalStorageJwt()

  const loadCategoriesUsecase = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories/')
  const deleteCategoryUsecase = makeRemoteDelete<DeleteCategoryParams, void>('/categories/')
  const createCategoryUsecase = makeRemoteCreate<CreateCategoryParams, Category>('/categories/')
  sagaContainer.addSaga(
    new CategorySaga(jwtUsecase, loadCategoriesUsecase, deleteCategoryUsecase, createCategoryUsecase)
  )

  sagaContainer.addSaga(
    new UserSaga(jwtUsecase)
  )

  return yield fork(sagaContainer.register())
}
