import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  loadCategoryFail,
  loadCategoryRequest,
  loadCategorySuccess
} from '@/presentation/store/reducers/category/reducer'
import SagaInterface from '@/presentation/store/reducers/saga-interface'

class CategorySaga implements SagaInterface {
  constructor (
    private readonly remoteLoadCategories
  ) {}

  loadCategories (): () => Generator<any> {
    const { remoteLoadCategories } = this
    return function * () {
      try {
        const token = localStorage.getItem('access-token')
        const response = yield call(remoteLoadCategories.loadAll, { token: token })
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