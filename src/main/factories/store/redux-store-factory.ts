import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import ReduxStore from '@/presentation/store/store'
import { makeRemoteCreate, makeRemoteDelete, makeRemoteLoad } from '@/main/factories/usecases/remote-http-factory'
import { CreateCategoryParams, DeleteCategoryParams, LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import { makeLocalStorageJwt } from '@/main/factories/usecases/local-storage-jwt-factory'

export const makeStore = (): ToolkitStore => {
  const jwtUsecase = makeLocalStorageJwt()
  const loadCategoriesUsecase = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories')
  const deleteCategoryUsecase = makeRemoteDelete<DeleteCategoryParams, void>('/categories')
  const createCategoryUsecase = makeRemoteCreate<CreateCategoryParams, Category>('/categories')

  const reduxStore = new ReduxStore({
    jwtUsecase,
    loadCategoriesUsecase,
    deleteCategoryUsecase,
    createCategoryUsecase
  })
  return reduxStore.create()
}
