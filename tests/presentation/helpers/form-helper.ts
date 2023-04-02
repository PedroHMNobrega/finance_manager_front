import { act, fireEvent, screen } from '@testing-library/react'

export const populateField = (testId, value): HTMLInputElement => {
  const input = screen.getByTestId(testId) as HTMLInputElement
  act(() => {
    fireEvent.input(input, { target: { value: value } })
  })
  return input
}

export const clickButton = (button: HTMLButtonElement): void => {
  act(() => {
    fireEvent.click(button)
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
