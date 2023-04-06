import React from 'react'
import { screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import NotFound from '@/presentation/pages/not-found/not-found'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { mockAccountModel } from '@/tests/domain/mocks'
import { clickButton } from '@/tests/presentation/helpers/form-helper'

const history = createMemoryHistory({ initialEntries: ['/any-url'] })

const makeSut = (account = mockAccountModel()): void => {
  const Page: React.FC = () => (
    <NotFound />
  )
  const { renderScreen } = renderWithProvider({
    Page,
    history,
    account: account
  })

  renderScreen()
}

describe('NotFound', () => {
  it('should go to home page if user is logged', async () => {
    makeSut()
    const homeLink = screen.getByTestId('homeLink') as HTMLLinkElement
    await clickButton(homeLink)

    expect(history.location.pathname).toBe('/')
  })
})
