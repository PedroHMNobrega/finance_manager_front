import SagaInterface from '@/presentation/store/reducers/saga-interface'
import { GetJwt, Load, LoadPurchaseListParams } from '@/domain/usecases'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  loadPurchaseFail,
  loadPurchaseRequest,
  loadPurchaseSuccess
} from '@/presentation/store/reducers/purchase/reducer'
import { Purchase } from '@/domain/models'

class PurchaseSaga implements SagaInterface {
  constructor (
    private readonly getJwt: GetJwt,
    private readonly loadPurchasesUsecase: Load<LoadPurchaseListParams, Purchase[]>
  ) {}

  loadPurchases (): () => Generator<any> {
    const { getJwt, loadPurchasesUsecase } = this
    return function * () {
      try {
        const token = getJwt.get()
        const response = yield call(loadPurchasesUsecase.loadAll, { token: token })
        yield put(loadPurchaseSuccess(response))
      } catch (e) {
        yield put(loadPurchaseFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  * register (): Iterable<any> {
    yield all([
      takeLatest(loadPurchaseRequest.type, this.loadPurchases)
    ])
  }
}

export default PurchaseSaga
