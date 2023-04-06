import { MemoryHistory } from 'history'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/tests/domain/mocks'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import React from 'react'
import { setUser } from '@/presentation/store/reducers/user/reducer'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { mockMakeStore } from '@/tests/main/mocks/mock-redux-store-factory'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { Provider as DependencyProvider } from 'inversify-react'
import { mockContainer } from '@/tests/main/mocks/mock-dependency-injection-container'
import { Container } from 'inversify'

type RenderWithProviderParams = {
  Page: React.FC
  container?: Container
  history?: MemoryHistory
  account?: AccountModel
}

type RenderWithProviderReturn = {
  sagaUsecases: SagaUseCases
  renderScreen: Function
  store: ToolkitStore
  diContainer: Container
}

export const renderWithProvider = ({
  Page,
  history,
  container = mockContainer(),
  account = mockAccountModel()
}: RenderWithProviderParams): RenderWithProviderReturn => {
  const {
    store,
    sagaUsecases
  } = mockMakeStore()

  if (account) {
    store.dispatch(setUser(account.accessToken))
  }

  const renderScreen = (): void => {
    render(
      <DependencyProvider container={container}>
        <Provider store={store}>
          {history && (
            <Router location={history.location} navigator={history}>
              <Page />
            </Router>
          )}
          {!history && (
            <Page />
          )}
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
