import React from 'react'
import { render, screen } from '@testing-library/react'
import { Modal } from '@/presentation/components'
import { clickButton } from '@/tests/presentation/helpers/form-helper'

type SutTypes = {
  title: string
  callback: Function
}

const makeSut = (name = null): SutTypes => {
  const title = 'Any Title'

  const callback = jest.fn()

  render(
    <Modal title={title} setOpen={callback} name={name}>
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

  it('should call callback when click at close button', async () => {
    const { callback } = makeSut()
    const closeButton = screen.queryByTestId('modal-close') as HTMLButtonElement
    await clickButton(closeButton)
    expect(callback).toHaveBeenCalled()
  })

  it('should call callback when click outside', async () => {
    const { callback } = makeSut()

    const mask = screen.queryByTestId('modal-mask')
    await clickButton(mask)

    expect(callback).toHaveBeenCalled()
  })

  it('should not call callback when click inside', async () => {
    const name = 'any-name'
    const { callback } = makeSut(name)

    const modal = screen.queryByTestId(name)
    await clickButton(modal)

    expect(callback).not.toHaveBeenCalled()
  })
})
