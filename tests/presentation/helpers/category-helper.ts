import { act, fireEvent, screen } from '@testing-library/react'
import { populateField } from '@/tests/presentation/helpers/form-helper'

export const createCategory = async (categoryName = 'any-category-name'): Promise<void> => {
  const addButton = screen.queryByTestId('add-button')
  await act(() => {
    fireEvent.click(addButton)
  })

  await populateField('create-category-input', categoryName)

  const createButton = screen.queryByTestId('create-category-button')
  await act(() => {
    fireEvent.click(createButton)
  })
}
