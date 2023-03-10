import { getContext, put, all, takeLatest, call, GetContextEffect, AllEffect, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects'
import { LoadCategories } from '@/presentation/store/reducers/category/actions'
import { CategoryTypes } from '@/presentation/store/reducers/category/types'
import { Load, LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'

type SagaType = Generator<GetContextEffect | CallEffect<unknown> | PutEffect<{type: string, payload: any}>, void, unknown>

function * loadCategories (): SagaType {
  try {
    const token = localStorage.getItem('access-token')
    const loadCategories = (yield getContext('loadCategories')) as Load<LoadCategoryListParams, Category[]>
    const response = yield call(loadCategories.loadAll, { token: token })
    yield put(LoadCategories.success(response))
  } catch (e) {
    yield put(LoadCategories.fail(e.message))
  }
}

function * categorySaga (): Generator<AllEffect<ForkEffect<never>>> {
  yield all([takeLatest(CategoryTypes.REQUEST, loadCategories)])
}

export default categorySaga
