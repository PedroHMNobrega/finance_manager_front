import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import ReduxStore from '@/presentation/store/store'
import {
  makeRemoteCreate,
  makeRemoteDelete,
  makeRemoteLoad,
  makeRemoteUpdate
} from '@/main/factories/usecases/remote-http-factory'
import {
  CreateCategoryParams, CreatePurchaseParams,
  DeleteCategoryParams, DeletePurchaseParams,
  LoadCategoryListParams, LoadInstallmentListParams,
  LoadPurchaseListParams
} from '@/domain/usecases'
import { Category, Installment, Purchase } from '@/domain/models'
import { makeLocalStorageJwt } from '@/main/factories/usecases/local-storage-jwt-factory'
import { UpdateInstallmentParams } from '@/domain/usecases/installment/update-installment'

export const makeStore = (): ToolkitStore => {
  const jwtUsecase = makeLocalStorageJwt()
  const loadCategoriesUsecase = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories')
  const deleteCategoryUsecase = makeRemoteDelete<DeleteCategoryParams, void>('/categories')
  const createCategoryUsecase = makeRemoteCreate<CreateCategoryParams, Category>('/categories')
  const loadPurchasesUsecase = makeRemoteLoad<LoadPurchaseListParams, Purchase[]>('/purchases')
  const deletePurchaseUsecase = makeRemoteDelete<DeletePurchaseParams, void>('/purchases')
  const createPurchaseUsecase = makeRemoteCreate<CreatePurchaseParams, Purchase>('/purchases')
  const loadInstallmentsUsecase = makeRemoteLoad<LoadInstallmentListParams, Installment[]>('/installments')
  const updateInstallmentUsecase = makeRemoteUpdate<UpdateInstallmentParams, Installment>('/installments')

  const reduxStore = new ReduxStore({
    jwtUsecase,
    loadCategoriesUsecase,
    deleteCategoryUsecase,
    createCategoryUsecase,
    loadPurchasesUsecase,
    deletePurchaseUsecase,
    createPurchaseUsecase,
    loadInstallmentsUsecase,
    updateInstallmentUsecase
  })
  return reduxStore.create()
}
