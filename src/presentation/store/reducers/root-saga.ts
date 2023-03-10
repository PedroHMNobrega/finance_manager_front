import { all, fork, AllEffect, ForkEffect } from 'redux-saga/effects'
import { categorySaga } from '@/presentation/store/reducers/'

export function * rootSaga (): Generator<AllEffect<ForkEffect<void>>> {
  yield all([fork(categorySaga)])
}
