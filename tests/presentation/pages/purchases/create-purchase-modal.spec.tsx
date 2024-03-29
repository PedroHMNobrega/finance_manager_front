import React from 'react'
import { act, fireEvent, screen } from '@testing-library/react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import CreatePurchaseModal from '@/presentation/pages/purchases/components/create-purchase-modal/create-purchase-modal'
import { renderWithProvider, ValidationStub } from '@/tests/presentation/mocks'
import { mockCategoryList, mockJwt } from '@/tests/domain/mocks'
import {
  clickButton,
  populateField,
  populateSelect,
  testIfInputsAreEmpty,
  testIfInputsAreFilled,
  testInputSuccess,
  testInputWithError,
  testMessage
} from '@/tests/presentation/helpers/form-helper'
import { Category } from '@/domain/models'
import { mockError, mockLoading } from '@/tests/presentation/helpers/saga-helper'
import { MessageType } from '@/presentation/components/message/message'
import { mockContainer } from '@/tests/main/mocks/mock-dependency-injection-container'
import { MoneyConverter } from '@/domain/usecases/conversion'
import { Dependencies } from '@/presentation/dependencies'
import { loadCategoryRequest } from '@/presentation/store/reducers/category/reducer'

type SutType = {
  renderScreen: Function
  setOpenSpy: jest.Mock
  sagaUsecases: SagaUseCases
  store: ToolkitStore
  categories: Category[]
  moneyConverter: MoneyConverter
}

const makeSut = (validationError = null): SutType => {
  const categories = mockCategoryList()

  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError

  const setOpenSpy = jest.fn()
  const Page: React.FC = () => (
    <CreatePurchaseModal setOpen={setOpenSpy} />
  )

  const { store, sagaUsecases, renderScreen, diContainer } = renderWithProvider({
    Page,
    container: mockContainer(validationStub)
  })

  const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
  loadCategories.mockReturnValue(categories)
  store.dispatch(loadCategoryRequest())

  return {
    renderScreen,
    setOpenSpy,
    sagaUsecases,
    store,
    categories,
    moneyConverter: diContainer.get<MoneyConverter>(Dependencies.MoneyConverter)
  }
}

describe('CreatePurchaseModal Component', () => {
  describe('Categories', () => {
    it('should open category modal on open button click', async () => {
      const { renderScreen } = makeSut()
      renderScreen()

      let categoryModal = screen.queryByTestId('category-modal')
      expect(categoryModal).toBeNull()

      const addButton = screen.queryByTestId('add-button') as HTMLButtonElement
      await clickButton(addButton)

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
      const { renderScreen, sagaUsecases, store } = makeSut()

      const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
      mockLoading(loadCategories)
      store.dispatch(loadCategoryRequest())

      renderScreen()

      const addButton = screen.queryByTestId('add-button')
      expect(addButton).toBeNull()

      const spinner = screen.queryByTestId('spinner')
      expect(spinner).toBeTruthy()
    })

    it('should display error message on category load error', () => {
      const { renderScreen, sagaUsecases, store } = makeSut()

      const loadCategories = sagaUsecases.loadCategoriesUsecase.loadAll as jest.Mock
      mockError(loadCategories)
      store.dispatch(loadCategoryRequest())

      renderScreen()

      testMessage(MessageType.ERROR)
    })
  })

  describe('Form', () => {
    const simulateValidSubmit = async ({
      name = 'any-name',
      value = 'R$ 11.32',
      installmentsNumber = '10',
      firstInstallmentDate = '1999-01-03',
      category = '1'
    }): Promise<void> => {
      await populateField('name', name)
      await populateField('value', value)
      await populateField('installmentsNumber', installmentsNumber)
      await populateField('firstInstallmentDate', firstInstallmentDate)
      await populateSelect('category', category)

      const form = screen.queryByTestId('create-purchase-form') as HTMLFormElement
      await act(() => {
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

    it('should show valid name state if validation succeeds', async () => {
      const { renderScreen } = makeSut()
      renderScreen()

      await populateField('name', 'any-name')

      testInputSuccess('name')
    })

    it('should show valid value state if validation succeeds', async () => {
      const { renderScreen } = makeSut()
      renderScreen()

      await populateField('value', 'R$ 0.32')

      testInputSuccess('value')
    })

    it('should show valid installmentsNumber state if validation succeeds', async () => {
      const { renderScreen } = makeSut()
      renderScreen()

      await populateField('installmentsNumber', '1')

      testInputSuccess('installmentsNumber')
    })

    it('should show valid firstInstallmentDate state if validation succeeds', async () => {
      const { renderScreen } = makeSut()
      renderScreen()

      await populateField('firstInstallmentDate', '1999-01-03')

      testInputSuccess('firstInstallmentDate')
    })

    it('should show valid category state if validation succeeds', async () => {
      const { renderScreen } = makeSut()
      renderScreen()

      await populateField('category', '1')

      testInputSuccess('category')
    })

    it('should enable submit button if form is valid', async () => {
      const { renderScreen } = makeSut()
      renderScreen()

      await populateField('name', 'any-name')
      await populateField('value', 'R$ 0.32')
      await populateField('installmentsNumber', '1')
      await populateField('firstInstallmentDate', '1999-01-03')
      await populateField('category', '1')

      const submitButton = screen.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(false)
    })

    it('should call create usecase with correct values on submit', async () => {
      const { renderScreen, sagaUsecases, categories, moneyConverter } = makeSut()

      const name = 'any-name'
      const value = 'R$ 11.32'
      const installmentsNumber = '10'
      const firstInstallmentDate = '1999-01-03'
      const category = categories[0].id.toString()

      const toMoney = moneyConverter.toMoney as jest.Mock
      toMoney.mockReturnValueOnce(value)

      renderScreen()

      await simulateValidSubmit({
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

    it('should clear inputs after submit', async () => {
      const { renderScreen } = makeSut()

      renderScreen()

      await simulateValidSubmit({})

      testIfInputsAreEmpty(['name', 'value', 'category', 'installmentsNumber', 'firstInstallmentDate'])
    })

    it('should display success message on create purchase success', async () => {
      const { renderScreen } = makeSut()

      jest.useFakeTimers()
      renderScreen()

      await simulateValidSubmit({})

      testMessage(MessageType.SUCCESS)
    })

    it('should display error message and do not clear inputs on create purchase error', async () => {
      const { renderScreen, sagaUsecases } = makeSut()

      const createPurchase = sagaUsecases.createPurchaseUsecase.create as jest.Mock
      mockError(createPurchase)

      jest.useFakeTimers()
      renderScreen()

      await simulateValidSubmit({})

      testMessage(MessageType.ERROR)

      testIfInputsAreFilled(['name', 'value', 'category', 'installmentsNumber', 'firstInstallmentDate'])
    })

    it('should deactivate create button on loading', async () => {
      const { renderScreen, sagaUsecases } = makeSut()

      const createPurchase = sagaUsecases.createPurchaseUsecase.create as jest.Mock
      mockLoading(createPurchase)

      renderScreen()

      await simulateValidSubmit({})

      const createPurchaseButton = screen.queryByTestId('submit') as HTMLButtonElement
      expect(createPurchaseButton.disabled).toBeTruthy()
    })
  })
})
