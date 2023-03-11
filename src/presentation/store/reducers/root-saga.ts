import { all, fork } from 'redux-saga/effects'
import { CategorySaga } from '@/presentation/store/reducers/'
import SagaI from '@/presentation/store/reducers/SagaI'
import { makeRemoteLoad } from '@/main/factories/usecases/remote-http-factory'
import { LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'

export default class SagaContainer {
  private readonly sagas: SagaI[] = []

  addSaga (saga: SagaI): void {
    this.sagas.push(saga)
  }

  register (): () => Generator<any> {
    const sagas = this.sagas
    return function * () {
      yield all(sagas.map(saga => saga.register()))
    }
  }
}

export function * rootSaga (): Generator<any> {
  const sagaContainer = new SagaContainer()

  const loadCategories = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories/')
  sagaContainer.addSaga(
    new CategorySaga(loadCategories)
  )

  return yield fork(sagaContainer.register())
}
