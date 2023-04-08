import SagaInterface from '@/presentation/store/reducers/saga-interface'
import { GetJwt, Load, LoadInstallmentListParams } from '@/domain/usecases'
import { Installment } from '@/domain/models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  loadInstallmentsFail,
  loadInstallmentsRequest,
  loadInstallmentsSuccess
} from '@/presentation/store/reducers/installment/reducer'

class InstallmentSaga implements SagaInterface {
  constructor (
    private readonly getJwt: GetJwt,
    private readonly loadInstallmentUsecase: Load<LoadInstallmentListParams, Installment[]>
  ) {}

  loadInstallments (): () => Generator<any> {
    const { loadInstallmentUsecase, getJwt } = this
    return function * () {
      try {
        const token = getJwt.get()
        const response = yield call(loadInstallmentUsecase.loadAll, { token: token })
        yield put(loadInstallmentsSuccess(response))
      } catch (e) {
        yield put(loadInstallmentsFail({
          name: e.name,
          message: e.message
        }))
      }
    }
  }

  * register (): Iterable<any> {
    yield all([
      takeLatest(loadInstallmentsRequest.type, this.loadInstallments())
    ])
  }
}

export default InstallmentSaga
