import { fork } from 'redux-saga/effects'
import { CategorySaga } from '@/presentation/store/reducers/'
import { makeRemoteLoad } from '@/main/factories/usecases/remote-http-factory'
import { LoadCategoryListParams } from '@/domain/usecases'
import { Category } from '@/domain/models'
import SagaContainer from '@/presentation/store/reducers/saga-container'

export function * rootSaga (): Generator<any> {
  const sagaContainer = new SagaContainer()

  const token = localStorage.getItem('access-token')

  const loadCategories = makeRemoteLoad<LoadCategoryListParams, Category[]>('/categories/')
  sagaContainer.addSaga(
    new CategorySaga(token, loadCategories)
  )

  return yield fork(sagaContainer.register())
}
