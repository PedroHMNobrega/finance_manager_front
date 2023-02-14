// TODO: Fix that
/* eslint-disable import/first */
localStorage.setItem('access-token', 'any-token')

import { AccountModel } from '@/domain/models'
import { setUser } from '@/presentation/store/reducers/user-reducer'
import { userReducer } from '@/presentation/store/reducers'

describe('UserReducer', () => {
  it('should return correct initial state', () => {
    const accessToken = 'any-token'
    const user: AccountModel = {
      accessToken
    }
    expect(userReducer(undefined, { type: undefined })).toStrictEqual({ user })
  })

  it('should set user correctly', () => {
    const previousState = {
      user: {
        accessToken: 'anyToken'
      }
    }
    const expectedState = {
      user: {
        accessToken: 'new-token'
      }
    }
    expect(userReducer(previousState, setUser('new-token'))).toStrictEqual(expectedState)
  })
})
