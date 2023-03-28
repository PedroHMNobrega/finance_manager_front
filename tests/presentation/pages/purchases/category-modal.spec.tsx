import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CategoryModal from '@/presentation/pages/purchases/components/category-modal/category-modal'
import { Provider } from 'react-redux'
import { mockMakeStore } from '@/tests/main/mocks/mock-redux-store-factory'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { mockCategoryList, mockJwt } from '@/tests/domain/mocks'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'

type SutType = {
  setOpenSpy: jest.Mock
  sagaUsecases: SagaUseCases
  store: ToolkitStore
}

const makeSut = (categories = mockCategoryList()): SutType => {
  const setOpenSpy = jest.fn()
  const { store, sagaUsecases } = mockMakeStore()

  const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
  loadCategories.mockReturnValue(categories)

  render(
    <Provider store={store}>
      <CategoryModal setOpen={setOpenSpy} />
    </Provider>
  )

  return {
    setOpenSpy,
    sagaUsecases,
    store
  }
}

describe('CategoryModal Component', () => {
  it('should render no category message if no category is returned', async () => {
    makeSut([])

    await waitFor(() => {
      const h1 = screen.queryByTestId('no-category-message')
      expect(h1.textContent).toBe('Criar Categoria')
    })
  })

  it('should render categories if any category is returned', async () => {
    const { sagaUsecases } = makeSut()

    const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock

    await waitFor(() => {
      expect(loadCategories).toHaveBeenCalled()
      const h1 = screen.queryByTestId('no-category-message')
      expect(h1).toBeNull()

      const categoriesWrapper = screen.queryByTestId('categories-wrapper')
      expect(categoriesWrapper).toBeTruthy()
    })
  })

  it('should call delete usecase with correct values when DeleteButton is clicked', async () => {
    const { sagaUsecases } = makeSut()

    const deleteCategory = sagaUsecases.deleteCategoryUsecase.delete as jest.Mock
    const deleteButtons = screen.getAllByTestId('delete-button')
    const firstButton = deleteButtons[0]

    fireEvent.click(firstButton)

    await waitFor(() => {
      expect(deleteCategory).toHaveBeenCalledWith({
        id: parseInt(firstButton.id),
        token: mockJwt()
      })
    })
  })

  it('should delete correct category', async () => {
    makeSut()
    const deleteButtons = screen.getAllByTestId('delete-button')
    const buttonToBeDeleted = deleteButtons[0]
    const expectedButton = deleteButtons[1]

    const categoriesWrapper = screen.queryByTestId('categories-wrapper')
    expect(categoriesWrapper.childElementCount).toBe(2)

    fireEvent.click(buttonToBeDeleted)

    await waitFor(() => {
      expect(categoriesWrapper.childElementCount).toBe(1)
      const remainingButton = screen.getByTestId('delete-button')
      expect(remainingButton.id).toEqual(expectedButton.id)
    })
  })
})
