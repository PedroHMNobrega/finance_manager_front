import React from 'react'
import { screen } from '@testing-library/react'
import AddCategoryButton from '@/presentation/pages/purchases/components/add-category-button/add-category-button'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { clickButton, populateField } from '@/tests/presentation/helpers/form-helper'
import { mockJwt } from '@/tests/domain/mocks'
import { mockLoading } from '@/tests/presentation/helpers/saga-helper'
import { createCategory } from '@/tests/presentation/helpers/category-helper'

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
  const addButton = screen.queryByTestId('add-button') as HTMLButtonElement
  clickButton(addButton)
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

      const addButton = screen.queryByTestId('add-button') as HTMLButtonElement
      clickButton(addButton)
      clickButton(addButton)

      const createCategoryWrapper = screen.queryByTestId('create-category-wrapper')
      expect(createCategoryWrapper).toBeNull()
    })
  })

  describe('Create', () => {
    it('should not call create usecase if category is empty', () => {
      const { renderScreen, sagaUsecases } = makeSut()
      renderScreen()
      createCategory('    ')
      expect(sagaUsecases.createCategoryUsecase.create).toHaveBeenCalledTimes(0)
    })

    it('should call create usecase with correct values when create button is clicked', () => {
      const { renderScreen, sagaUsecases } = makeSut()
      const categoryName = 'any-category-name'

      renderScreen()
      createCategory(categoryName)

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

      const createButton = screen.queryByTestId('create-category-button') as HTMLButtonElement
      clickButton(createButton)

      expect(input.value).toBe('')
    })

    it('should disable create button on loading', () => {
      const { renderScreen, sagaUsecases } = makeSut()

      const createCategoryMock = sagaUsecases.createCategoryUsecase.create as jest.Mock
      mockLoading(createCategoryMock)

      renderScreen()
      openInput()

      populateField('create-category-input', 'any-name')

      const createButton = screen.queryByTestId('create-category-button') as HTMLButtonElement
      clickButton(createButton)

      expect(createButton.disabled).toBeTruthy()

      clickButton(createButton)
      clickButton(createButton)
      expect(createCategoryMock).toHaveBeenCalledTimes(1)
    })
  })
})
