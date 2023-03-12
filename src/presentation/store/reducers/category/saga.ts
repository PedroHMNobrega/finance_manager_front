import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  loadCategoryFail,
  loadCategoryRequest,
  loadCategorySuccess
} from '@/presentation/store/reducers/category/reducer'
import SagaInterface from '@/presentation/store/reducers/saga-interface'
import { GetJwt, Load, LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'

class CategorySaga implements SagaInterface {
  constructor (
    private readonly loadCategoriesUsecase: Load<LoadCategoryListParams, Category[]>,
    private readonly getJwt: GetJwt
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

  * register (): Iterable<any> {
    yield all([takeLatest(loadCategoryRequest.type, this.loadCategories())])
  }
}

export default CategorySaga
