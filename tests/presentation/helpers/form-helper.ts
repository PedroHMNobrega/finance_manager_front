import { act, fireEvent, screen } from '@testing-library/react'
import { MessageType } from '@/presentation/components/message/message'

export const populateField = async (testId, value): Promise<HTMLInputElement> => {
  const input = screen.getByTestId(testId) as HTMLInputElement
  await act(() => {
    fireEvent.input(input, { target: { value: value } })
  })
  return input
}

export const populateSelect = async (testId, value): Promise<HTMLSelectElement> => {
  const select = screen.getByTestId(testId) as HTMLSelectElement
  await act(() => {
    fireEvent.change(select, { target: { value: value } })
  })
  return select
}

export const getInputValue = (testId): string => {
  const input = screen.getByTestId(testId) as HTMLInputElement
  return input.value
}

export const clickButton = async (element: HTMLElement): Promise<void> => {
  await act(() => {
    fireEvent.click(element)
  })
}

export const testInputWithError = (name: string, errorMessage: string): void => {
  const inputStatus = screen.getByTestId(`${name}-status`)
  expect(inputStatus.title).toBe(errorMessage)
  expect(inputStatus.textContent).toBe('🔴')
}

export const testInputSuccess = (name: string): void => {
  const inputStatus = screen.getByTestId(`${name}-status`)
  expect(inputStatus.title).toBe('Tudo certo!')
  expect(inputStatus.textContent).toBe('🟢')
}

export const testMessage = (type: MessageType): void => {
  const message = screen.queryByTestId('message')
  expect(message).toBeTruthy()
  expect(message.className).toBe(`message ${type}`)
}

export const testIfInputsAreEmpty = (testIds: string[]): void => {
  for (const testId of testIds) {
    const nameValue = getInputValue(testId)
    expect(nameValue).toBe('')
  }
}

export const testIfInputsAreFilled = (testIds: string[]): void => {
  for (const testId of testIds) {
    const nameValue = getInputValue(testId)
    expect(nameValue).not.toBe('')
  }
}
