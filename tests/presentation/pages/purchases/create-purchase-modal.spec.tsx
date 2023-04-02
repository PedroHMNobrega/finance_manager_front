import React from 'react'
import { screen } from '@testing-library/react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import CreatePurchaseModal from '@/presentation/pages/purchases/components/create-purchase-modal/create-purchase-modal'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { mockCategoryList } from '@/tests/domain/mocks'
import { clickButton } from '@/tests/presentation/helpers/form-helper'
import { Category } from '@/domain/models'
import { mockError, mockLoading } from '@/tests/presentation/helpers/saga-helper'

type SutType = {
  renderScreen: Function
  setOpenSpy: jest.Mock
  sagaUsecases: SagaUseCases
  store: ToolkitStore
  categories: Category[]
}

const makeSut = (categories = mockCategoryList()): SutType => {
  const setOpenSpy = jest.fn()
  const Page: React.FC = () => (
    <CreatePurchaseModal setOpen={setOpenSpy} />
  )

  const { store, sagaUsecases, renderScreen } = renderWithProvider({ Page })

  const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
  loadCategories.mockReturnValue(categories)

  return {
    renderScreen,
    setOpenSpy,
    sagaUsecases,
    store,
    categories
  }
}

describe('CreatePurchaseModal Component', () => {
  it('should open category modal on open button click', () => {
    const { renderScreen } = makeSut()
    renderScreen()

    let categoryModal = screen.queryByTestId('category-modal')
    expect(categoryModal).toBeNull()

    const addButton = screen.queryByTestId('add-button') as HTMLButtonElement
    clickButton(addButton)

    categoryModal = screen.queryByTestId('category-modal')
    expect(categoryModal).toBeTruthy()
  })

  it('should list correct categories on category selector', () => {
    const { renderScreen, categories } = makeSut()
    renderScreen()

    const options = screen.queryAllByTestId('select-option') as HTMLOptionElement[]

    expect(options.length).toBe(categories.length)
    expect(options[0].textContent).toBe(categories[0].name)
    expect(options[0].value).toBe(categories[0].id.toString())
    expect(options[1].textContent).toBe(categories[1].name)
    expect(options[1].value).toBe(categories[1].id.toString())
  })

  it('should show spinner on category load loading', () => {
    const { renderScreen, sagaUsecases } = makeSut()

    const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
    mockLoading(loadCategories)

    renderScreen()

    const addButton = screen.queryByTestId('add-button')
    expect(addButton).toBeNull()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('should display error message on category load error', () => {
    const { renderScreen, sagaUsecases } = makeSut()

    const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
    mockError(loadCategories)

    renderScreen()

    const errorMessageAlert = screen.queryByTestId('message')
    expect(errorMessageAlert).toBeTruthy()
  })
})
