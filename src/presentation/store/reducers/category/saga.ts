import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  deleteCategoryFail,
  deleteCategoryRequest,
  deleteCategorySuccess,
  loadCategoryFail,
  loadCategoryRequest,
  loadCategorySuccess
} from '@/presentation/store/reducers/category/reducer'
import SagaInterface from '@/presentation/store/reducers/saga-interface'
import { Delete, DeleteCategoryParams, GetJwt, Load, LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import { ReduxAction } from '@/presentation/store/reducers/root-reducer'

class CategorySaga implements SagaInterface {
  constructor (
    private readonly getJwt: GetJwt,
    private readonly loadCategoriesUsecase: Load<LoadCategoryListParams, Category[]>,
    private readonly deleteCategoryUsecase: Delete<DeleteCategoryParams, void>
  ) {}

  loadCategories (): () => Generator<any> {
    const { loadCategoriesUsecase, getJwt } = this
    return function * () {
      try {
        const token = getJwt.get()
        const response = yield call(loadCategoriesUsecase.loadAll, { token: token })
        yield put(loadCategorySuccess(response))
      } catch (e) {
        yield put(loadCategoryFail(e.message))
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
        yield put(deleteCategoryFail(e.message))
      }
    }
  }

  * register (): Iterable<any> {
    yield all([
      takeLatest(loadCategoryRequest.type, this.loadCategories()),
      takeLatest(deleteCategoryRequest.type, this.deleteCategory())
    ])
  }
}

export default CategorySaga
