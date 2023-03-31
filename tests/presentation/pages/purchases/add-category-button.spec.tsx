import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import AddCategoryButton from '@/presentation/pages/purchases/components/add-category-button/add-category-button'

const makeSut = (): void => {
  render(
    <AddCategoryButton />
  )
}

describe('AddCategoryButton Component', () => {
  describe('Open and Close', () => {
    it('should start rendering button, but not rendering create category input', () => {
      makeSut()

      const addButton = screen.queryByTestId('add-button')
      expect(addButton).toBeTruthy()

      const createCategoryWrapper = screen.queryByTestId('create-category-wrapper')
      expect(createCategoryWrapper).toBeNull()
    })

    it('should display create category input on button click', () => {
      makeSut()

      const addButton = screen.queryByTestId('add-button')
      act(() => {
        fireEvent.click(addButton)
      })

      const createCategoryWrapper = screen.queryByTestId('create-category-wrapper')
      expect(createCategoryWrapper).toBeTruthy()
    })

    it('should close create category input on button click', () => {
      makeSut()

      const addButton = screen.queryByTestId('add-button')
      act(() => {
        fireEvent.click(addButton)
      })
      act(() => {
        fireEvent.click(addButton)
      })

      const createCategoryWrapper = screen.queryByTestId('create-category-wrapper')
      expect(createCategoryWrapper).toBeNull()
    })
  })
})
