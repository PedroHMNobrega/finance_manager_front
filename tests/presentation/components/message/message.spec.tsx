import React from 'react'
import { act, render, screen, waitFor } from '@testing-library/react'
import { MessageType } from '@/presentation/components/message/message'
import { Message } from '@/presentation/components'

const makeSut = (type: MessageType, message: string = 'any-message'): void => {
  jest.useFakeTimers()
  render(
    <Message message={message} type={type} />
  )
}

describe('Message Component', () => {
  it('should not render if message is empty', () => {
    makeSut(MessageType.ERROR, '')
    const message = screen.queryByTestId('message')
    expect(message).toBeNull()
  })

  it('should render if message is not empty', () => {
    makeSut(MessageType.ERROR)
    const message = screen.queryByTestId('message')
    expect(message).toBeTruthy()
  })

  it('should disappear after duration', async () => {
    makeSut(MessageType.ERROR)
    act(() => {
      jest.runAllTimers()
    })
    await waitFor(() => {
      const message = screen.queryByTestId('message')
      expect(message).toBeNull()
    })
  })

  it('should use message_error class if the type is ERROR', () => {
    makeSut(MessageType.ERROR)
    const message = screen.queryByTestId('message')
    expect(message.className).toMatch(/message_error/)
  })

  it('should use message_success class if the type is SUCCESS', () => {
    makeSut(MessageType.SUCCESS)
    const message = screen.queryByTestId('message')
    expect(message.className).toMatch(/message_success/)
  })

  it('should use message_alert class if the type is ALERT', () => {
    makeSut(MessageType.ALERT)
    const message = screen.queryByTestId('message')
    expect(message.className).toMatch(/message_alert/)
  })

  it('should display correct message', () => {
    const text = 'any-message-text'
    makeSut(MessageType.SUCCESS, text)

    const messageText = screen.queryByTestId('message-text')
    expect(messageText.textContent).toBe(text)
  })
})
