import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  createCategoryFail, createCategoryRequest, createCategorySuccess,
  deleteCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  loadCategoryFail,
  loadCategoryRequest,
  loadCategorySuccess
} from '@/presentation/store/reducers/category/reducer'
import SagaInterface from '@/presentation/store/reducers/saga-interface'
import {
  Create,
  CreateCategoryParams,
  Delete,
  DeleteCategoryParams,
  GetJwt,
  Load,
  LoadCategoryListParams
} from '@/domain/usecases'
import { Category } from '@/domain/models'
import { ReduxAction } from '@/presentation/store/reducers/root-reducer'

class CategorySaga implements SagaInterface {
  constructor (
    private readonly getJwt: GetJwt,
    private readonly loadCategoriesUsecase: Load<LoadCategoryListParams, Category[]>,
    private readonly deleteCategoryUsecase: Delete<DeleteCategoryParams, void>,
    private readonly createCategoryUsecase: Create<CreateCategoryParams, Category>
  ) {}

  loadCategories (): () => Generator<any> {
    const { loadCategoriesUsecase, getJwt } = this
    return function * () {
      try {
        const token = getJwt.get()
        const response = yield call(loadCategoriesUsecase.loadAll, { token: token })
        yield put(loadCategorySuccess(response))
      } catch (e) {
        yield put(loadCategoryFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  deleteCategory (): (ReduxAction) => Generator<any> {
    const { getJwt, deleteCategoryUsecase } = this
    return function * (action: ReduxAction) {
      try {
        const token = getJwt.get()
        const id = action.payload
        yield call(deleteCategoryUsecase.delete, {
          token: token,
          id: id
        })
        yield put(deleteCategorySuccess(id))
      } catch (e) {
        yield put(deleteCategoryFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  createCategory (): (ReduxAction) => Generator<any> {
    const { getJwt, createCategoryUsecase } = this
    return function * (action: ReduxAction) {
      try {
        const token = getJwt.get()
        const category = action.payload
        const response = yield call(createCategoryUsecase.create, {
          token: token,
          body: {
            name: category
          }
        })
        yield put(createCategorySuccess(response))
      } catch (e) {
        yield put(createCategoryFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  * register (): Iterable<any> {
    yield all([
      takeLatest(loadCategoryRequest.type, this.loadCategories()),
      takeLatest(deleteCategoryRequest.type, this.deleteCategory()),
      takeLatest(createCategoryRequest.type, this.createCategory())
    ])
  }
}

export default CategorySaga
