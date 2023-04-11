import React, { useState } from 'react'
import Styles from './installment-table-styles.scss'
import { Installment } from '@/domain/models'
import InstallmentUpdateModal
  from '@/presentation/pages/installments/components/installment-update-modal/installment-update-modal'

type Props = {
  installments: Installment[]
}

const InstallmentTable: React.FC<Props> = ({ installments }: Props) => {
  const [openIntallmentModal, setOpenInstallmentModal] = useState(false)
  const [selectedInstallment, setSelectedInstallment] = useState(null)

  const handleSelectInstallment = (installment): void => {
    setSelectedInstallment(installment)
    setOpenInstallmentModal(true)
  }

  const getRowClass = (installment): string => {
    const classes = [Styles.row]
    if (installment.paid) {
      classes.push(Styles.paid_row)
    }
    return classes.join(' ')
  }

  const renderTable = (): JSX.Element => {
    if (installments.length === 0) {
      return (
        <h2 className={Styles.no_installment_message} data-testid="no-installments">Nenhuma Parcela</h2>
      )
    } else {
      return (
        <>
          <div className={`${Styles.row} ${Styles.titles}`}>
            <h3>Compra</h3>
            <h3>Categoria</h3>
            <h3>Parcela</h3>
            <h3>Valor</h3>
            <h3>Status</h3>
          </div>
          {installments.map(installment => (
            <div
              key={installment.id}
              className={getRowClass(installment)}
              data-testid="installment"
              onClick={() => { handleSelectInstallment(installment) }}
            >
              <h3>{installment.purchase.name}</h3>
              <h3>{installment.category ? installment.category : '-'}</h3>
              <h3>{`${installment.number}/${installment.purchase.installmentsNumber}`}</h3>
              <h3>R$ {installment.value_paid}</h3>
              <h3>{installment.paid ? 'Pago' : 'Pendente'}</h3>
            </div>
          ))}
        </>
      )
    }
  }

  return (
    <div className={Styles.installments} data-testid="installment-table">
      {openIntallmentModal && (
        <InstallmentUpdateModal
          setOpen={setOpenInstallmentModal}
          selected={selectedInstallment}
          setSelected={setSelectedInstallment}
        />
      )}
      {renderTable()}
    </div>
  )
}

export default InstallmentTable
