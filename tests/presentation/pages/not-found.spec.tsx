import React from 'react'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import NotFound from '@/presentation/pages/not-found/not-found'

type SutTypes = {
  sut: RenderResult
}

const history = createMemoryHistory({ initialEntries: ['/any-url'] })

const makeSut = (): SutTypes => {
  const sut = render(
    <Router location={history.location} navigator={history}>
      <NotFound />
    </Router>
  )
  return {
    sut
  }
}

describe('NotFound', () => {
  it('should go to home page', () => {
    const { sut } = makeSut()
    const homeLink = sut.getByTestId('homeLink')
    fireEvent.click(homeLink)

    expect(history.location.pathname).toBe('/')
  })
})
