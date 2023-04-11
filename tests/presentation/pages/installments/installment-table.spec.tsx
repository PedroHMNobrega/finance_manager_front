import React from 'react'
import { screen } from '@testing-library/react'
import { Installment } from '@/domain/models'
import InstallmentTable from '@/presentation/pages/installments/components/installment-table/installment-table'
import { mockInstallmentList } from '@/tests/domain/mocks'
import { renderWithProvider } from '@/tests/presentation/mocks'
import { clickButton } from '@/tests/presentation/helpers/form-helper'

type SutType = {
  renderScreen: Function
  installments: Installment[]
}

const makeSut = (installments = mockInstallmentList()): SutType => {
  const Page: React.FC = () => (
    <InstallmentTable installments={installments} />
  )

  const { renderScreen } = renderWithProvider({ Page })

  return {
    renderScreen,
    installments
  }
}

describe('InstallmentTable Component', () => {
  it('should not open modal on start', async () => {
    const { renderScreen } = makeSut()
    await renderScreen()
    const modal = screen.queryByTestId('update-installment-modal')
    expect(modal).toBeNull()
  })

  it('should open modal with correct installment on installment click', async () => {
    const installments = mockInstallmentList()
    installments[0].purchase.name = 'name1'
    installments[0].number = 1
    installments[1].purchase.name = 'name2'
    installments[1].number = 2

    const { renderScreen } = makeSut(installments)
    await renderScreen()

    const intallmentsComponents = screen.queryAllByTestId('installment')
    const selectedInstallmentIdx = 1

    await clickButton(intallmentsComponents[selectedInstallmentIdx])

    const modal = screen.queryByTestId('update-installment-modal')
    expect(modal).toBeTruthy()

    const selectedInstallmentComponent = screen.queryByTestId('selected-installment')
    const selectedInstallment = installments[selectedInstallmentIdx]
    expect(selectedInstallmentComponent.textContent).toBe(
      `Compra: ${selectedInstallment.purchase.name} - ${selectedInstallment.number}/${selectedInstallment.purchase.installmentsNumber}`
    )
  })
})
