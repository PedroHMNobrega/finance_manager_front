import { Action } from '@reduxjs/toolkit'
import { runSaga } from 'redux-saga'

export const sagaExec = async (saga, params = null): Promise<Action[]> => {
  const dispatched: Action[] = []
  await runSaga(
    {
      dispatch: (action: Action) => dispatched.push(action)
    },
    saga,
    {
      payload: params
    }
  )
  return dispatched
}
