import { MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/tests/domain/mocks'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/presentation/store/store'
import { Router } from 'react-router-dom'
import React from 'react'
import { setUser } from '@/presentation/store/reducers/user-reducer'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel() }: Params): void => {
  if (account) {
    store.dispatch(setUser(account.accessToken))
  }
  render(
    <Provider store={store}>
      <Router location={history.location} navigator={history}>
        <Page />
      </Router>
    </Provider>
  )
}
