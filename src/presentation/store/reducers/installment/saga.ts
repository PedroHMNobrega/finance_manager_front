import SagaInterface from '@/presentation/store/reducers/saga-interface'
import { GetJwt, Load, LoadInstallmentListParams } from '@/domain/usecases'
import { Installment } from '@/domain/models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  loadInstallmentsFail,
  loadInstallmentsRequest,
  loadInstallmentsSuccess, updateInstallmentFail, updateInstallmentRequest, updateInstallmentSuccess
} from '@/presentation/store/reducers/installment/reducer'
import { Update } from '@/domain/usecases/update'
import { UpdateInstallmentParams } from '@/domain/usecases/installment/update-installment'
import { ReduxAction } from '@/presentation/store/reducers/root-reducer'

class InstallmentSaga implements SagaInterface {
  constructor (
    private readonly getJwt: GetJwt,
    private readonly loadInstallmentUsecase: Load<LoadInstallmentListParams, Installment[]>,
    private readonly updateInstallmentUsecase: Update<UpdateInstallmentParams, Installment>
  ) {}

  loadInstallments (): (ReduxAction) => Generator<any> {
    const { loadInstallmentUsecase, getJwt } = this
    return function * (action: ReduxAction) {
      try {
        const token = getJwt.get()
        const response = yield call(loadInstallmentUsecase.loadAll, { token: token, params: action.payload })
        yield put(loadInstallmentsSuccess(response))
      } catch (e) {
        yield put(loadInstallmentsFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  updateInstallment (): (ReduxAction) => Generator<any> {
    const { updateInstallmentUsecase, getJwt } = this
    return function * (action: ReduxAction) {
      try {
        const token = getJwt.get()
        const installment = action.payload.body
        const installmentId = action.payload.id
        const response = yield call(updateInstallmentUsecase.update, {
          token,
          body: installment,
          id: installmentId
        })
        yield put(updateInstallmentSuccess(response))
      } catch (e) {
        yield put(updateInstallmentFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  * register (): Iterable<any> {
    yield all([
      takeLatest(loadInstallmentsRequest.type, this.loadInstallments()),
      takeLatest(updateInstallmentRequest.type, this.updateInstallment())
    ])
  }
}

export default InstallmentSaga
