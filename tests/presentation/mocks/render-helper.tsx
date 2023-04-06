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
import { Provider as DependencyProvider } from 'inversify-react'
import { mockContainer } from '@/tests/main/mocks/mock-dependency-injection-container'
import { Validation } from '@/presentation/protocols/validation'
import { Container } from 'inversify'

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

  const container = mockContainer()

  render(
    <DependencyProvider container={container}>
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <Page />
        </Router>
      </Provider>
    </DependencyProvider>
  )
}

type RenderWithProviderParams = {
  Page: React.FC
  container?: Container
}

type RenderWithProviderReturn = {
  sagaUsecases: SagaUseCases
  renderScreen: Function
  store: ToolkitStore
  diContainer: Container
}

export const renderWithProvider = ({
  Page,
  container = mockContainer()
}: RenderWithProviderParams): RenderWithProviderReturn => {
  const {
    store,
    sagaUsecases
  } = mockMakeStore()

  const renderScreen = (): void => {
    render(
      <DependencyProvider container={container}>
        <Provider store={store}>
          <Page />
        </Provider>
      </DependencyProvider>
    )
  }

  return {
    sagaUsecases,
    renderScreen,
    store,
    diContainer: container
  }
}
