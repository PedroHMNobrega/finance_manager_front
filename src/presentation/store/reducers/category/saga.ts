import { getContext, put, all, takeLatest, call, GetContextEffect, AllEffect, ForkEffect, CallEffect, PutEffect } from 'redux-saga/effects'
import { Load, LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import {
  loadCategoryFail,
  loadCategoryRequest,
  loadCategorySuccess
} from '@/presentation/store/reducers/category/reducer'

type SagaType = Generator<GetContextEffect | CallEffect<unknown> | PutEffect<{type: string, payload: any}>, void, unknown>

function * loadCategories (): SagaType {
  try {
    const token = localStorage.getItem('access-token')
    const loadCategories = (yield getContext('loadCategories')) as Load<LoadCategoryListParams, Category[]>
    const response = yield call(loadCategories.loadAll, { token: token })
    yield put(loadCategorySuccess(response))
  } catch (e) {
    yield put(loadCategoryFail(e.message))
  }
}

function * categorySaga (): Generator<AllEffect<ForkEffect<never>>> {
  yield all([takeLatest(loadCategoryRequest.type, loadCategories)])
}

export default categorySaga
