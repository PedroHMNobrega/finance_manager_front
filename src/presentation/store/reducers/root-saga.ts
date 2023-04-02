import { fork } from 'redux-saga/effects'
import { CategorySaga, PurchaseSaga, UserSaga } from '@/presentation/store/reducers/'
import {
  Create,
  CreateCategoryParams, CreatePurchaseParams,
  Delete,
  DeleteCategoryParams, DeletePurchaseParams,
  Load,
  LoadCategoryListParams, LoadPurchaseListParams
} from '@/domain/usecases'
import { Category, Purchase } from '@/domain/models'
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
    new PurchaseSaga(
      usecases.jwtUsecase,
      usecases.loadPurchasesUsecase,
      usecases.deletePurchaseUsecase,
      usecases.createPurchaseUsecase
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
  loadPurchasesUsecase: Load<LoadPurchaseListParams, Purchase[]>
  deletePurchaseUsecase: Delete<DeletePurchaseParams, void>
  createPurchaseUsecase: Create<CreatePurchaseParams, Purchase>
}
