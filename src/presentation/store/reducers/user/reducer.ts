import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AccountModel } from '@/domain/models'

type UserState = {
  user: AccountModel
}

const initialState: UserState = {
  user: {
    accessToken: localStorage.getItem('access-token')
  }
}

// TODO: Remove localstorage side effect
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      localStorage.setItem('access-token', action.payload)
      state.user.accessToken = action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
