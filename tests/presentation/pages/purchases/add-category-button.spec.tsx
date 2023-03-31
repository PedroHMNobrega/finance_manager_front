import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import AddCategoryButton from '@/presentation/pages/purchases/components/add-category-button/add-category-button'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

type SutType = {
  renderScreen: Function
  sagaUsecases: SagaUseCases
  store: ToolkitStore
}

const makeSut = (): SutType => {
  const Page: React.FC = () => (
    <AddCategoryButton />
  )

  const { store, sagaUsecases, renderScreen } = renderWithProvider({ Page })

  return {
    renderScreen,
    sagaUsecases,
    store
  }
}

describe('AddCategoryButton Component', () => {
  describe('Open and Close', () => {
    it('should start rendering button, but not rendering create category input', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      const addButton = screen.queryByTestId('add-button')
      expect(addButton).toBeTruthy()

      const createCategoryWrapper = screen.queryByTestId('create-category-wrapper')
      expect(createCategoryWrapper).toBeNull()
    })

    it('should display create category input on button click', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      const addButton = screen.queryByTestId('add-button')
      act(() => {
        fireEvent.click(addButton)
      })

      const createCategoryWrapper = screen.queryByTestId('create-category-wrapper')
      expect(createCategoryWrapper).toBeTruthy()
    })

    it('should close create category input on button click', () => {
      const { renderScreen } = makeSut()
      renderScreen()

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
