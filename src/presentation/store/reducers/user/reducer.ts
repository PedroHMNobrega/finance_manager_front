import { createSlice } from '@reduxjs/toolkit'
import { AccountModel } from '@/domain/models'
import { makeLocalStorageJwt } from '@/main/factories/usecases/local-storage-jwt-factory'

type UserState = {
  user: AccountModel
}

const initialState: UserState = {
  user: {
    accessToken: makeLocalStorageJwt().get()
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user.accessToken = payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
