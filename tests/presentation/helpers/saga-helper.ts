import { Action } from '@reduxjs/toolkit'
import { runSaga } from 'redux-saga'
import { UnexpectedError } from '@/domain/errors'

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

export const mockLoading = (mock: jest.Mock): void => {
  jest.useFakeTimers()
  mock.mockImplementation(async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 2000)
    })
  })
}

export const mockError = (mock: jest.Mock): void => {
  mock.mockImplementation(() => {
    throw new UnexpectedError()
  })
}
