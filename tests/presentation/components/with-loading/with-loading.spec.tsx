import React from 'react'
import { render, screen } from '@testing-library/react'
import WithLoading from '@/presentation/components/with-loading/with-loading'

const childrenTestId = 'any-id'

const makeSut = (loading: boolean): void => {
  render(
    <WithLoading loadingClass='any-class' loading={loading}>
      <div data-testid={childrenTestId}>Any-div</div>
    </WithLoading>
  )
}

describe('WithLoading Component', () => {
  it('should render children if is not loading', () => {
    makeSut(false)

    const children = screen.queryByTestId(childrenTestId)
    expect(children).toBeTruthy()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeNull()
  })

  it('should render spinner and not render children if is loading', () => {
    makeSut(true)

    const children = screen.queryByTestId(childrenTestId)
    expect(children).toBeNull()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('should pass correct class to spinner', () => {
    makeSut(true)
    const spinner = screen.queryByTestId('spinner')
    expect(spinner.className).toMatch(/any-class/)
  })
})
