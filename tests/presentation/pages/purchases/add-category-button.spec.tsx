import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import AddCategoryButton from '@/presentation/pages/purchases/components/add-category-button/add-category-button'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { populateField } from '@/tests/presentation/helpers/form-helper'
import { mockJwt } from '@/tests/domain/mocks'

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

const openInput = (): void => {
  const addButton = screen.queryByTestId('add-button')
  act(() => {
    fireEvent.click(addButton)
  })
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

      openInput()

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

  describe('Create', () => {
    it('should call create usecase with correct values when create button is clicked', () => {
      const { renderScreen, sagaUsecases } = makeSut()
      renderScreen()
      openInput()

      const categoryName = 'any-category-name'

      populateField('create-category-input', categoryName)

      const createButton = screen.queryByTestId('create-category-button')
      act(() => {
        fireEvent.click(createButton)
      })

      expect(sagaUsecases.createCategoryUsecase.create).toHaveBeenCalledTimes(1)
      expect(sagaUsecases.createCategoryUsecase.create).toHaveBeenCalledWith({
        body: {
          name: 'any-category-name'
        },
        token: mockJwt()
      })
    })

    it('should erase input content after created', () => {
      const { renderScreen } = makeSut()
      renderScreen()
      openInput()

      const categoryName = 'any-category-name'
      const input = screen.queryByTestId('create-category-input') as HTMLInputElement

      populateField('create-category-input', categoryName)

      expect(input.value).toBe(categoryName)

      const createButton = screen.queryByTestId('create-category-button')
      act(() => {
        fireEvent.click(createButton)
      })

      expect(input.value).toBe('')
    })
  })
})
