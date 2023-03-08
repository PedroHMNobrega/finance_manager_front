import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from '@/presentation/components'

type SutTypes = {
  title: string
  callback: Function
}

const makeSut = (): SutTypes => {
  const title = 'Any Title'

  const callback = jest.fn()

  render(
    <Modal title={title} setOpen={callback}>
      <div data-testid="child">Any Content</div>
    </Modal>
  )

  return {
    title,
    callback
  }
}

describe('Modal Component', () => {
  it('should render child', () => {
    makeSut()
    const child = screen.queryByTestId('child')
    expect(child).toBeTruthy()
  })

  it('should render title', () => {
    const { title } = makeSut()
    const titleContainer = screen.queryByTestId('modal-title')
    expect(titleContainer.textContent).toBe(title)
  })

  it('should call callback when click at close button', () => {
    const { callback } = makeSut()
    const closeButton = screen.queryByTestId('modal-close') as HTMLButtonElement
    fireEvent.click(closeButton)
    expect(callback).toBeCalledTimes(1)
  })
})
