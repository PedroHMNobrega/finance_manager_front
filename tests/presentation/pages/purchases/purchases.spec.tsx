import React from 'react'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { Purchases } from '@/presentation/pages'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { screen } from '@testing-library/react'
import { clickButton, testMessage } from '@/tests/presentation/helpers/form-helper'
import { HomeContext } from '@/main/factories/pages/home/home-fatory'
import { mockHomeContextValue } from '@/tests/main/mocks/context/mock-home-context-value'
import { mockPurchase, mockPurchaseList } from '@/tests/domain/mocks'
import { Purchase } from '@/domain/models'
import { mockError, mockLoading } from '@/tests/presentation/helpers/saga-helper'
import { MessageType } from '@/presentation/components/message/message'

type SutType = {
  renderScreen: Function
  sagaUsecases: SagaUseCases
  store: ToolkitStore
  purchases: Purchase[]
}

const makeSut = (purchases = mockPurchaseList()): SutType => {
  const Page: React.FC = () => (
    <HomeContext.Provider value={mockHomeContextValue()}>
      <Purchases />
    </HomeContext.Provider>
  )

  const { store, sagaUsecases, renderScreen } = renderWithProvider({ Page })

  const loadPurchases = sagaUsecases.loadPurchasesUsecase.loadAll as jest.Mock
  loadPurchases.mockReturnValue(purchases)

  return {
    renderScreen,
    sagaUsecases,
    store,
    purchases
  }
}

describe('Purchases Component', () => {
  it('should open create purchase modal on open button click', async () => {
    const { renderScreen } = makeSut()
    renderScreen()

    let createPurchaseModal = screen.queryByTestId('create-purchase-modal')
    expect(createPurchaseModal).toBeNull()

    const addButton = screen.queryByTestId('add-button') as HTMLButtonElement
    await clickButton(addButton)

    createPurchaseModal = screen.queryByTestId('create-purchase-modal')
    expect(createPurchaseModal).toBeTruthy()
  })

  it('should list correct purchases on start', () => {
    const { renderScreen, purchases } = makeSut()
    renderScreen()

    const purchasesElements = screen.queryAllByTestId('purchase')

    expect(purchasesElements.length).toBe(purchases.length)

    expect(purchasesElements[0].children[0].textContent).toBe(`${purchases[0].name}`)
    expect(purchasesElements[0].children[1].textContent).toBe(`${purchases[0].category}`)
    expect(purchasesElements[0].children[2].textContent).toBe(`${purchases[0].installmentsNumber}`)
    expect(purchasesElements[0].children[3].textContent).toBe(`${purchases[0].firstInstallmentDate}`)
    expect(purchasesElements[0].children[4].textContent).toBe(`R$ ${purchases[0].value}`)

    expect(purchasesElements[1].children[0].textContent).toBe(`${purchases[1].name}`)
    expect(purchasesElements[1].children[1].textContent).toBe(`${purchases[1].category}`)
    expect(purchasesElements[1].children[2].textContent).toBe(`${purchases[1].installmentsNumber}`)
    expect(purchasesElements[1].children[3].textContent).toBe(`${purchases[1].firstInstallmentDate}`)
    expect(purchasesElements[1].children[4].textContent).toBe(`R$ ${purchases[1].value}`)
  })

  it('should show no purchase message if there is no purchase', () => {
    const { renderScreen } = makeSut([])
    renderScreen()

    const purchasesElements = screen.queryAllByTestId('purchase')
    const noPurchaseMessage = screen.queryByTestId('no-purchases')

    expect(purchasesElements.length).toBe(0)
    expect(noPurchaseMessage).toBeTruthy()
  })

  it('should display error message on purchase load error', () => {
    const { renderScreen, sagaUsecases } = makeSut()

    const loadPurchases = sagaUsecases.loadPurchasesUsecase.loadAll as jest.Mock
    mockError(loadPurchases)

    renderScreen()

    testMessage(MessageType.ERROR)
  })

  it('should display spinner on purchase load loading', () => {
    const { renderScreen, sagaUsecases } = makeSut()

    const loadPurchases = sagaUsecases.loadPurchasesUsecase.loadAll as jest.Mock
    mockLoading(loadPurchases)

    renderScreen()

    const addButton = screen.queryByTestId('purchase-table')
    expect(addButton).toBeNull()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('should show dash if the purchase does not have a category', () => {
    const purchase = mockPurchase(1)
    purchase.category = null

    const { renderScreen } = makeSut([purchase])
    renderScreen()

    const purchaseElement = screen.queryByTestId('purchase')

    expect(purchaseElement.children[0].textContent).toBe(`${purchase.name}`)
    expect(purchaseElement.children[1].textContent).toBe('-')
    expect(purchaseElement.children[2].textContent).toBe(`${purchase.installmentsNumber}`)
    expect(purchaseElement.children[3].textContent).toBe(`${purchase.firstInstallmentDate}`)
    expect(purchaseElement.children[4].textContent).toBe(`R$ ${purchase.value}`)
  })
})
