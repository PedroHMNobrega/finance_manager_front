import { Action } from '@reduxjs/toolkit'
import { runSaga } from 'redux-saga'

export const sagaExec = async (saga): Promise<Action[]> => {
  const dispatched: Action[] = []
  await runSaga({
    dispatch: (action: Action) => dispatched.push(action)
  }, saga)
  return dispatched
}
