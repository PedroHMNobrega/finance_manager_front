import { fork } from 'redux-saga/effects'
import { CategorySaga, UserSaga } from '@/presentation/store/reducers/'
import {
  Create,
  CreateCategoryParams,
  Delete,
  DeleteCategoryParams,
  Load,
  LoadCategoryListParams
} from '@/domain/usecases'
import { Category } from '@/domain/models'
import SagaContainer from '@/presentation/store/reducers/saga-container'
import { LocalStorageJwt } from '@/data/usecases/authentication'

export function * rootSaga (usecases: SagaUseCases): Generator<any> {
  const sagaContainer = new SagaContainer()

  sagaContainer.addSaga(
    new CategorySaga(
      usecases.jwtUsecase,
      usecases.loadCategoriesUsecase,
      usecases.deleteCategoryUsecase,
      usecases.createCategoryUsecase
    )
  )

  sagaContainer.addSaga(
    new UserSaga(usecases.jwtUsecase)
  )

  return yield fork(sagaContainer.register())
}

export type SagaUseCases = {
  jwtUsecase: LocalStorageJwt
  loadCategoriesUsecase: Load<LoadCategoryListParams, Category[]>
  deleteCategoryUsecase: Delete<DeleteCategoryParams, void>
  createCategoryUsecase: Create<CreateCategoryParams, Category>
}
