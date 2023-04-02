import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import ReduxStore from '@/presentation/store/store'
import { makeRemoteCreate, makeRemoteDelete, makeRemoteLoad } from '@/main/factories/usecases/remote-http-factory'
import {
  CreateCategoryParams, CreatePurchaseParams,
  DeleteCategoryParams, DeletePurchaseParams,
  LoadCategoryListParams,
  LoadPurchaseListParams
} from '@/domain/usecases'
import { Category, Purchase } from '@/domain/models'
import { makeLocalStorageJwt } from '@/main/factories/usecases/local-storage-jwt-factory'

export const makeStore = (): ToolkitStore => {
  const jwtUsecase = makeLocalStorageJwt()
  const loadCategoriesUsecase = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories')
  const deleteCategoryUsecase = makeRemoteDelete<DeleteCategoryParams, void>('/categories')
  const createCategoryUsecase = makeRemoteCreate<CreateCategoryParams, Category>('/categories')
  const loadPurchasesUsecase = makeRemoteLoad<LoadPurchaseListParams, Purchase[]>('/purchases')
  const deletePurchaseUsecase = makeRemoteDelete<DeletePurchaseParams, void>('/purchases')
  const createPurchaseUsecase = makeRemoteCreate<CreatePurchaseParams, Purchase>('/purchases')

  const reduxStore = new ReduxStore({
    jwtUsecase,
    loadCategoriesUsecase,
    deleteCategoryUsecase,
    createCategoryUsecase,
    loadPurchasesUsecase,
    deletePurchaseUsecase,
    createPurchaseUsecase
  })
  return reduxStore.create()
}
