import SagaInterface from '@/presentation/store/reducers/saga-interface'
import {
  Create,
  CreatePurchaseParams,
  Delete,
  DeletePurchaseParams,
  GetJwt,
  Load,
  LoadPurchaseListParams
} from '@/domain/usecases'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  createPurchaseFail,
  createPurchaseRequest, createPurchaseSuccess,
  deletePurchaseFail, deletePurchaseRequest,
  deletePurchaseSuccess,
  loadPurchaseFail,
  loadPurchaseRequest,
  loadPurchaseSuccess
} from '@/presentation/store/reducers/purchase/reducer'
import { Purchase } from '@/domain/models'
import { ReduxAction } from '@/presentation/store/reducers/root-reducer'

class PurchaseSaga implements SagaInterface {
  constructor (
    private readonly getJwt: GetJwt,
    private readonly loadPurchasesUsecase: Load<LoadPurchaseListParams, Purchase[]>,
    private readonly deletePurchaseUsecase: Delete<DeletePurchaseParams, void>,
    private readonly createPurchaseUsecase: Create<CreatePurchaseParams, Purchase>
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

  deletePurchase (): (ReduxAction) => Generator<any> {
    const { getJwt, deletePurchaseUsecase } = this
    return function * (action: ReduxAction) {
      try {
        const token = getJwt.get()
        const id = action.payload
        yield call(deletePurchaseUsecase.delete, {
          token,
          id
        })
        yield put(deletePurchaseSuccess(id))
      } catch (e) {
        yield put(deletePurchaseFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  createPurchase (): (ReduxAction) => Generator<any> {
    const { getJwt, createPurchaseUsecase } = this
    return function * (action: ReduxAction) {
      try {
        const token = getJwt.get()
        const purchase = action.payload
        const response = yield call(createPurchaseUsecase.create, {
          token,
          body: purchase
        })
        yield put(createPurchaseSuccess(response))
      } catch (e) {
        yield put(createPurchaseFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  * register (): Iterable<any> {
    yield all([
      takeLatest(loadPurchaseRequest.type, this.loadPurchases()),
      takeLatest(deletePurchaseRequest.type, this.deletePurchase()),
      takeLatest(createPurchaseRequest.type, this.createPurchase())
    ])
  }
}

export default PurchaseSaga
