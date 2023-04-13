import React from 'react'
import { Purchase } from '@/domain/models'
import { SagaUseCases } from '@/presentation/store/reducers/root-saga'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { mockJwt, mockPurchase } from '@/tests/domain/mocks'
import DeletePurchaseModal from '@/presentation/pages/purchases/components/delete-purchase-modal/delete-purchase-modal'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { screen } from '@testing-library/react'
import { clickButton } from '@/tests/presentation/helpers/form-helper'

type SutTypes = {
  renderScreen: Function
  setOpenSpy: jest.Mock
  setSelectedSpy: jest.Mock
  selected: Purchase
  sagaUsecases: SagaUseCases
  store: ToolkitStore
}

const makeSut = (purchase = mockPurchase(1)): SutTypes => {
  const setOpenSpy = jest.fn()
  const setSelectedSpy = jest.fn()

  const Page: React.FC = () => (
    <DeletePurchaseModal setOpen={setOpenSpy} selected={purchase} setSelected={setSelectedSpy} />
  )

  const {
    store,
    sagaUsecases,
    renderScreen
  } = renderWithProvider({ Page })

  return {
    renderScreen,
    setOpenSpy,
    setSelectedSpy,
    selected: purchase,
    sagaUsecases,
    store
  }
}

describe('DeletePurchaseModal Component', () => {
  it('should display correct purchase name', async () => {
    const purchase = mockPurchase(3)
    purchase.name = 'any-purchase-name'

    const { renderScreen } = makeSut(purchase)
    await renderScreen()

    const selectedComponent = screen.queryByTestId('selected-purchase-info')
    expect(selectedComponent.textContent).toMatch(purchase.name)
  })

  it('should call delete purchase usecase with correct values', async () => {
    const purchaseId = 43
    const purchase = mockPurchase(purchaseId)

    const { renderScreen, sagaUsecases, setOpenSpy, setSelectedSpy } = makeSut(purchase)
    await renderScreen()

    const deleteButton = screen.queryByTestId('submit')
    await clickButton(deleteButton)

    expect(sagaUsecases.deletePurchaseUsecase.delete).toHaveBeenCalledTimes(1)
    expect(sagaUsecases.deletePurchaseUsecase.delete).toHaveBeenCalledWith({
      id: purchaseId,
      token: mockJwt()
    })

    expect(setOpenSpy).toHaveBeenCalledTimes(1)
    expect(setOpenSpy).toHaveBeenCalledWith(false)

    expect(setSelectedSpy).toHaveBeenCalledTimes(1)
    expect(setSelectedSpy).toHaveBeenCalledWith(null)
  })
})
