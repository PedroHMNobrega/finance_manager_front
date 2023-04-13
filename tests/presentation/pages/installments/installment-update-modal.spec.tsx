import React from 'react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { Installment } from '@/domain/models'
import { MoneyConverter } from '@/domain/usecases/conversion'
import { renderWithProvider, ValidationStub } from '@/tests/presentation/mocks'
import InstallmentUpdateModal
  from '@/presentation/pages/installments/components/installment-update-modal/installment-update-modal'
import { mockInstallment, mockJwt } from '@/tests/domain/mocks'
import { mockContainer } from '@/tests/main/mocks/mock-dependency-injection-container'
import { Dependencies } from '@/presentation/dependencies'
import { act, fireEvent, screen } from '@testing-library/react'
import { populateField, testInputSuccess, testInputWithError } from '@/tests/presentation/helpers/form-helper'

type SutType = {
  renderScreen: Function
  setOpenSpy: jest.Mock
  setSelectedSpy: jest.Mock
  selected: Installment
  sagaUsecases: SagaUseCases
  store: ToolkitStore
  moneyConverter: MoneyConverter
}

const makeSut = ({
  validationError = null,
  installment = mockInstallment(1)
}): SutType => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = validationError

  const setOpenSpy = jest.fn()
  const setSelectedSpy = jest.fn()

  const Page: React.FC = () => (
    <InstallmentUpdateModal setOpen={setOpenSpy} selected={installment} setSelected={setSelectedSpy}/>
  )

  const {
    store,
    sagaUsecases,
    renderScreen,
    diContainer
  } = renderWithProvider({
    Page,
    container: mockContainer(validationStub)
  })

  return {
    renderScreen,
    setOpenSpy,
    setSelectedSpy,
    selected: installment,
    sagaUsecases,
    store,
    moneyConverter: diContainer.get<MoneyConverter>(Dependencies.MoneyConverter)
  }
}

describe('InstallmentUpdateModal Component', () => {
  describe('Data', () => {
    it('should display correct name, installment number and value', async () => {
      const { renderScreen, selected, moneyConverter } = makeSut({})
      const toMoney = moneyConverter.toMoney as jest.Mock
      toMoney.mockReturnValue(selected.value_paid)

      await renderScreen()

      const selectedInstallmentComponent = screen.queryByTestId('selected-installment')
      expect(selectedInstallmentComponent.textContent).toBe(
        `Compra: ${selected.purchase.name} - ${selected.number}/${selected.purchase.installmentsNumber}`
      )

      const inputValue = screen.queryByTestId('value') as HTMLInputElement
      expect(inputValue.value).toBe(selected.value_paid.toString())
    })
  })

  describe('Form', () => {
    const simulateValidSubmit = async ({
      value = 'R$ 3.22'
    }): Promise<void> => {
      await populateField('value', value)

      const form = screen.queryByTestId('update-installment-form') as HTMLFormElement
      await act(() => {
        fireEvent.submit(form)
      })
    }

    it('should start with initial state', async () => {
      const validationError = 'any-error-message'
      const { renderScreen } = makeSut({ validationError })

      await renderScreen()

      const submitButton = screen.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(true)

      testInputWithError('value', validationError)
    })

    it('should show valid value state if validation succeeds', async () => {
      const { renderScreen } = makeSut({})
      renderScreen()

      await populateField('value', 'R$ 0.32')

      testInputSuccess('value')
    })

    it('should enable submit button if form is valid', async () => {
      const { renderScreen } = makeSut({})
      renderScreen()

      await populateField('value', 'R$ 0.32')

      const submitButton = screen.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.disabled).toBe(false)
    })

    it('should show correct submit button if installment is not paid', async () => {
      const installment = mockInstallment(1)
      installment.paid = false

      const { renderScreen } = makeSut({ installment })
      await renderScreen()

      const submitButton = screen.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.textContent).toBe('Pagar')
      expect(submitButton.className).toBe('submit button')
    })

    it('should show correct submit button if installment is paid', async () => {
      const installment = mockInstallment(1)
      installment.paid = true

      const { renderScreen } = makeSut({ installment })
      await renderScreen()

      const submitButton = screen.getByTestId('submit') as HTMLButtonElement
      expect(submitButton.textContent).toBe('Cancelar Pagamento')
      expect(submitButton.className).toBe('submit button cancel_button')
    })

    it.each([
      { paid: false },
      { paid: true }
    ])('should call update usecase with correct values on submit', async ({ paid }) => {
      const installment = mockInstallment(1)
      installment.paid = paid

      const { renderScreen, sagaUsecases, setSelectedSpy, setOpenSpy, moneyConverter } = makeSut({ installment })

      const value = `R$ ${installment.value_paid}`
      const toMoney = moneyConverter.toMoney as jest.Mock
      toMoney.mockReturnValue(value)

      await renderScreen()
      await simulateValidSubmit({ value })

      expect(sagaUsecases.updateInstallmentUsecase.update).toHaveBeenCalledTimes(1)
      expect(sagaUsecases.updateInstallmentUsecase.update).toHaveBeenCalledWith({
        body: {
          value_paid: value.split(' ')[1],
          paid: !paid
        },
        id: installment.id,
        token: mockJwt()
      })

      expect(setOpenSpy).toHaveBeenCalledTimes(1)
      expect(setOpenSpy).toHaveBeenCalledWith(false)

      expect(setSelectedSpy).toHaveBeenCalledTimes(1)
      expect(setSelectedSpy).toHaveBeenCalledWith(null)
    })
  })
})
