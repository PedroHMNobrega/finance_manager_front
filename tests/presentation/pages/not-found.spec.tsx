import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import NotFound from '@/presentation/pages/not-found/not-found'
import { renderWithHistory } from '@/tests/presentation/mocks'
import { mockAccountModel } from '@/tests/domain/mocks'

const history = createMemoryHistory({ initialEntries: ['/any-url'] })

const makeSut = (account = mockAccountModel()): void => {
  const Page: React.FC = () => (
    <NotFound />
  )
  renderWithHistory({
    Page,
    history,
    account: account
  })
}

describe('NotFound', () => {
  it('should go to home page if user is logged', () => {
    makeSut()
    const homeLink = screen.getByTestId('homeLink')
    fireEvent.click(homeLink)

    expect(history.location.pathname).toBe('/')
  })
})
