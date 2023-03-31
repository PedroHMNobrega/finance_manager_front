import React from 'react'
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import CategoryModal from '@/presentation/pages/purchases/components/category-modal/category-modal'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { mockCategory, mockCategoryList, mockJwt } from '@/tests/domain/mocks'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { UnexpectedError } from '@/domain/errors'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { populateField } from '@/tests/presentation/helpers/form-helper'

type SutType = {
  renderScreen: Function
  setOpenSpy: jest.Mock
  sagaUsecases: SagaUseCases
  store: ToolkitStore
}

const makeSut = (categories = mockCategoryList()): SutType => {
  const setOpenSpy = jest.fn()
  const Page: React.FC = () => (
    <CategoryModal setOpen={setOpenSpy}/>
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

describe('CategoryModal Component', () => {
  describe('Load', () => {
    it('should render no category message if no category is returned', async () => {
      const { renderScreen } = makeSut([])
      renderScreen()

      await waitFor(() => {
        const h1 = screen.queryByTestId('no-category-message')
        expect(h1.textContent).toBe('Criar Categoria')
      })
    })

    it('should render categories if any category is returned', async () => {
      const { sagaUsecases, renderScreen } = makeSut()
      renderScreen()

      const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock

      await waitFor(() => {
        expect(loadCategories).toHaveBeenCalled()
        const h1 = screen.queryByTestId('no-category-message')
        expect(h1).toBeNull()

        const categoriesWrapper = screen.queryByTestId('categories-wrapper')
        expect(categoriesWrapper).toBeTruthy()

        const errorMessage = screen.queryByTestId('load-error-message')
        expect(errorMessage).toBeNull()
      })
    })

    it('should display loading spinner on loadCategories load', () => {
      const { renderScreen } = makeSut([])
      renderScreen()

      const withLoading = screen.queryByTestId('with-loading')
      expect(withLoading).toBeTruthy()

      const children = withLoading.children
      expect(children.length).toBe(2)
    })

    it('should display load error message on loading error', async () => {
      const { renderScreen, sagaUsecases } = makeSut()
      const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
      loadCategories.mockImplementationOnce(() => {
        throw new UnexpectedError()
      })

      renderScreen()

      await waitFor(() => {
        const errorMessage = screen.queryByTestId('load-error-message')
        expect(errorMessage).toBeTruthy()
      })
    })
  })

  describe('Delete', () => {
    it('should call delete usecase with correct values when DeleteButton is clicked', async () => {
      const { sagaUsecases, renderScreen } = makeSut()
      renderScreen()

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
      const { renderScreen } = makeSut()
      renderScreen()

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

    it('should display error message on delete error', async () => {
      const { renderScreen, sagaUsecases } = makeSut()
      const deleteCategories = sagaUsecases.deleteCategoryUsecase.delete as jest.Mock
      deleteCategories.mockImplementation(() => {
        throw new UnexpectedError()
      })

      jest.useFakeTimers()
      renderScreen()

      const deleteButton = screen.queryAllByTestId('delete-button')[0]
      fireEvent.click(deleteButton)

      await waitFor(() => {
        const errorMessage = screen.queryByTestId('message')
        expect(errorMessage).toBeTruthy()
      })
    })
  })

  describe('Create', () => {
    it('should display correct category on create', async () => {
      const { renderScreen, sagaUsecases } = makeSut()
      const category = mockCategory(23)

      const createCategory = sagaUsecases.createCategoryUsecase.create as jest.Mock
      createCategory.mockReturnValueOnce(category)

      renderScreen()

      const categoriesWrapper = screen.queryByTestId('categories-wrapper')
      expect(categoriesWrapper.childElementCount).toBe(2)

      const addButton = screen.queryByTestId('add-button')
      act(() => {
        fireEvent.click(addButton)
      })

      populateField('create-category-input', category.name)

      const createButton = screen.queryByTestId('create-category-button')
      act(() => {
        fireEvent.click(createButton)
      })

      await waitFor(() => {
        expect(categoriesWrapper.childElementCount).toBe(3)
        const createdCategory = categoriesWrapper.children[2]
        expect(createdCategory.children[0].textContent).toBe(category.name)
      })
    })
  })
})
