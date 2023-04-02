import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import ReduxStore from '@/presentation/store/store'
import { deleteSpy, getJwtSpy, loadSpy, createSpy, setJwtSpy } from '@/tests/data/mocks'
import { LocalStorageJwt } from '@/data/usecases/authentication'

type MockMakeStoreReturn = {
  sagaUsecases: SagaUseCases
  store: ToolkitStore
}

export const mockMakeStore = (): MockMakeStoreReturn => {
  const sagaUsecases = {
    jwtUsecase: {
      ...getJwtSpy(),
      ...setJwtSpy()
    } as unknown as LocalStorageJwt,
    loadCategoriesUsecase: loadSpy(),
    deleteCategoryUsecase: deleteSpy(),
    createCategoryUsecase: createSpy(),
    loadPurchasesUsecase: loadSpy(),
    deletePurchaseUsecase: deleteSpy(),
    createPurchaseUsecase: createSpy()
  }

  const reduxStore = new ReduxStore(sagaUsecases)

  const store = reduxStore.create()

  return {
    sagaUsecases,
    store
  }
}
