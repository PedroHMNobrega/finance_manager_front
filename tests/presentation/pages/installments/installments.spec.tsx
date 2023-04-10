import React from 'react'
import { screen } from '@testing-library/react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { Installment } from '@/domain/models'
import { mockInstallment, mockInstallmentList, mockJwt } from '@/tests/domain/mocks'
import { Installments } from '@/presentation/pages'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { mockError, mockLoading } from '@/tests/presentation/helpers/saga-helper'
import { clickButton, testMessage } from '@/tests/presentation/helpers/form-helper'
import { MessageType } from '@/presentation/components/message/message'

type SutType = {
  renderScreen: Function
  sagaUsecases: SagaUseCases
  store: ToolkitStore
  installments: Installment[]
}

const makeSut = (installments = mockInstallmentList()): SutType => {
  const Page: React.FC = () => (
    <Installments />
  )

  const {
    store,
    sagaUsecases,
    renderScreen
  } = renderWithProvider({ Page })

  const loadInstallments = sagaUsecases.loadInstallmentsUsecase.loadAll as jest.Mock
  loadInstallments.mockReturnValue(installments)

  return {
    renderScreen,
    sagaUsecases,
    store,
    installments
  }
}

describe('Installments Component', () => {
  it('should call load installments with today date on start', async () => {
    const { renderScreen, sagaUsecases } = makeSut()
    const todayMonth = 0
    const oneBasedMonth = todayMonth + 1
    const todayYear = 2020
    jest.useFakeTimers().setSystemTime(new Date(todayYear, todayMonth, 2))

    const loadAll = sagaUsecases.loadInstallmentsUsecase.loadAll as jest.Mock
    await renderScreen()

    expect(loadAll).toHaveBeenCalledWith({
      token: mockJwt(),
      params: {
        month: oneBasedMonth,
        year: todayYear
      }
    })
    jest.useRealTimers()
  })

  it('should call load installments with today date + one month on monthPicker right button click', async () => {
    const { renderScreen, sagaUsecases } = makeSut()
    const todayMonth = 0
    const oneBasedMonth = todayMonth + 1
    const todayYear = 2020
    jest.useFakeTimers().setSystemTime(new Date(todayYear, todayMonth, 2))

    const loadAll = sagaUsecases.loadInstallmentsUsecase.loadAll as jest.Mock
    await renderScreen()

    const rightArrow = screen.queryByTestId('arrow-right')
    await clickButton(rightArrow)

    expect(loadAll).toHaveBeenCalledWith({
      token: mockJwt(),
      params: {
        month: oneBasedMonth + 1,
        year: todayYear
      }
    })
    jest.useRealTimers()
  })

  it('should call load installments with today date - one month on monthPicker left button click', async () => {
    const { renderScreen, sagaUsecases } = makeSut()
    const todayMonth = 0
    const todayYear = 2020
    jest.useFakeTimers().setSystemTime(new Date(todayYear, todayMonth, 2))

    const loadAll = sagaUsecases.loadInstallmentsUsecase.loadAll as jest.Mock
    await renderScreen()

    const leftArrow = screen.queryByTestId('arrow-left')
    await clickButton(leftArrow)

    expect(loadAll).toHaveBeenCalledWith({
      token: mockJwt(),
      params: {
        month: 12,
        year: todayYear - 1
      }
    })
    jest.useRealTimers()
  })

  it('should list correct installments on start', async () => {
    const { renderScreen, installments } = makeSut()
    await renderScreen()

    const installmentsElements = screen.queryAllByTestId('installment')

    expect(installmentsElements.length).toBe(installments.length)
    expect(installmentsElements[0].children[0].textContent).toBe(`${installments[0].purchase.name}`)
    expect(installmentsElements[0].children[1].textContent).toBe(`${installments[0].category}`)
    expect(installmentsElements[0].children[2].textContent).toBe(`${installments[0].number}/${installments[0].purchase.installmentsNumber}`)
    expect(installmentsElements[0].children[3].textContent).toBe(`R$ ${installments[0].value_paid}`)
    expect(installmentsElements[0].children[4].textContent).toBe(`${installments[0].paid.toString()}`)

    expect(installmentsElements[1].children[0].textContent).toBe(`${installments[1].purchase.name}`)
    expect(installmentsElements[1].children[1].textContent).toBe(`${installments[1].category}`)
    expect(installmentsElements[1].children[2].textContent).toBe(`${installments[1].number}/${installments[1].purchase.installmentsNumber}`)
    expect(installmentsElements[1].children[3].textContent).toBe(`R$ ${installments[1].value_paid}`)
    expect(installmentsElements[1].children[4].textContent).toBe(`${installments[1].paid.toString()}`)
  })

  it('should show no installment message if there is no installment', async () => {
    const { renderScreen } = makeSut([])
    await renderScreen()

    const installmentsElements = screen.queryAllByTestId('installment')
    const noInstallmentMessage = screen.queryByTestId('no-installments')

    expect(installmentsElements.length).toBe(0)
    expect(noInstallmentMessage).toBeTruthy()
  })

  it('should display error message on installment load error', async () => {
    const {
      renderScreen,
      sagaUsecases
    } = makeSut()

    const loadInstallments = sagaUsecases.loadInstallmentsUsecase.loadAll as jest.Mock
    mockError(loadInstallments)

    await renderScreen()

    testMessage(MessageType.ERROR)
  })

  it('should display spinner on installment load loading', async () => {
    const {
      renderScreen,
      sagaUsecases
    } = makeSut()

    const loadInstallments = sagaUsecases.loadInstallmentsUsecase.loadAll as jest.Mock
    mockLoading(loadInstallments)

    await renderScreen()

    const intallmentTable = screen.queryByTestId('installment-table')
    expect(intallmentTable).toBeNull()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('should show dash if the installment does not have a category', async () => {
    const installment = mockInstallment(1)
    installment.category = null

    const { renderScreen } = makeSut([installment])
    await renderScreen()

    const installmentElement = screen.queryByTestId('installment')

    expect(installmentElement.children[1].textContent).toBe('-')
  })
})
