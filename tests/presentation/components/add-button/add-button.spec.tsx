import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { AddButton } from '@/presentation/components'

type SutTypes = {
  callback: Function
}

const makeSut = (): SutTypes => {
  const callback = jest.fn()

  render(
    <AddButton action={callback} />
  )

  return {
    callback
  }
}

describe('AddButton Component', () => {
  it('should execute callback on click', () => {
    const { callback } = makeSut()
    const addButton = screen.queryByTestId('add-button')

    act(() => {
      fireEvent.click(addButton)
    })

    expect(callback).toHaveBeenCalledTimes(1)
  })
})
