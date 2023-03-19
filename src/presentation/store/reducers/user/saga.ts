import SagaInterface from '@/presentation/store/reducers/saga-interface'
import { all, takeLatest } from 'redux-saga/effects'
import { SetJwt } from '@/domain/usecases'
import { setUser } from '@/presentation/store/reducers/user/reducer'
import { ReduxAction } from '@/presentation/store/reducers/root-reducer'

class UserSaga implements SagaInterface {
  constructor (
    private readonly setJwt: SetJwt
  ) {}

  setUser (): (ReduxAction) => Generator<any> {
    const { setJwt } = this
    return function * (action: ReduxAction) {
      try {
        setJwt.set(action.payload)
      } catch (e) {}
    }
  }

  * register (): Iterable<any> {
    yield all([takeLatest(setUser.type, this.setUser())])
  }
}

export default UserSaga
