import { all } from 'redux-saga/effects'
import SagaInterface from '@/presentation/store/reducers/saga-interface'

export default class SagaContainer {
  private readonly sagas: SagaInterface[] = []

  addSaga (saga: SagaInterface): void {
    this.sagas.push(saga)
  }

  register (): () => Generator<any> {
    const sagas = this.sagas
    return function * () {
      yield all(sagas.map(saga => saga.register()))
    }
  }
}
