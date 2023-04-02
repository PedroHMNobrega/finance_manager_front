import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import CreatePurchaseModal from '@/presentation/pages/purchases/components/create-purchase-modal/create-purchase-modal'
import { renderWithProvider, ValidationStub } from '@/tests/presentation/mocks'
import { mockCategoryList, mockJwt } from '@/tests/domain/mocks'
import {
  clickButton,
  getInputValue,
  populateField,
  populateSelect,
  testInputSuccess,
  testInputWithError,
  testMessage
} from '@/tests/presentation/helpers/form-helper'
import { Category } from '@/domain/models'
import { mockError, mockLoading } from '@/tests/presentation/helpers/saga-helper'
import { MessageType } from '@/presentation/components/message/message'

type SutType = {
  renderScreen: Function
  setOpenSpy: jest.Mock
  sagaUsecases: SagaUseCases
  store: ToolkitStore
  categories: Category[]
}

const makeSut = (validationError = null): SutType => {
  const categories = mockCategoryList()

  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError

  const setOpenSpy = jest.fn()
  const Page: React.FC = () => (
    <CreatePurchaseModal setOpen={setOpenSpy} validation={validationStub} />
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
  describe('Categories', () => {
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

      testMessage(MessageType.ERROR)
    })
  })

  describe('Form', () => {
    const simulateValidSubmit = ({
      name = 'any-name',
      value = 'R$ 11.32',
      installmentsNumber = '10',
      firstInstallmentDate = '1999-01-03',
      category = '1'
    }): void => {
      populateField('name', name)
      populateField('value', value)
      populateField('installmentsNumber', installmentsNumber)
      populateField('firstInstallmentDate', firstInstallmentDate)
      populateSelect('category', category)

      const form = screen.queryByTestId('create-purchase-form') as HTMLFormElement
      act(() => {
        fireEvent.submit(form)
      })
    }

    it('should start with initial state', () => {
      const validationError = 'any-error-message'
      const { renderScreen } = makeSut(validationError)

      renderScreen()

      const submitButton = screen.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(true)

      testInputWithError('name', validationError)
      testInputWithError('value', validationError)
      testInputWithError('category', validationError)
      testInputWithError('installmentsNumber', validationError)
      testInputWithError('firstInstallmentDate', validationError)
    })

    it('should show valid name state if validation succeeds', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      populateField('name', 'any-name')

      testInputSuccess('name')
    })

    it('should show valid value state if validation succeeds', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      populateField('value', 'R$ 0.32')

      testInputSuccess('value')
    })

    it('should show valid installmentsNumber state if validation succeeds', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      populateField('installmentsNumber', '1')

      testInputSuccess('installmentsNumber')
    })

    it('should show valid firstInstallmentDate state if validation succeeds', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      populateField('firstInstallmentDate', '1999-01-03')

      testInputSuccess('firstInstallmentDate')
    })

    it('should show valid category state if validation succeeds', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      populateField('category', '1')

      testInputSuccess('category')
    })

    it('should enable submit button if form is valid', () => {
      const { renderScreen } = makeSut()
      renderScreen()

      populateField('name', 'any-name')
      populateField('value', 'R$ 0.32')
      populateField('installmentsNumber', '1')
      populateField('firstInstallmentDate', '1999-01-03')
      populateField('category', '1')

      const submitButton = screen.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(false)
    })

    it('should call create usecase with correct values on submit', () => {
      const { renderScreen, sagaUsecases, categories } = makeSut()

      renderScreen()

      const name = 'any-name'
      const value = 'R$ 11.32'
      const installmentsNumber = '10'
      const firstInstallmentDate = '1999-01-03'
      const category = categories[0].id.toString()

      simulateValidSubmit({
        name,
        value,
        installmentsNumber,
        firstInstallmentDate,
        category
      })

      expect(sagaUsecases.createPurchaseUsecase.create).toHaveBeenCalledTimes(1)
      expect(sagaUsecases.createPurchaseUsecase.create).toHaveBeenCalledWith({
        body: {
          name,
          value: parseFloat(value.split(' ')[1]),
          installmentsNumber: parseInt(installmentsNumber),
          firstInstallmentDate,
          category: parseInt(category)
        },
        token: mockJwt()
      })
    })

    it('should clear inputs after submit', () => {
      const { renderScreen } = makeSut()

      renderScreen()

      simulateValidSubmit({})

      const nameValue = getInputValue('name')
      expect(nameValue).toBe('')

      const valueValue = getInputValue('value')
      expect(valueValue).toBe('')

      const categoryValue = getInputValue('category')
      expect(categoryValue).toBe('')

      const installmentsNumberValue = getInputValue('installmentsNumber')
      expect(installmentsNumberValue).toBe('')

      const firstInstallmentDateValue = getInputValue('firstInstallmentDate')
      expect(firstInstallmentDateValue).toBe('')
    })

    it('should display success message on create purchase success', () => {
      const { renderScreen } = makeSut()

      jest.useFakeTimers()
      renderScreen()

      simulateValidSubmit({})

      testMessage(MessageType.SUCCESS)
    })
  })
})
