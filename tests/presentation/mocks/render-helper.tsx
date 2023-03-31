import { MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/tests/domain/mocks'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import React from 'react'
import { setUser } from '@/presentation/store/reducers/user/reducer'
import { makeStore } from '@/main/factories/store/redux-store-factory'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { mockMakeStore } from '@/tests/main/mocks/mock-redux-store-factory'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

type RenderWithHistoryParams = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel() }: RenderWithHistoryParams): void => {
  const store = makeStore()
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

type RenderWithProviderParams = {
  Page: React.FC
}

type RenderWithProviderReturn = {
  sagaUsecases: SagaUseCases
  renderScreen: Function
  store: ToolkitStore
}

export const renderWithProvider = ({ Page }: RenderWithProviderParams): RenderWithProviderReturn => {
  const {
    store,
    sagaUsecases
  } = mockMakeStore()

  const renderScreen = (): void => {
    render(
      <Provider store={store}>
        <Page />
      </Provider>
    )
  }

  return {
    sagaUsecases,
    renderScreen,
    store
  }
}
