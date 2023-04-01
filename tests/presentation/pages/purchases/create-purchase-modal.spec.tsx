import React from 'react'
import { screen } from '@testing-library/react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import CreatePurchaseModal from '@/presentation/pages/purchases/components/create-purchase-modal/create-purchase-modal'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { mockCategoryList } from '@/tests/domain/mocks'
import { clickButton } from '@/tests/presentation/helpers/form-helper'

type SutType = {
  renderScreen: Function
  setOpenSpy: jest.Mock
  sagaUsecases: SagaUseCases
  store: ToolkitStore
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
    store
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
})
