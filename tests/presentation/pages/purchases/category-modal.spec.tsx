import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import CategoryModal from '@/presentation/pages/purchases/components/category-modal/category-modal'
import { Provider } from 'react-redux'
import { mockMakeStore } from '@/tests/main/mocks/mock-redux-store-factory'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { mockCategoryList } from '@/tests/domain/mocks'
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
})
