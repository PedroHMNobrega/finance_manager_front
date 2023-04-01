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
