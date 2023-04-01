import { act, fireEvent, screen } from '@testing-library/react'
import { populateField } from '@/tests/presentation/helpers/form-helper'

export const createCategory = (categoryName = 'any-category-name'): void => {
  const addButton = screen.queryByTestId('add-button')
  act(() => {
    fireEvent.click(addButton)
  })

  populateField('create-category-input', categoryName)

  const createButton = screen.queryByTestId('create-category-button')
  act(() => {
    fireEvent.click(createButton)
  })
}
