import React from 'react'
import { screen } from '@testing-library/react'
import { Purchase } from '@/domain/models'
import { mockCategoryList, mockPurchaseList } from '@/tests/domain/mocks'
import PurchaseTable from '@/presentation/pages/purchases/components/purchase-table/purchase-table'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { clickButton } from '@/tests/presentation/helpers/form-helper'

type SutType = {
  renderScreen: Function
  purchases: Purchase[]
}

const makeSut = (purchases = mockPurchaseList()): SutType => {
  const categories = mockCategoryList()
  const Page: React.FC = () => (
    <PurchaseTable purchases={purchases} categories={categories} />
  )

  const { renderScreen } = renderWithProvider({ Page })

  return {
    renderScreen,
    purchases
  }
}

describe('PurchaseTable Component', () => {
  it('should not open modal on start', async () => {
    const { renderScreen } = makeSut()
    await renderScreen()
    const modal = screen.queryByTestId('delete-purchase-modal')
    expect(modal).toBeNull()
  })

  it('should open modal with correct purchase on click', async () => {
    const purchases = mockPurchaseList()
    purchases[0].name = 'name1'
    purchases[1].name = 'name2'

    const { renderScreen } = makeSut(purchases)
    await renderScreen()

    const purchaseComponents = screen.queryAllByTestId('purchase')
    const selectedIdx = 1

    await clickButton(purchaseComponents[selectedIdx])

    const modal = screen.queryByTestId('delete-purchase-modal')
    expect(modal).toBeTruthy()

    const selectedComponent = screen.queryByTestId('selected-purchase-info')
    expect(selectedComponent.textContent).toMatch(purchases[selectedIdx].name)
  })
})
