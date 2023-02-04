import React from 'react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { PrivateRoute } from '@/main/proxies'
import { mockAccountModel } from '@/tests/domain/mocks'

import { screen } from '@testing-library/react'
import { renderWithHistory } from '@/tests/presentation/mocks'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const Page: React.FC = () => (
    <PrivateRoute>
      <h1 data-testid="any-id">Any-content</h1>
    </PrivateRoute>
  )

  renderWithHistory({
    Page,
    history,
    account
  })

  return {
    history
  }
}

describe('PrivateRoute Component', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)

    expect(history.location.pathname).toBe('/login')
  })

  it('should render current component if user is logged in', () => {
    const { history } = makeSut()
    const currentComponent = screen.queryByTestId('any-id')
    expect(history.location.pathname).toBe('/')
    expect(currentComponent).toBeTruthy()
  })
})
