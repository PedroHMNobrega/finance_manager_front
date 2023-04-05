import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { DeleteButton } from '@/presentation/components'

type SutTypes = {
  id: number
  callback: Function
}

const makeSut = (loading = false): SutTypes => {
  const id = 323
  const callback = jest.fn()

  render(
    <DeleteButton id={id} callback={callback} loading={loading} />
  )

  return {
    id,
    callback
  }
}

describe('DeleteButton Component', () => {
  it('should display loading spinner and not display delete icon if loading is true', () => {
    makeSut(true)

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()

    const deleteButon = screen.queryByTestId('delete-button')
    expect(deleteButon).toBeNull()
  })

  it('should not display loading spinner and display delete icon if loading is false', () => {
    makeSut(false)

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeNull()

    const deleteButon = screen.queryByTestId('delete-button')
    expect(deleteButon).toBeTruthy()
  })

  it('should call callback with correct values on button click', async () => {
    const { callback, id } = makeSut()
    const deleteButon = screen.queryByTestId('delete-button')

    await act(() => {
      fireEvent.click(deleteButon)
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(id)
  })
})
